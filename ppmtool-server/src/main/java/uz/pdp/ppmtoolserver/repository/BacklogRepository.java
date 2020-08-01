package uz.pdp.ppmtoolserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.pdp.ppmtoolserver.domain.Backlog;

import java.util.Optional;

public interface BacklogRepository extends JpaRepository<Backlog,Long> {
    boolean existsByProjectIdentifier(String projectIdentifier);
    Optional<Backlog> findByProjectIdentifier(String projectIdentifier);
}
