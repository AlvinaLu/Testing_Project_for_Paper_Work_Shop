package code.code.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class ClientOrder extends Order{
    private String name;
    private String surname;
    private String email;
    private String paymentMethod;

    public ClientOrder(Long id, LocalDate date, String status, BigDecimal totalSum, String deliveryCompany, String paymentMethod) {
        super(id, date, status, totalSum, deliveryCompany);
        this.paymentMethod = paymentMethod;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
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

}
