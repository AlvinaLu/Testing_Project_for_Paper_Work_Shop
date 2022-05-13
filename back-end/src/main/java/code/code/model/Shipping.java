package code.code.model;

public class Shipping {
    private String firstName;
    private String lastName;
    private String postalCod;
    private String address;
    private String city;
    private String number;
    private String info;

    public Shipping(String firstName, String lastName, String postalCod, String address, String city, String number, String info) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.postalCod = postalCod;
        this.address = address;
        this.city = city;
        this.number = number;
        this.info = info;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPostalCod() {
        return postalCod;
    }

    public void setPostalCod(String postalCod) {
        this.postalCod = postalCod;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    @Override
    public String toString() {
        return "Shipping{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", postalCod='" + postalCod + '\'' +
                ", address='" + address + '\'' +
                ", city='" + city + '\'' +
                ", number='" + number + '\'' +
                ", info='" + info + '\'' +
                '}';
    }
}
