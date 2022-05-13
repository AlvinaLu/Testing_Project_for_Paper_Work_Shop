package code.code.repositories.jpa;

import code.code.entities.Orderr;
import code.code.entities.Payment;
import code.code.entities.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface OrderrRepository extends JpaRepository<Orderr, Long> {
    @Query("select o from Orderr o where o.customer = :customer")
    List<Orderr> getAll(@Param("customer") User customer);
    @Query("select o from Orderr o where o.orderMethod = 'TAKEAWAY'")
    List<Orderr> getAllNew();

}
