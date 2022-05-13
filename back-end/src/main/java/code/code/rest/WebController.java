package code.code.rest;

import code.code.components.SessionManager;
import code.code.entities.*;
import code.code.kafka.Producer;
import code.code.messagingstompwebsocket.*;
import code.code.model.*;
import code.code.repositories.jpa.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
public class WebController {
    private static final Logger LOG = LoggerFactory.getLogger(WebController.class);

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ItemRepository itemRepository;
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private OrderrRepository orderrRepository;
    @Autowired
    private SessionManager sessionManager;
    @Autowired(required = false)
    private Producer producer;
    @Value("${kafka.enabled}")
    private Boolean kafkaEnabled;


    @PostMapping("/signUp")
    public ResponseEntity<ResponseToLogin> signUpUser(@RequestBody MessageFromSignUp messageFromSignUp) {
        LOG.info(messageFromSignUp.toString());
        User user = userRepository.getByEmail(messageFromSignUp.getEmail());

        if (messageFromSignUp.getEmail() == null || messageFromSignUp.getEmail().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToLogin(HttpStatus.BAD_REQUEST.value(), "Email is empty"));
        }
        if (user != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToLogin(HttpStatus.BAD_REQUEST.value(), "Email is not unique"));
        }
        if (messageFromSignUp.getName() == null || messageFromSignUp.getName().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToLogin(HttpStatus.BAD_REQUEST.value(), "Name is empty"));
        }
        if (messageFromSignUp.getSurname() == null || messageFromSignUp.getSurname().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToLogin(HttpStatus.BAD_REQUEST.value(), "Surname is empty"));
        }
        if (messageFromSignUp.getPassword() == null || messageFromSignUp.getPassword().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToLogin(HttpStatus.BAD_REQUEST.value(), "Password is empty"));
        }

        User newUser = new User.Builder()
                .firstname(messageFromSignUp.getName())
                .lastname(messageFromSignUp.getSurname())
                .email(messageFromSignUp.getEmail())
                .password(messageFromSignUp.getPassword())
                .admin(false)
                .build();

        userRepository.save(newUser);
        ResponseToLogin response = new ResponseToLogin(sessionManager.addUser(newUser));
        return ResponseEntity.ok(response);

    }

    @PostMapping("/signIn")
    public ResponseEntity<ResponseToLogin> signInUser(@RequestBody MessageFromSignIn messageFromSignIn) {
        LOG.info(messageFromSignIn.toString());

        if (messageFromSignIn.getEmail() == null || messageFromSignIn.getEmail().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToLogin(HttpStatus.BAD_REQUEST.value(), "Email is empty"));
        }
        if (messageFromSignIn.getPassword() == null || messageFromSignIn.getPassword().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToLogin(HttpStatus.BAD_REQUEST.value(), "Password is empty"));
        }
        User user = userRepository.getByEmail(messageFromSignIn.getEmail());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToLogin(HttpStatus.BAD_REQUEST.value(), "Login or password is incorrect"));
        }
        if (user.getPassword().equals(messageFromSignIn.getPassword())) {
            ResponseToLogin response = new ResponseToLogin(sessionManager.addUser(user));
            System.out.println(user.getAdmin() + "dfgfg");
            if (user.getAdmin().equals(true)) {
                response.setAdminId("OK");
            }
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToLogin(HttpStatus.BAD_REQUEST.value(), "Login or password is incorrect"));
        }

    }

    @PostMapping("/signOut")
    public ResponseEntity<ResponseToLogin> signOutUser(@RequestBody MessageFromSignOut messageFromSignOut) {
        LOG.info(messageFromSignOut.toString());
        sessionManager.removeSession(messageFromSignOut.getSessionId());
        if (messageFromSignOut.getSessionId() != null) {
            ResponseToLogin response = new ResponseToLogin(null);
            return ResponseEntity.ok(response);
        } else {
            ResponseToLogin response = new ResponseToLogin(401, "SignOut error");
            LOG.info(response.toString());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @PostMapping("/personal")
    public ResponseEntity<ResponseToPersonal> personal(@RequestBody MessageFromPesonal messageFromPesonal) {
        LOG.info(messageFromPesonal.toString());
        if (messageFromPesonal.getSessionId() == null || messageFromPesonal.getSessionId().isEmpty()) {
            ResponseToPersonal response = new ResponseToPersonal(401, "Something wrong");
            LOG.info(response.toString());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToPersonal(HttpStatus.BAD_REQUEST.value(), "Something wrong"));
        }
        User user = sessionManager.getUser(messageFromPesonal.getSessionId());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToPersonal(HttpStatus.BAD_REQUEST.value(), "Something wrong"));
        }
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseToPersonal(HttpStatus.OK.value(), user.getFirstname(), user.getLastname(), user.getEmail()));
    }

    @PostMapping("/goods")
    public ResponseEntity<ResponseToGoods> goods(@RequestBody MessageFromGoods messageFromGoods) {
        LOG.info(messageFromGoods.toString());
        Category category = categoryRepository.findById(messageFromGoods.getId()).orElse(null);
        System.out.println(category);
        if (category == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToGoods(HttpStatus.BAD_REQUEST.value(), "Have not category " + messageFromGoods.getId().toString()));
        }
        ResponseToGoods response = new ResponseToGoods(HttpStatus.OK.value());
        response.setArrayGoods(category.getItems().stream().map(it -> new Good(it.getId(), it.getName(), it.getDescription(), it.getAmount(), it.getPrice(), it.getCategory().getId())).collect(Collectors.toList()));
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/categories")
    public ResponseEntity<ResponseToCategory> categories(@RequestBody MessageFromCategories messageFromCategories) {
        LOG.info(messageFromCategories.toString());
        List<Category> categories = categoryRepository.findAll();
        if (categories == null || categories.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToCategory(HttpStatus.BAD_REQUEST.value(), "Have not categories"));
        }
        ResponseToCategory response = new ResponseToCategory(200);

        response.setArrayCategories(categories.stream().map(it -> new CategoryModel(it.getId(), it.getName())).collect(Collectors.toList()));
        return ResponseEntity.ok(response);

    }

    @PostMapping("/good")
    public ResponseEntity<ResponseToGood> good(@RequestBody MessageFromGood messageFromGood) {
        LOG.info(messageFromGood.toString());
        Item item = itemRepository.findById(messageFromGood.getId()).orElse(null);
        if (item == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToGood(HttpStatus.BAD_REQUEST.value(), "Have not item " + messageFromGood.getId().toString()));
        }
        ResponseToGood response = new ResponseToGood(200);
        response.setGood(new Good(item.getId(), item.getName(), item.getDescription(), item.getAmount(), item.getPrice(), item.getCategory().getId()));
        return ResponseEntity.ok(response);
    }

    @PostMapping("/cart")
    public ResponseEntity<ResponseToCart> cart(@RequestBody Map<String, Integer> messageFromCart) {
        LOG.info(messageFromCart.toString());
        if (CollectionUtils.isEmpty(messageFromCart) || messageFromCart == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToCart(HttpStatus.BAD_REQUEST.value(), "Cart is empty"));
        }
        ResponseToCart response = new ResponseToCart(HttpStatus.OK.value());
        for (Map.Entry<String, Integer> entry : messageFromCart.entrySet()) {
            Long tmp = Long.parseLong(entry.getKey());
            if (entry.getValue() != 0) {
                Item item = itemRepository.getOne(tmp);
                if (item.getAmount() >= entry.getValue()) {
                    response.getArrayItems().add(new GoodToCart(item.getId(), item.getName(), item.getAmount(), item.getPrice(), item.getCategory().getId(), entry.getValue()));
                }
            }
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/order")
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<ResponseToOrder> order(@RequestBody MessageFromOrder messageFromOrder) {
        LOG.info(messageFromOrder.toString());
        User user = sessionManager.getUser(messageFromOrder.getSessionId());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToOrder(HttpStatus.BAD_REQUEST.value(), "User is not exist"));
        }
        if (messageFromOrder.getShipping().getFirstName() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToOrder(HttpStatus.BAD_REQUEST.value(), "Name is empty"));
        }
        if (messageFromOrder.getShipping().getLastName() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToOrder(HttpStatus.BAD_REQUEST.value(), "Surname is empty"));
        }
        if (messageFromOrder.getShipping().getPostalCod() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToOrder(HttpStatus.BAD_REQUEST.value(), "Postal is empty"));
        }
        if (messageFromOrder.getShipping().getAddress() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToOrder(HttpStatus.BAD_REQUEST.value(), "Address is empty"));
        }
        if (messageFromOrder.getShipping().getCity() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToOrder(HttpStatus.BAD_REQUEST.value(), "City is empty"));
        }
        if (messageFromOrder.getShipping().getNumber() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToOrder(HttpStatus.BAD_REQUEST.value(), "Number is empty"));
        }
        if (messageFromOrder.getDelivery() == null || messageFromOrder.getDelivery().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToOrder(HttpStatus.BAD_REQUEST.value(), "Delivery is empty"));
        }
        if (messageFromOrder.getPayment() == null || messageFromOrder.getPayment().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToOrder(HttpStatus.BAD_REQUEST.value(), "Delivery is empty"));
        }
        if (messageFromOrder.getCart() == null || messageFromOrder.getCart().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToOrder(HttpStatus.BAD_REQUEST.value(), "Cart is empty"));
        }
        BigDecimal sum = BigDecimal.ZERO;
        BigDecimal totalSum = BigDecimal.ZERO;
        for (Map.Entry<String, Integer> entry : messageFromOrder.getCart().entrySet()) {
            Long tmp = Long.parseLong(entry.getKey());
            if (entry.getValue() != 0) {
                Item item = itemRepository.getOne(tmp);
                if (item.getAmount() >= entry.getValue()) {
                    sum = item.getPrice().multiply(new BigDecimal(entry.getValue()));
                    totalSum = totalSum.add(sum);
                }
            }
        }
        if (totalSum == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToOrder(HttpStatus.BAD_REQUEST.value(), "Cart is empty"));
        }

        Address address = new Address(messageFromOrder.getShipping().getNumber(), messageFromOrder.getShipping().getFirstName(), messageFromOrder.getShipping().getLastName(), messageFromOrder.getShipping().getCity(), messageFromOrder.getShipping().getAddress(), messageFromOrder.getShipping().getPostalCod());
        address = addressRepository.save(address);

        Orderr order = new Orderr();
        order.setCustomer(user);
        Status status = Status.NEW;
        order.setCreated(LocalDate.now());
        order.setOrderStatus(status.toString());
        order.setAddress(address);

        if (messageFromOrder.getDelivery().equals("PPL")) {
            DeliveryBy deliveryBy = DeliveryBy.PPL;
            order.setOrderMethod(deliveryBy.toString());
            totalSum = totalSum.add(new BigDecimal(27));
        } else if (messageFromOrder.getDelivery().equals("DPH")) {
            DeliveryBy deliveryBy = DeliveryBy.DPH;
            order.setOrderMethod(deliveryBy.toString());
            totalSum = totalSum.add(new BigDecimal(32));
        } else if (messageFromOrder.getDelivery().equals("Take Away")) {
            DeliveryBy deliveryBy = DeliveryBy.TAKEAWAY;
            order.setOrderMethod(deliveryBy.toString());
        }
        order = orderrRepository.save(order);

        for (Map.Entry<String, Integer> entry : messageFromOrder.getCart().entrySet()) {
            Long tmp = Long.parseLong(entry.getKey());
            if (entry.getValue() != 0) {
                Item item = itemRepository.getOne(tmp);
                if (item.getAmount() >= entry.getValue()) {
                    OrderItem orderItem = new OrderItem();
                    orderItem.setOrder(order);
                    orderItem.setItem(item);
                    orderItem.setCount(entry.getValue());
                    orderItemRepository.save(orderItem);
                }
            }
        }

        Payment payment = new Payment();

        payment.setOrder(order);
        if (messageFromOrder.getPayment().equals("Cash")) {
            PaymentMethod method = PaymentMethod.CASH;
            payment.setPaymentmethod(method.toString());
        } else if (messageFromOrder.getPayment().equals("CreditCard")) {
            PaymentMethod method = PaymentMethod.CREDITCARD;
            payment.setPaymentmethod(method.toString());
        } else if (messageFromOrder.getPayment().equals("PayPal")) {
            PaymentMethod method = PaymentMethod.PAYPAL;
            payment.setPaymentmethod(method.toString());
        }

        payment.setTotal(totalSum);
        payment.setPaid(false);
        payment = paymentRepository.save(payment);

        ResponseToOrder response = new ResponseToOrder(HttpStatus.OK.value());
        response.setSum(totalSum);
        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @PostMapping("/payment")
    public ResponseEntity<ResponseToPayment> order(@RequestBody MessageFromPayment messageFromPayment) {
        LOG.info(messageFromPayment.toString());
        if (messageFromPayment.getSessionId() == null || messageFromPayment.getSessionId().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToPayment(HttpStatus.BAD_REQUEST.value(), "Something wrong"));
        }
        User user = sessionManager.getUser(messageFromPayment.getSessionId());
        Payment payment = paymentRepository.getLastPayment(user, PageRequest.of(0, 1, Sort.Direction.DESC, "id")).stream().findFirst().orElse(null);
        Orderr order = payment.getOrder();
        if (order.getOrderStatus().equals(Status.PAID.toString())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToPayment(HttpStatus.BAD_REQUEST.value(), "You have paid this order"));
        }
        Boolean pay;
        if (payment.getPaymentmethod().equals("PayPal") || payment.getPaymentmethod().equals("CreditCard")) {
            Orderr orderr = payment.getOrder();
            orderr.setOrderStatus(Status.PAID.toString());
            orderr = orderrRepository.save(orderr);
            pay = true;
        } else {
            pay = false;
        }

        payment.setPaid(true);
        paymentRepository.save(payment);
        String billingInfo = String.format("Payment successfull(User:%s %s (%s), Order:%d, Amount:%s)", user.getFirstname(), user.getLastname(), user.getEmail(), order.getId(), payment.getTotal());
        producer.sendMessage(
                "billing",
                payment.getId().toString(),
                billingInfo
        );
        LOG.info("Billing info "+billingInfo+" sent to external billing service");
        BigDecimal sum = payment.getTotal();
        ResponseToPayment response = new ResponseToPayment(HttpStatus.OK.value(), sum, pay);
        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @PostMapping("/orders")
    public ResponseEntity<ResponseToOrders> orders(@RequestBody MessageFromOrders messageFromOrders) {
        LOG.info(messageFromOrders.toString());
        if (messageFromOrders.getSessionId() == null || messageFromOrders.getSessionId().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToOrders(HttpStatus.BAD_REQUEST.value(), "Something wrong"));
        }
        User user = sessionManager.getUser(messageFromOrders.getSessionId());
        List<Orderr> orderrs = orderrRepository.getAll(user);
        List<Order> orders = new ArrayList<>();
        for (int i = 0; i < orderrs.size(); i++) {
            Payment payment = paymentRepository.getOne(orderrs.get(i).getId());
            Order order = new Order(orderrs.get(i).getId(), orderrs.get(i).getCreated(), orderrs.get(i).getOrderStatus(), payment.getTotal(), orderrs.get(i).getOrderMethod());
            List<OrderItem> items = orderrs.get(i).getItems();
            order.setCart(items.stream().map(it -> new GoodToCart(it.getItem().getId(), it.getItem().getName(), it.getItem().getAmount(), it.getItem().getPrice(), it.getItem().getCategory().getId(), it.getCount())).collect(Collectors.toList()));
            orders.add(order);
        }
        ResponseToOrders response = new ResponseToOrders(HttpStatus.OK.value());
        response.setOrders(orders);
        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @PostMapping("/editGood")
    public ResponseEntity<ResponseToEditGood> editGood(@RequestBody MessageFromEditGood messageFromEditGood) {
        LOG.info(messageFromEditGood.toString());
        User user = sessionManager.getUser(messageFromEditGood.getSessionId());
        if (user.getAdmin() == false) {
            LOG.info(messageFromEditGood + "Denied access");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToEditGood(HttpStatus.BAD_REQUEST.value(), "Access is denied"));
        }
        if (messageFromEditGood.getName() == null || messageFromEditGood.getName().isEmpty() || messageFromEditGood.getName().length() < 1) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToEditGood(HttpStatus.BAD_REQUEST.value(), "Name is wrong"));
        }
        if (messageFromEditGood.getAmount() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToEditGood(HttpStatus.BAD_REQUEST.value(), "Amount is wrong"));
        }
        if (messageFromEditGood.getDescription() == null || messageFromEditGood.getDescription().isEmpty() || messageFromEditGood.getDescription().length() < 1) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToEditGood(HttpStatus.BAD_REQUEST.value(), "Description is wrong"));
        }

        Item item = itemRepository.getOne(messageFromEditGood.getId());
        item.setName(messageFromEditGood.getName());
        item.setAmount(messageFromEditGood.getAmount());
        item.setDescription(messageFromEditGood.getDescription());

        itemRepository.save(item);

        ResponseToEditGood response = new ResponseToEditGood(HttpStatus.OK.value());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/clientOrders")
    public ResponseEntity<ResponseToClientOrders> clientOrders(@RequestBody MessageFromClientOrders messageFromClientOrders) {
        LOG.info(messageFromClientOrders.toString());
        if (messageFromClientOrders.getSessionId() == null || messageFromClientOrders.getSessionId().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToClientOrders(HttpStatus.BAD_REQUEST.value(), "Something wrong"));
        }
        User user = sessionManager.getUser(messageFromClientOrders.getSessionId());
        if (user.getAdmin() == false) {
            LOG.info(messageFromClientOrders + "Denied access");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseToClientOrders(HttpStatus.BAD_REQUEST.value(), "Access is denied"));
        }
        List<Orderr> orderrs = orderrRepository.getAllNew();
        List<ClientOrder> clientOrders = new ArrayList<>();
        for (int i = 0; i < orderrs.size(); i++) {
            Payment payment = paymentRepository.getOne(orderrs.get(i).getId());
            ClientOrder clientOrder = new ClientOrder(orderrs.get(i).getId(), orderrs.get(i).getCreated(), orderrs.get(i).getOrderStatus(), payment.getTotal(), orderrs.get(i).getOrderMethod(), payment.getPaymentmethod());
            List<OrderItem> items = orderrs.get(i).getItems();
            clientOrder.setCart(items.stream().map(it -> new GoodToCart(it.getItem().getId(), it.getItem().getName(), it.getItem().getAmount(), it.getItem().getPrice(), it.getItem().getCategory().getId(), it.getCount())).collect(Collectors.toList()));
            clientOrder.setName(orderrs.get(i).getCustomer().getFirstname());
            clientOrder.setSurname(orderrs.get(i).getCustomer().getLastname());
            clientOrder.setEmail(orderrs.get(i).getCustomer().getEmail());
            clientOrders.add(clientOrder);
        }
        ResponseToClientOrders response = new ResponseToClientOrders(HttpStatus.OK.value());
        response.setOrders(clientOrders);
        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

}
