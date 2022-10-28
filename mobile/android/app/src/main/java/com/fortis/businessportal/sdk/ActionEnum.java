package com.sdkplayground.newarchitecture.sdk;

public enum ActionEnum {
    ACTION_PERFORM_TRANSACTION("performTransaction"),
    ACTION_PERFORM_EMV_TRANSACTION("performEMVTransaction"),
    ACTION_SET_DEVICE_TYPE("setDeviceType"),
    ACTION_SCAN_FOR_DEVICES("scanForDevices"),
    ACTION_STOP_SCAN_FOR_DEVICES("stopScanForDevices"),
    ACTION_CONNECT_DEVICE_BY_NAME("connectDeviceByName"),
    ACTION_INITIAL_DEVICE_SETUP("initialDeviceSetup"),
    ACTION_DISCONNECT_DEVICE("disconnectDevice"),
    ACTION_SET_TIMEOUTS("setTimeouts"),
    UNKNOWN("UNKNOWN");

    public final String value;

    private ActionEnum(String value) {
        this.value = value;
    }

    public static ActionEnum fromString(String action) {
        for (ActionEnum enumValue: ActionEnum.values()) {
            if (enumValue.value.equals(action)) {
                return enumValue;
            }
        }
        return UNKNOWN;
    }
}