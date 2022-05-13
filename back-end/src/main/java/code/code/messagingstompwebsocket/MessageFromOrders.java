package code.code.messagingstompwebsocket;

public class MessageFromOrders {
    private String sessionId;

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    @Override
    public String toString() {
        return "MessageFromOrders{" +
                "sessionId='" + sessionId + '\'' +
                '}';
    }
}
