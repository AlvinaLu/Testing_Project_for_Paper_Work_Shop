package code.code.model;

public enum PaymentMethod {

        PAYPAL("PayPal"),
        CREDITCARD("CreditCard"),
        CASH("Cash");


        private final String name;

        PaymentMethod(String s) {
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
