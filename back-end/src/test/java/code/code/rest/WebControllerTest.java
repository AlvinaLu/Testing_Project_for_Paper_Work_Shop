package code.code.rest;

import code.code.components.SessionManager;
import code.code.entities.Item;
import code.code.entities.User;
import code.code.kafka.Producer;
import code.code.messagingstompwebsocket.*;
import code.code.repositories.jpa.*;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest
class WebControllerTest {
    @MockBean
    private UserRepository userRepository;
    @MockBean
    private CategoryRepository categoryRepository;
    @MockBean
    private ItemRepository itemRepository;
    @MockBean
    private AddressRepository addressRepository;
    @MockBean
    private OrderItemRepository orderItemRepository;
    @MockBean
    private PaymentRepository paymentRepository;
    @MockBean
    private OrderrRepository orderrRepository;
    @MockBean
    private SessionManager sessionManager;
    @MockBean
    private Producer producer;
    @Autowired
    private WebController webController;

    @Test
    public void testSignIn_SimpleUser_Equal(){
        User user = new User();
        user.setPassword("der parol");
        user.setAdmin(false);
        user.setId(999L);

        Mockito.when(userRepository.getByEmail(Mockito.anyString())).thenReturn(user);
        Mockito.when(sessionManager.addUser(Mockito.any())).thenReturn("sessionId");

        MessageFromSignIn message = new MessageFromSignIn();
        message.setEmail("aaa@bb.ccc");
        message.setPassword("der parol");
        ResponseEntity<ResponseToLogin> responseToLoginResponseEntity = webController.signInUser(message);

        assertEquals(Integer.valueOf(200), responseToLoginResponseEntity.getBody().getStatus());
        assertEquals("sessionId", responseToLoginResponseEntity.getBody().getSessionId());
    }

    @Test
    public void testPersonalGetUserBySession_SimpleUser_Equal(){
        User user = new User();
        user.setEmail("aaa@bb.ccc");
        user.setFirstname("ccc");
        user.setLastname("rrr");
        user.setPassword("der parol");
        user.setAdmin(false);
        user.setId(999L);

        Mockito.when(sessionManager.addUser(Mockito.any())).thenReturn("sessionId");
        Mockito.when(sessionManager.getUser(Mockito.any())).thenReturn(user);


        MessageFromPesonal message = new MessageFromPesonal();
        message.setSessionId("sessionId");

        ResponseEntity<ResponseToPersonal> responseToPersonalResponseEntity = webController.personal(message);

        assertEquals(Integer.valueOf(200), responseToPersonalResponseEntity.getBody().getStatus());
        assertEquals("aaa@bb.ccc", responseToPersonalResponseEntity.getBody().getEmail());
        assertEquals("ccc", responseToPersonalResponseEntity.getBody().getName());
        assertEquals("rrr", responseToPersonalResponseEntity.getBody().getSurname());

    }

    @Test
    public void testCheckValue_SimpleCart_Equal(){
        Map<String,Integer> message =  new HashMap<>();
        message.put("1", 3);
        Long itemId = 1L;
        Item item = new Item();
        item.setAmount(2);

        Mockito.when(itemRepository.getOne(itemId)).thenReturn(item);

        ResponseEntity<ResponseToCart> responseToCartResponseEntity = webController.cart(message);

        assertEquals(Integer.valueOf(200), responseToCartResponseEntity.getBody().getStatus());
        assertFalse(responseToCartResponseEntity.getBody().getArrayItems().contains(item));

    }

}
