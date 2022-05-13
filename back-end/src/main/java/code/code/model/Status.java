package code.code.model;

public enum Status {
    NEW ("NEW"),
    PAID ("PAID"),
    PROCESSED("PROCESSED"),
    SHIPPED("SHIPPED"),
    DELIVERED("DELIVERED");


    private final String name;

    Status(String s) {
        name = s;
    }

    public boolean equalsName(String otherName) {
        return name.equals(otherName);
    }

    @Override
    public String toString() {
        return  "" + name + "";
    }
}
