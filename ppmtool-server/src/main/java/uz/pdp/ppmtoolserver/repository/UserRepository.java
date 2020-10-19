package uz.pdp.ppmtoolserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.pdp.ppmtoolserver.domain.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    boolean existsByUsername(String username);
    Optional<User> findByUsername(String username);
}
