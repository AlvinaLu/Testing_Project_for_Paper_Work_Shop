package code.code.messagingstompwebsocket;

import code.code.model.ClientOrder;
import code.code.model.Order;

import java.util.ArrayList;
import java.util.List;

public class ResponseToClientOrders {
    private Integer status;
    private List<ClientOrder> orders = new ArrayList<>();
    private String errorText;

    public ResponseToClientOrders(Integer status, String errorText) {
        this.status = status;
        this.errorText = errorText;
    }

    public ResponseToClientOrders(Integer status) {
        this.status = status;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public List<ClientOrder> getOrders() {
        return orders;
    }

    public void setOrders(List<ClientOrder> orders) {
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
