package code.code.messagingstompwebsocket;

import java.math.BigDecimal;

public class ResponseToOrder {
    private Integer status;
    private BigDecimal sum;
    private String errorText;

    public ResponseToOrder(Integer status) {
        this.status = status;
    }

    public ResponseToOrder(Integer status, String errorText) {
        this.status = status;
        this.errorText = errorText;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public BigDecimal getSum() {
        return sum;
    }

    public void setSum(BigDecimal sum) {
        this.sum = sum;
    }

    public String getErrorText() {
        return errorText;
    }

    public void setErrorText(String errorText) {
        this.errorText = errorText;
    }


}
