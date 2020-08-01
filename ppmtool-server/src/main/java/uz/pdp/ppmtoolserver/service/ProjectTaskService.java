package uz.pdp.ppmtoolserver.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uz.pdp.ppmtoolserver.domain.Backlog;
import uz.pdp.ppmtoolserver.domain.ProjectTask;
import uz.pdp.ppmtoolserver.exception.BacklogNotFoundException;
import uz.pdp.ppmtoolserver.repository.BacklogRepository;
import uz.pdp.ppmtoolserver.repository.ProjectTaskRepository;

import java.util.List;

@Service
public class ProjectTaskService {

    @Autowired
    private ProjectTaskRepository repository;
    @Autowired
    private BacklogRepository backlogRepository;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {

        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier).orElseThrow(() -> new BacklogNotFoundException("Project not found"));
        if (projectTask.getId() == null) {
            backlog.setPTSequence(backlog.getPTSequence() + 1);
        }
        projectTask.setBacklog(backlog);
        projectTask.setProjectSequence(projectIdentifier + "-" + backlog.getPTSequence());
        projectTask.setProjectIdentifier(projectIdentifier);

        if (projectTask.getPriority() == null) {  // projectTask.getPriority()==0
            projectTask.setPriority(3);
        }
        if (projectTask.getStatus().equals("") || projectTask.getStatus() == null) {
            projectTask.setStatus("TO_DO");
        }
        return repository.save(projectTask);
    }

    public List<ProjectTask> getBacklog(String backlog_id) {
        if (!backlogRepository.existsByProjectIdentifier(backlog_id)) {
            throw new BacklogNotFoundException("Project with ID " + backlog_id + " does not exist");
        }
        return repository.findAllByProjectIdentifierOrderByPriority(backlog_id);
    }

    public ProjectTask findByProjectSequence(String projectSequence, String backlog_id) {
        return checkProjectTask(backlog_id,projectSequence);
    }

    public ProjectTask updateProjectTask(String backlog_id, String projectSequence, ProjectTask updatedTask) {
        checkProjectTask(backlog_id,projectSequence);
        return repository.save(updatedTask);
    }

    public void deleteProjectTask(String backlog_id, String projectSequence) {
        repository.delete(checkProjectTask(backlog_id,projectSequence));
    }

    private  ProjectTask checkProjectTask(String backlog_id, String projectSequence){
        if (!backlogRepository.existsByProjectIdentifier(backlog_id)) {
            throw new BacklogNotFoundException("Project with ID " + backlog_id + " does not exist");
        }
        ProjectTask projectTask = repository.findByProjectSequence(projectSequence).orElseThrow(() -> new BacklogNotFoundException("Project task " + projectSequence + " not found"));
        if (!projectTask.getProjectIdentifier().equals(backlog_id)) {
            throw new BacklogNotFoundException("Project task " + projectSequence + " does not exist in project: "+backlog_id);
        }
        return projectTask;
    }
}
