package code.code.messagingstompwebsocket;

public class MessageFromSignOut {
    String sessionId;

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    @Override
    public String toString() {
        return "MessageFromSignOut{" +
                "sessionId='" + sessionId + '\'' +
                '}';
    }
}
