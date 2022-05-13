package code.code.model;

public enum DeliveryBy {

    DPH("DPH"),
    PPL("PPL"),
    TAKEAWAY("TAKEAWAY");


    private final String name;

    DeliveryBy(String s) {
        name = s;
    }

    public boolean equalsName(String otherName) {
        return name.equals(otherName);
    }

    @Override
    public String toString() {
        return "" + name + "";
    }
}
