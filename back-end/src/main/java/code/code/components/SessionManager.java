package code.code.components;

import code.code.entities.User;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class SessionManager {
    private Map<String, UserSession> userMap = new ConcurrentHashMap<>();

    public String addUser(User user) {
        String sessionId = UUID.randomUUID().toString();
        UserSession userSession = new UserSession(user, LocalDateTime.now().plusHours(1));
        userMap.put(sessionId, userSession);
        return sessionId;
    }

    public User getUser(String sessionId) {
        UserSession userSession = userMap.get(sessionId);
        if (userSession == null) {
            return null;
        }
        if (userSession.expiredTime.isBefore(LocalDateTime.now())) {
            userMap.remove(sessionId);
            return null;
        } else {
            return userSession.user;
        }

    }
    public void removeSession(String sessionId){
        userMap.remove(sessionId);
    }

    public int getMapSize(){
        return userMap.size();
    }

    private static class UserSession {
        private User user;
        private LocalDateTime expiredTime;

        public UserSession(User user, LocalDateTime expiredTime) {
            this.user = user;
            this.expiredTime = expiredTime;
        }
    }
}

