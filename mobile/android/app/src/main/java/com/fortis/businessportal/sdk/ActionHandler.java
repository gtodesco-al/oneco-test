package com.sdkplayground.newarchitecture.sdk;

import com.facebook.react.bridge.ReactApplicationContext;

import org.json.JSONArray;

public class ActionHandler {

    private final ReactApplicationContext reactContext;

    public ActionHandler(final ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
    }

    public void execute(
            String action,
            JSONArray args) {

        ActionEnum actionEnum = ActionEnum.fromString(action);
        EventEmitter callbackUtils = new EventEmitter(reactContext, actionEnum);

        try {
            PaymentHandler paymentHandler = new PaymentHandler(reactContext, callbackUtils);

            switch (actionEnum) {
                case ACTION_PERFORM_TRANSACTION:
                    paymentHandler.performTransaction(args);
                    break;
                case ACTION_PERFORM_EMV_TRANSACTION:
                    paymentHandler.performEMVTransaction(args);
                    break;
                case ACTION_SET_DEVICE_TYPE:
                    paymentHandler.setDeviceType(args);
                    break;
                case ACTION_SCAN_FOR_DEVICES:
                    paymentHandler.scanForDevices(args);
                    break;
                case ACTION_STOP_SCAN_FOR_DEVICES:
                    paymentHandler.stopScanForDevices();
                    break;
                case ACTION_CONNECT_DEVICE_BY_NAME:
                    paymentHandler.connectDeviceByName(args);
                    break;
                case ACTION_INITIAL_DEVICE_SETUP:
                    paymentHandler.initialDeviceSetup(args);
                    break;
                case ACTION_DISCONNECT_DEVICE:
                    paymentHandler.disconnectDevice();
                    break;
                case ACTION_SET_TIMEOUTS:
                    paymentHandler.setTimeouts(args);
                    break;
                default:
                    throw new IllegalArgumentException("Action " + action + " is not currently being handled.");
            }
        } catch (Exception ex) {
            callbackUtils.error(ex.getMessage());
        }
    }
}