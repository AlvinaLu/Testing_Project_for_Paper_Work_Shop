package code.code.model;

import java.math.BigDecimal;

public class GoodToCart extends Good{
    private Integer count;

    public GoodToCart(Long goodId, String name, Integer amount, BigDecimal price, Long category, Integer count) {
        super(goodId, name, amount, price, category);
        this.count = count;
    }

    public GoodToCart(Long goodId, String name, String description, Integer amount, BigDecimal price, Long category) {
        super(goodId, name, description, amount, price, category);
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    @Override
    public String toString() {
        return "GoodToCart{" +
                "count=" + count +
                '}';
    }
}
