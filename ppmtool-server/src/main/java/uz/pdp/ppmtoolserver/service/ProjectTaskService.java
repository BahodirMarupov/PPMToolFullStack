package uz.pdp.ppmtoolserver.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uz.pdp.ppmtoolserver.domain.Backlog;
import uz.pdp.ppmtoolserver.domain.ProjectTask;
import uz.pdp.ppmtoolserver.domain.User;
import uz.pdp.ppmtoolserver.exception.BacklogNotFoundException;
import uz.pdp.ppmtoolserver.repository.BacklogRepository;
import uz.pdp.ppmtoolserver.repository.ProjectTaskRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectTaskService {

    @Autowired
    private ProjectTaskRepository repository;
    @Autowired
    private BacklogRepository backlogRepository;

    // Add project task
    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask, User user) {

        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier).orElseThrow(() ->
                new BacklogNotFoundException("Project ID '" + projectIdentifier + "' does not exists!"));
        if (!backlog.getProject().getProjectLeader().equals(user.getUsername()))
            throw new BacklogNotFoundException("Project not found in your account!");
        backlog.setPTSequence(backlog.getPTSequence() + 1);
        projectTask.setBacklog(backlog);
        projectTask.setProjectSequence(projectIdentifier + "-" + backlog.getPTSequence());
        projectTask.setProjectIdentifier(projectIdentifier);

        if (projectTask.getPriority() == null || projectTask.getPriority() == 0) {
            projectTask.setPriority(3);
        }
        projectTask.setStatus("TO_DO");
        return repository.save(projectTask);
    }

    //Get all project task belong to specific user
    public List<ProjectTask> getBacklog(String backlog_id, User user) {
        Optional<Backlog> optionalBacklog = backlogRepository.findByProjectIdentifier(backlog_id);
        if (optionalBacklog.isPresent()) {
            if (optionalBacklog.get().getProject().getProjectLeader().equals(user.getUsername())) {
                return repository.findAllByProjectIdentifierOrderByPriority(backlog_id);
            }
            throw new BacklogNotFoundException("Not found in your account!");
        } else throw new BacklogNotFoundException("Project with ID " + backlog_id + " does not exist");
    }

    //Get a project task
    public ProjectTask findByProjectSequence(String projectSequence, String backlog_id, User user) {
        return checkProjectTask(backlog_id, projectSequence, user);
    }

    //Update the project task
    public ProjectTask updateProjectTask(String backlog_id, String projectSequence, ProjectTask updatedTask, User user) {
        checkProjectTask(backlog_id, projectSequence, user);
        return repository.save(updatedTask);
    }

    //Delete the project task
    public void deleteProjectTask(String backlog_id, String projectSequence, User user) {
        repository.delete(checkProjectTask(backlog_id, projectSequence, user));
    }

    //Check project task
    private ProjectTask checkProjectTask(String backlog_id, String projectSequence, User user) {
        Optional<Backlog> optionalBacklog = backlogRepository.findByProjectIdentifier(backlog_id);
        if (optionalBacklog.isPresent()) {
            if (optionalBacklog.get().getProject().getProjectLeader().equals(user.getUsername())) {
                ProjectTask projectTask = repository.findByProjectSequence(projectSequence).orElseThrow(() ->
                        new BacklogNotFoundException("Project task " + projectSequence + " not found"));
                if (!projectTask.getProjectIdentifier().equals(backlog_id)) {
                    throw new BacklogNotFoundException("Project task " + projectSequence
                            + " does not exist in project: " + backlog_id);
                }
                return projectTask;
            }
            throw new BacklogNotFoundException("Not found in your account!");
        } else throw new BacklogNotFoundException("Project with ID " + backlog_id + " does not exist");
    }
}
