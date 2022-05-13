package code.code.components;

import code.code.entities.User;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.powermock.reflect.Whitebox;
import org.powermock.reflect.internal.WhiteboxImpl;

import java.time.Clock;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Map;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.util.AssertionErrors.assertEquals;
import static org.springframework.test.util.AssertionErrors.assertNotEquals;

public class SessionManagerTest {
    SessionManager sessionManager;

    @Test
    public void addUserTest_simpleUser_sessionManagerReturnNotEmptyValue() {
        sessionManager = new SessionManager();
        User user = new User();
        assertThat(sessionManager.addUser(user)).isNotEmpty();
        assertTrue(1 == sessionManager.getMapSize());

    }

    @Test
    public void addUserTest_simpleUser_sessionManagerMapGetSizePlusOne() {
        sessionManager = new SessionManager();
        int size = sessionManager.getMapSize() + 1;
        User user = new User();
        sessionManager.addUser(user);
        assertTrue(size == sessionManager.getMapSize());

    }

    @Test
    public void addUserTest_notEqualUsers_notEquals() {
        sessionManager = new SessionManager();
        User user = new User();
        User user2 = new User();
        assertFalse(sessionManager.addUser(user).equals(sessionManager.addUser(user2)));
    }
    @Test
    public void getUserTest_EqualUsers_equals() {
        sessionManager = new SessionManager();
        User user = new User();
        String sessionId = sessionManager.addUser(user);
        assertTrue(user.equals(sessionManager.getUser(sessionId)));
    }
    @Test
    public void getUserTest_userIsNotFound_true() {
        sessionManager = new SessionManager();
        assertTrue(null == sessionManager.getUser("example"));
    }
    @Test
    public void removeSessionTest_RemoveSession_true() {
        sessionManager = new SessionManager();
        User user = new User();
        String sessionId = sessionManager.addUser(user);
        sessionManager.removeSession(sessionId);
        assertTrue(0 == sessionManager.getMapSize());
    }
    @Test
    public void getUserTest_SessionExpired_true() {
        sessionManager = new SessionManager();
        User user = new User();
        String sessionId = sessionManager.addUser(user);
        Map<String, Object> userMap = Whitebox.getInternalState(sessionManager,"userMap");
        Whitebox.setInternalState(userMap.get(sessionId), "expiredTime", LocalDateTime.now().minusMinutes(5));
        assertTrue(null == sessionManager.getUser(sessionId));
    }
}

