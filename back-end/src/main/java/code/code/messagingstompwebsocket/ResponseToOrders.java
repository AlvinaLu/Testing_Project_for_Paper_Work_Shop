package code.code.messagingstompwebsocket;

import code.code.model.ClientOrder;
import code.code.model.Order;

import java.util.ArrayList;
import java.util.List;

public class ResponseToOrders {

    private Integer status;
    private List<Order> orders = new ArrayList<>();
    private String errorText;

    public ResponseToOrders(Integer status) {
        this.status = status;
    }

    public ResponseToOrders(Integer status, String errorText) {
        this.status = status;
        this.errorText = errorText;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    public String getErrorText() {
        return errorText;
    }

    public void setErrorText(String errorText) {
        this.errorText = errorText;
    }

    @Override
    public String toString() {
        return "ResponseToOrders{" +
                "status='" + status + '\'' +
                ", orders=" + orders +
                ", errorText='" + errorText + '\'' +
                '}';
    }
}
