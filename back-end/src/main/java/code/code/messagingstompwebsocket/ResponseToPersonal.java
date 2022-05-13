package code.code.messagingstompwebsocket;

public class ResponseToPersonal {
    private Integer status;
    private String name;
    private String surname;
    private String email;
    private String errorText;

    public ResponseToPersonal(Integer status, String name, String surname, String email) {
        this.status = status;
        this.name = name;
        this.surname = surname;
        this.email = email;
    }

    public ResponseToPersonal(Integer status, String errorText) {
        this.status = status;
        this.errorText = errorText;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getErrorText() {
        return errorText;
    }

    public void setErrorText(String errorText) {
        this.errorText = errorText;
    }

    @Override
    public String toString() {
        return "ResponseToPersonal{" +
                "status=" + status +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", email='" + email + '\'' +
                ", errorText='" + errorText + '\'' +
                '}';
    }
}
