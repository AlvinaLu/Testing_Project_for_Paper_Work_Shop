package code.code.messagingstompwebsocket;

public class ResponseToLogin {
    private Integer status;
    private String sessionId;
    private String adminId;
    private String errorText;

    public ResponseToLogin(String sessionId) {
        this.status = 200;
        this.sessionId = sessionId;
    }

    public ResponseToLogin(Integer status, String errorText) {
        this.status = status;
        this.errorText = errorText;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {

        this.sessionId = sessionId;
    }

    public String getErrorText() {
        return errorText;
    }

    public void setErrorText(String errorText) {
        this.errorText = errorText;
    }

    public String getAdminId() {
        return adminId;
    }

    public void setAdminId(String adminId) {
        this.adminId = adminId;
    }

    @Override
    public String toString() {
        return "ResponseToLogin{" +
                "status=" + status +
                ", sessionId='" + sessionId + '\'' +
                ", adminId='" + adminId + '\'' +
                ", errorText='" + errorText + '\'' +
                '}';
    }
}
