package code.code.repositories.jpa;

import code.code.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User getByEmail(String email);
    List<User> findAll();
}
