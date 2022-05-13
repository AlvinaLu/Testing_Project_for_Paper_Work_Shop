package code.code.repositories.jpa;

import code.code.entities.Address;
import code.code.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long>  {
}
