package com.sdkplayground.newarchitecture.sdk;


import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class EventEmitter {

    private final ReactApplicationContext reactContext;
    private final ActionEnum action;

    protected EventEmitter(
            final ReactApplicationContext reactContext,
            final ActionEnum action) {

        this.reactContext = reactContext;
        this.action = action;
    }

    public void error(String message) {

        WritableMap map = Arguments.createMap();
        map.putString("status", "ERROR");
        map.putString("message", message);

        map.putString("status", "ERROR");
        map.putString("message", message);
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(action.value, map);
    }

    public void success(String message) {

        WritableMap map = Arguments.createMap();
        map.putString("status", "OK");
        map.putString("message", message);
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(action.value, map);
    }

    public void result(Result result) {

        WritableMap map = Arguments.createMap();

        String status;
        if (result.getStatus() == Result.Status.OK.ordinal()) {
            status = "OK";
        } else {
            status = "ERROR";
        }
        map.putString("status", status);
        map.putString("message", result.getStrMessage());

        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(action.value, map);
    }
}