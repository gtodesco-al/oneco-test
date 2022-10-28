package com.sdkplayground.newarchitecture.sdk;


/**
 * Represents a result to be used in the callback to RN.
 * It's a copy of the Cordova result in order to keep the bridges as similar as possible.
 */
public class Result {

    private final int status;
    private final int messageType;
    private final String strMessage;

    public Result(
            Status status,
            String message) {

        this.status = status.ordinal();
        this.messageType = message == null ? MESSAGE_TYPE_NULL : MESSAGE_TYPE_STRING;
        this.strMessage = message;
    }

    public static final int MESSAGE_TYPE_STRING = 1;
    public static final int MESSAGE_TYPE_JSON = 2;
    public static final int MESSAGE_TYPE_NUMBER = 3;
    public static final int MESSAGE_TYPE_BOOLEAN = 4;
    public static final int MESSAGE_TYPE_NULL = 5;
    public static final int MESSAGE_TYPE_ARRAYBUFFER = 6;
    public static final int MESSAGE_TYPE_BINARYSTRING = 7;
    public static final int MESSAGE_TYPE_MULTIPART = 8;

    public static String[] StatusMessages = new String[]{
            "No result",
            "OK",
            "Class not found",
            "Illegal access",
            "Instantiation error",
            "Malformed url",
            "IO error",
            "Invalid action",
            "JSON error",
            "Error"
    };

    public enum Status {
        NO_RESULT,
        OK,
        CLASS_NOT_FOUND_EXCEPTION,
        ILLEGAL_ACCESS_EXCEPTION,
        INSTANTIATION_EXCEPTION,
        MALFORMED_URL_EXCEPTION,
        IO_EXCEPTION,
        INVALID_ACTION,
        JSON_EXCEPTION,
        ERROR;
    }

    public int getStatus() {
        return status;
    }

    public int getMessageType() {
        return messageType;
    }

    public String getStrMessage() {
        return strMessage;
    }
}