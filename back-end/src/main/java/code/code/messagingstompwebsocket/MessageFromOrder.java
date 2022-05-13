package code.code.messagingstompwebsocket;

import code.code.model.Shipping;

import java.util.Map;

public class MessageFromOrder {
    private String sessionId;
    private String delivery;
    private String payment;
    private Map<String,Integer> cart;
    private Shipping shipping;

    public String getPayment() {
        return payment;
    }



    public void setPayment(String payment) {
        this.payment = payment;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getDelivery() {
        return delivery;
    }

    public void setDelivery(String delivery) {
        this.delivery = delivery;
    }

    public Map<String, Integer> getCart() {
        return cart;
    }

    public void setCart(Map<String, Integer> cart) {
        this.cart = cart;
    }

    public Shipping getShipping() {
        return shipping;
    }

    public void setShipping(Shipping shipping) {
        this.shipping = shipping;
    }

    @Override
    public String toString() {
        return "MessageFromOrder{" +
                "sessionId='" + sessionId + '\'' +
                ", delivery='" + delivery + '\'' +
                ", payment='" + payment + '\'' +
                ", cart=" + cart +
                ", shipping=" + shipping +
                '}';
    }
}
