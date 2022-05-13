package code.code.model;

import java.math.BigDecimal;
import java.util.Objects;

public class Good{
    private Long id;
    private String name;
    private String description;
    private Integer amount;
    private BigDecimal price;
    private Long category;


    public Good(Long goodId, String name, Integer amount, BigDecimal price, Long category) {
        this.id = goodId;
        this.name = name;
        this.amount = amount;
        this.price = price;
        this.category = category;
    }

    public Good(Long goodId, String name, String description, Integer amount, BigDecimal price, Long category) {
        this.id = goodId;
        this.name = name;
        this.description = description;
        this.amount = amount;
        this.price = price;
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getCategory() {
        return category;
    }

    public void setCategory(Long category) {
        this.category = category;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Good)) return false;
        Good good = (Good) o;
        return Objects.equals(getId(), good.getId()) && Objects.equals(getName(), good.getName()) && Objects.equals(getDescription(), good.getDescription()) && Objects.equals(getAmount(), good.getAmount()) && Objects.equals(getPrice(), good.getPrice()) && Objects.equals(getCategory(), good.getCategory());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getAmount(), getPrice(), getDescription());
    }
}
