package code.code.repositories.jpa;

import code.code.entities.Payment;
import code.code.entities.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    @Query("select p from Payment p where p.order.customer = :customer")
    List<Payment> getLastPayment(@Param("customer") User customer, Pageable pageable);
}
