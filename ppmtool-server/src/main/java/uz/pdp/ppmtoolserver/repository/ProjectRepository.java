package uz.pdp.ppmtoolserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.pdp.ppmtoolserver.domain.Project;

import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    Optional<Project> findByProjectIdentifier(String projectIdentifier);
    void deleteByProjectIdentifier(String projectIdentifier);
    boolean existsByProjectIdentifier(String projectIdentifier);
}
