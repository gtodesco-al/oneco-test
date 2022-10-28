package com.fortis.businessportal.modules;

import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.sdkplayground.newarchitecture.sdk.ActionHandler;
import com.sdkplayground.newarchitecture.sdk.PaymentHandler;

import org.json.JSONArray;
import org.json.JSONException;

public class RNPaymentSDKModule extends ReactContextBaseJavaModule {

    private final ActionHandler actionHandler;

    public RNPaymentSDKModule(ReactApplicationContext reactContext) {
        super(reactContext);
        actionHandler = new ActionHandler(reactContext);
    }

    @Override
    public String getName() {
        return "PaymentSDKPlugin";
    }

    @ReactMethod
    public void execute(
            String action,
            String args
    ) throws JSONException {
        actionHandler.execute(action, new JSONArray(args));
    }

    @ReactMethod
    public String test() {
        String result = "Test RN module Android";
        Toast.makeText(getReactApplicationContext(), result, Toast.LENGTH_SHORT).show();
        return result;
    }
}