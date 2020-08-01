package uz.pdp.ppmtoolserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.pdp.ppmtoolserver.domain.ProjectTask;

import java.util.List;
import java.util.Optional;

public interface ProjectTaskRepository extends JpaRepository<ProjectTask,Long> {
    List<ProjectTask> findAllByProjectIdentifierOrderByPriority(String projectIdentifier);
    Optional<ProjectTask> findByProjectSequence(String projectSequence);
    boolean existsByProjectSequence(String projectSequence);

}
