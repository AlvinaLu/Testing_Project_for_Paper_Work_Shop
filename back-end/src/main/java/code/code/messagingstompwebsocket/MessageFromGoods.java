package code.code.messagingstompwebsocket;

public class MessageFromGoods {
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "MessageFromGoods{" +
                "id=" + id +
                '}';
    }
}
