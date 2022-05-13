package code.code.messagingstompwebsocket;

import java.math.BigDecimal;

public class ResponseToPayment {

    private Integer status;
    private BigDecimal  sum;
    private Boolean payment;
    private String errorText;



    public ResponseToPayment(Integer status, BigDecimal sum, Boolean payment) {
        this.status = status;
        this.sum = sum;
        this.payment = payment;
    }

    public ResponseToPayment(Integer status, String errorText) {
        this.status = status;
        this.errorText = errorText;
    }

    public Boolean getPayment() {
        return payment;
    }

    public void setPayment(Boolean payment) {
        this.payment = payment;
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

    @Override
    public String toString() {
        return "ResponseToPayment{" +
                "status=" + status +
                ", sum=" + sum +
                ", payment=" + payment +
                ", errorText='" + errorText + '\'' +
                '}';
    }
}
