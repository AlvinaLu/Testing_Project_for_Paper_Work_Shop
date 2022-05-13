package code.code.messagingstompwebsocket;

public class MessageFromGood {

    private Long id;

    public MessageFromGood() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "MessageFromGood{" +
                "id=" + id +
                '}';
    }
}
