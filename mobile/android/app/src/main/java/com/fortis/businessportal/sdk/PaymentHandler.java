package com.sdkplayground.newarchitecture.sdk;


import android.Manifest;
import android.app.Activity;
import android.content.pm.PackageManager;

import com.facebook.react.bridge.ReactApplicationContext;
import com.idtechproducts.device.ReaderInfo;
import com.zeamster.paymentsdk.resthandler.ICallback;
import com.zeamster.paymentsdk.resthandler.RestServiceClient;
import com.zeamster.paymentsdk.service.TransactionService;
import com.zeamster.paymentsdk.transaction.EMVTransaction;
import com.zeamster.paymentsdk.transaction.ICallbackEMV;
import com.zeamster.paymentsdk.transaction.TransactionAction;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import androidx.core.content.ContextCompat;
import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class PaymentHandler implements ICallback, ICallbackEMV {

    private final Activity activity;
    private final EventEmitter callbackUtils;

    private Result result;
    private RestServiceClient restServiceClient;
    private TransactionAction transactionAction;
    private EMVTransaction emvTransaction;
    private HashMap<String, Object> payload = new HashMap<>();
    private ReaderInfo.DEVICE_TYPE deviceType;
    private String transactionId = "";

    public PaymentHandler(final ReactApplicationContext reactContext, EventEmitter eventEmitter) {
        this.activity = reactContext.getCurrentActivity();
        this.callbackUtils = eventEmitter;
    }

    private boolean setup(JSONArray args) {

        if (args != null && args.length() > 0) {
            try {
                String arg = args.getString(0);
                if (arg != null && arg.length() > 0) {
                    JSONObject jsonObject = new JSONObject(arg);
                    JSONObject header = jsonObject.getJSONObject("header");
                    String validationStatus = validateAuthParameters(header);
                    if (validationStatus.equals("success")) {
                        restServiceClient = new RestServiceClient(header.optString("protocol"), header.optString("hostname"),
                                                                  header.optString("apiEndpoint"), this);
                        HashMap<String, String> requestHeader = new HashMap<>();
                        requestHeader.put("developer-id", header.optString("developerId"));
                        requestHeader.put("user-id", header.optString("userId"));

                        String authType = header.optString("authType");
                        requestHeader.put("authType", header.optString("authType"));
                        if (authType.equals("token")) {
                            if (header.has("accessToken")) {
                                requestHeader.put("access-token", header.optString("accessToken"));
                            } else {
                                // form parameters
                                RequestBody formBody = new FormBody.Builder()
                                        .add("username", header.optString("username"))
                                        .add("password", header.optString("password"))
                                        .add("domain", header.optString("domain"))
                                        .build();

                                Request request = new Request.Builder()
                                        .url(header.optString("protocol") + "://" + header.optString("hostname") + "/v2/token")
                                        .addHeader("developer-id", header.optString("developerId"))
                                        .addHeader("Content-Type", "application/json")
                                        .addHeader("Accept", "application/json")
                                        .post(formBody)
                                        .build();

                                OkHttpClient httpClient = new OkHttpClient();
                                try (Response response = httpClient.newCall(request).execute()) {

                                    if (!response.isSuccessful()) {
                                        throw new IOException("Unexpected code " + response);
                                    }

                                    // Get response body
                                    JSONObject tokenResponse = new JSONObject(response.body().string());
                                    JSONObject tokenBody = tokenResponse.getJSONObject("token");
                                    requestHeader.put("access-token", tokenBody.optString("token"));
                                } catch (Exception ex) {
                                    requestHeader.put("access-token", "dummy");
                                    callbackUtils.error(ex.getMessage());
                                }
                            }
                        } else if (authType.equals("hmac")) {
                            int currTime = Math.round((new Date()).getTime() / 1000);
                            String hashKey = header.optString("userHashKey");
                            String valueToDigest = header.optString("userId") + String.valueOf(currTime);
                            byte[] key = hashKey.getBytes();

                            String hashValue = generateHmac256(valueToDigest, key);

                            requestHeader.put("hash-key", hashValue);
                            requestHeader.put("timestamp", String.valueOf(currTime));
                        } else if (authType.equals("apikey")) {
                            requestHeader.put("user-api-key", header.optString("userAPIKey"));
                        }

                        restServiceClient.setRequestHeader(requestHeader);
                        if (header.has("transactionId")) {
                            transactionId = header.optString("transactionId");
                        }
                        if (header.has("deviceType")) {
                            deviceType = getDeviceType(header.optString("deviceType"));
                        }
                        if (jsonObject.has("queryParams")) {
                            restServiceClient.setQueryParams(toMap(jsonObject.getJSONObject("queryParams")));
                        }
                        if (jsonObject.has("body")) {
                            payload = toMap(jsonObject.getJSONObject("body"));
                        } else {
                            payload = new HashMap<>();
                        }
                        if (payload.size() > 0) {
                            if (payload.containsKey("action")) {
                                transactionAction = getTransactionAction(payload.get("action").toString());
                            }
                        }

                        return true;
                    } else {
                        callbackUtils.error(validationStatus);
                        return false;
                    }
                } else {
                    callbackUtils.error("Expected non-empty argument.");
                    return false;
                }
            } catch (Exception ex) {
                callbackUtils.error(ex.getMessage());
                return false;
            }
        } else {
            callbackUtils.error("Expected non-empty argument.");
            return false;
        }
    }

    private static String validateAuthParameters(JSONObject header) {
        if (header != null && header.has("protocol") && header.has("hostname") && header.has("apiEndpoint")) {
            if (header.has("authType")) {
                String authType = header.optString("authType");
                if (authType.equals("token")) {
                    if (header.has("developerId") && ((header.has("username") && header.has("password") && header.has("domain")) || header.has(
                            "accessToken"))) {
                        return "success";
                    } else {
                        return "Invalid Auth Parameters";
                    }
                } else if (authType.equals("hmac")) {
                    if (header.has("developerId") && header.has("userId") && header.has("userHashKey")) {
                        return "success";
                    } else {
                        return "Invalid Auth Parameters";
                    }
                } else if (authType.equals("apikey")) {
                    if (header.has("developerId") && header.has("userId") && header.has("userAPIKey")) {
                        return "success";
                    } else {
                        return "Invalid Auth Parameters";
                    }
                } else {
                    String returnVal = "Invalid Auth Type - " + authType;
                    return returnVal;
                }
            }
        }
        return "Invalid API Details";
    }

    private static String generateHmac256(
            String message,
            byte[] key) throws InvalidKeyException, NoSuchAlgorithmException {
        byte[] bytes = hmac("HmacSHA256", key, message.getBytes());
        return bytesToHex(bytes);
    }

    private static byte[] hmac(
            String algorithm,
            byte[] key,
            byte[] message) throws NoSuchAlgorithmException, InvalidKeyException {
        Mac mac = Mac.getInstance(algorithm);
        mac.init(new SecretKeySpec(key, algorithm));
        return mac.doFinal(message);
    }

    private static String bytesToHex(byte[] bytes) {
        final char[] hexArray = "0123456789abcdef".toCharArray();
        char[] hexChars = new char[bytes.length * 2];
        for (int j = 0, v; j < bytes.length; j++) {
            v = bytes[j] & 0xFF;
            hexChars[j * 2] = hexArray[v >>> 4];
            hexChars[j * 2 + 1] = hexArray[v & 0x0F];
        }
        return new String(hexChars);
    }

    private static HashMap<String, Object> toMap(JSONObject jsonObj) throws JSONException {
        HashMap<String, Object> map = new HashMap<>();
        Iterator<String> keys = jsonObj.keys();
        while (keys.hasNext()) {
            String key = keys.next();
            Object value = jsonObj.get(key);
            if (value instanceof JSONArray) {
                value = toList((JSONArray) value);
            } else if (value instanceof JSONObject) {
                value = toMap((JSONObject) value);
            }
            map.put(key, value);
        }
        return map;
    }

    private static ArrayList<Object> toList(JSONArray array) throws JSONException {
        ArrayList<Object> list = new ArrayList<>();
        for (int i = 0; i < array.length(); i++) {
            Object value = array.get(i);
            if (value instanceof JSONArray) {
                value = toList((JSONArray) value);
            } else if (value instanceof JSONObject) {
                value = toMap((JSONObject) value);
            }
            list.add(value);
        }
        return list;
    }

    private TransactionAction getTransactionAction(String transactionAction) {
        switch (transactionAction.toLowerCase()) {
            case "sale":
                return TransactionAction.SALE;
            case "refund":
                return TransactionAction.REFUND;
            case "void":
                return TransactionAction.VOID;
            case "authonly":
                return TransactionAction.AUTHONLY;
            case "authcomplete":
                return TransactionAction.AUTHCOMPLETE;
            case "authincrement":
                return TransactionAction.AUTHINCREMENT;
            case "force":
                return TransactionAction.FORCE;
            case "tipadjust":
                return TransactionAction.TIPADJUST;
            case "debit":
                return TransactionAction.DEBIT;
            case "credit":
                return TransactionAction.CREDIT;
            case "edit":
                return TransactionAction.EDIT;
            case "avsonly":
                return TransactionAction.AVSONLY;
            case "view_transaction":
                return TransactionAction.VIEW_TRANSACTION;
            case "view_transactions_all":
                return TransactionAction.VIEW_TRANSACTIONS_ALL;
            case "view_transactions_filtered":
                return TransactionAction.VIEW_TRANSACTIONS_FILTERED;
            case "bininfo":
                return TransactionAction.BININFO;
            case "store":
                return TransactionAction.STORE;
        }
        return TransactionAction.UNKNOWN;
    }

    public void onSuccess(String response) {
        callbackUtils.success(response);
    }

    public void onFailure(String response) {
        callbackUtils.error(response);
    }

    private void updatePayload(JSONArray args) {

        if (args != null && args.length() > 0) {
            try {
                String arg = args.getString(0);
                if (arg != null && arg.length() > 0) {
                    JSONObject jsonObject = new JSONObject(arg);
                    if (jsonObject.has("body")) {
                        payload = toMap(jsonObject.getJSONObject("body"));
                    }
                } else {
                    callbackUtils.error("Expected non-empty argument.");
                }
            } catch (Exception ex) {
                callbackUtils.error(ex.getMessage());
            }
        } else {
            callbackUtils.error("Expected non-empty argument.");
        }
    }

    public void performTransaction(JSONArray args) {
        if (!setup(args)) {
            return;
        }

        TransactionService transactionService = new TransactionService(restServiceClient);
        transactionService.processTransaction(transactionAction, payload, transactionId);
    }

    public void performEMVTransaction(JSONArray args) {
        setup(args);
        updatePayload(args);
        emvTransaction.performEMVSale(transactionAction, payload);
    }

    private ReaderInfo.DEVICE_TYPE getDeviceType(String deviceType) {
        switch (deviceType) {
            case "IDTECH-VP3300BT":
                return ReaderInfo.DEVICE_TYPE.DEVICE_VP3300_BT;
            case "IDTECH-VP8800BT":
                return ReaderInfo.DEVICE_TYPE.DEVICE_VP8800_BT;
        }
        return ReaderInfo.DEVICE_TYPE.DEVICE_UNKNOWN;
    }

    public void setDeviceType(JSONArray args) throws JSONException {
        String deviceType = args.getString(0);
        emvTransaction.setDeviceType(getDeviceType(deviceType));
        callbackUtils.success("Success.");
    }

    public void scanForDevices(JSONArray args) {
        result = new Result(Result.Status.OK, "Scanning in progress..");
        callbackUtils.result(result);
        setup(args);
        emvTransaction = new EMVTransaction(restServiceClient, this, activity, deviceType);
        emvTransaction.isPluginRequest(true);

        // Previous version of the Cordova plugin used to request the permission
        if (ContextCompat.checkSelfPermission(activity, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED
                || ContextCompat.checkSelfPermission(activity, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            callbackUtils.error("Location permission not granted");
            return;
        }

        try {
            if (args != null && args.length() == 3 && !args.get(1).toString().equals("null") && !args.get(2).toString().equals("null")) {

                String searchString = args.getString(1);
                long timeout = Long.parseLong(args.getString(2));
                emvTransaction.scanForDevices(searchString, timeout);
            } else if (args != null && args.length() == 3 && !args.get(1).toString().equals("null")) {

                long timeout = Long.parseLong(args.getString(1));
                emvTransaction.scanForDevices(timeout);

            } else {
                emvTransaction.scanForDevices();
            }
        } catch (Exception ex) {
            callbackUtils.error(ex.getMessage());
        }
    }

    public void initialDeviceSetup(JSONArray args) {
        result = new Result(Result.Status.OK, "Running initial device setup..");
        callbackUtils.result(result);
        setup(args);
        emvTransaction.restServiceClient = restServiceClient;
        emvTransaction.runInitialDeviceSetup();
    }

    public void stopScanForDevices() {
        emvTransaction.stopScanForDevices();
        callbackUtils.success("Scanning Stopped.");
    }

    public void connectDeviceByName(JSONArray args) throws JSONException {
        String deviceName = args.getString(0);
        emvTransaction.connectDeviceByName(deviceName);
    }

    private void connectDeviceByAddress(JSONArray args) throws JSONException {
        String deviceAddress = args.getString(0);
        emvTransaction.connectDeviceByAddress(deviceAddress);
    }

    public void deviceMessage(String message) {
        result = new Result(Result.Status.OK, "deviceMessage!@#$" + message);
        callbackUtils.result(result);
    }

    public void deviceScanResponse(
            String deviceId,
            String deviceName) {

        result = new Result(Result.Status.OK, "deviceScanResponse!@#$"
                + (deviceId != null ? deviceId : "") + "!@#$" + (deviceName != null ? deviceName : ""));
        callbackUtils.result(result);
    }

    public void deviceScanCompleted() {
        result = new Result(Result.Status.OK, "deviceScanCompleted!@#$Scanning Completed");
        callbackUtils.result(result);
    }

    public void deviceConnected(String status) {
        result = new Result(Result.Status.OK, "deviceConnected!@#$" + status);
        callbackUtils.result(result);
    }

    public void deviceDisconnected(String status) {
        result = new Result(Result.Status.OK, "deviceDisconnected!@#$" + status);
        callbackUtils.result(result);
    }

    public void outputLogs(String log) {
        result = new Result(Result.Status.OK, "outputLogs!@#$" + log);
        callbackUtils.result(result);
    }

    public void disconnectDevice() {
        emvTransaction.disconnectDevice();
    }

    public void setTimeouts(JSONArray args) {
        try {
            if (args != null && args.length() == 2 && !args.get(0).toString().equals("null") && !args.get(1).toString().equals("null")) {
                int idleTimeout = Integer.parseInt(args.getString(0));
                int sleepTimeout = Integer.parseInt(args.getString(1));
                emvTransaction.setTimeouts(idleTimeout, sleepTimeout);
            }
        } catch (JSONException e) {
            callbackUtils.error(e.toString());
        }
    }
}