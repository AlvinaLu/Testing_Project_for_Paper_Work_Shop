package code.code.messagingstompwebsocket;

import code.code.model.Good;
import code.code.model.GoodToCart;

import java.util.ArrayList;
import java.util.List;

public class ResponseToCart {

    private Integer status;
    private List<GoodToCart> arrayItems = new ArrayList<>();
    private String errorText;

    public ResponseToCart(Integer status) {
        this.status = status;
    }

    public ResponseToCart(Integer status, String errorText) {
        this.status = status;
        this.errorText = errorText;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public List<GoodToCart> getArrayItems() {
        return arrayItems;
    }

    public void setArrayItems(List<GoodToCart> arrayItems) {
        this.arrayItems = arrayItems;
    }

    public String getErrorText() {
        return errorText;
    }

    public void setErrorText(String errorText) {
        this.errorText = errorText;
    }

    @Override
    public String toString() {
        return "ResponseToCart{" +
                "status=" + status +
                ", arrayItems=" + arrayItems +
                ", errorText='" + errorText + '\'' +
                '}';
    }
}
