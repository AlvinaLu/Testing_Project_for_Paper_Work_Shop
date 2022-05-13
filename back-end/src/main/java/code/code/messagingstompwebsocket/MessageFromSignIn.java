package code.code.messagingstompwebsocket;

public class MessageFromSignIn {
    String email;
    String password;

    public MessageFromSignIn() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "Authentication{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
