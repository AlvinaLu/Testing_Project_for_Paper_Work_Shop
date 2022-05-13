package code.code.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class Order {

    private Long id;
    private LocalDate date;
    private String status;
    private List<GoodToCart> cart = new ArrayList<>();
    private BigDecimal totalSum;
    private String deliveryCompany;


    public Order(Long id, LocalDate date, String status, List<GoodToCart> cart, BigDecimal totalSum, String deliveryCompany) {
        this.id = id;
        this.date = date;
        this.status = status;
        this.cart = cart;
        this.totalSum = totalSum;
        this.deliveryCompany = deliveryCompany;
    }
    public Order(Long id, LocalDate date, String status, BigDecimal totalSum, String deliveryCompany) {
        this.id = id;
        this.date = date;
        this.status = status;
        this.totalSum = totalSum;
        this.deliveryCompany = deliveryCompany;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<GoodToCart> getCart() {
        return cart;
    }

    public void setCart(List<GoodToCart> cart) {
        this.cart = cart;
    }

    public BigDecimal getTotalSum() {
        return totalSum;
    }

    public void setTotalSum(BigDecimal totalSum) {
        this.totalSum = totalSum;
    }

    public String getDeliveryCompany() {
        return deliveryCompany;
    }

    public void setDeliveryCompany(String deliveryCompany) {
        this.deliveryCompany = deliveryCompany;
    }

    @Override
    public String toString() {
        return "Order{" +
                "id='" + id + '\'' +
                ", date=" + date +
                ", status='" + status + '\'' +
                ", cart=" + cart +
                ", totalSum=" + totalSum +
                ", deliveryCompany='" + deliveryCompany + '\'' +
                '}';
    }
}
