package uz.pdp.ppmtoolserver.payload;

public class JwtLoginSuccessResponse {
    private boolean success;
    private String message;

    public JwtLoginSuccessResponse() {
    }

    public JwtLoginSuccessResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
