package uz.pdp.ppmtoolserver.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uz.pdp.ppmtoolserver.domain.Backlog;
import uz.pdp.ppmtoolserver.domain.Project;
import uz.pdp.ppmtoolserver.domain.User;
import uz.pdp.ppmtoolserver.exception.BacklogNotFoundException;
import uz.pdp.ppmtoolserver.exception.ProjectIdException;
import uz.pdp.ppmtoolserver.exception.ProjectNotFoundException;
import uz.pdp.ppmtoolserver.repository.BacklogRepository;
import uz.pdp.ppmtoolserver.repository.ProjectRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository repository;
    @Autowired
    private BacklogRepository backlogRepository;

    public Project save(Project project, User user) {
        String projectIdentifier = project.getProjectIdentifier();
        project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
        if (project.getId() == null) {
            Backlog backlog = new Backlog();
            project.setBacklog(backlog);
            backlog.setProject(project);
            backlog.setProjectIdentifier(projectIdentifier.toUpperCase());
//                backlogRepository.save(backlog);
        } else {
            Optional<Project> optionalProject = repository.findById(project.getId());
            if (optionalProject.isPresent() && optionalProject.get().getProjectLeader().equals(user.getUsername())) {
                if (!optionalProject.get().getProjectIdentifier().equals(project.getProjectIdentifier()))
                    throw new ProjectNotFoundException("Project with ID: " + projectIdentifier
                            + " cannot be updated because it doesn't exist!");
                project.setBacklog(backlogRepository.
                        findByProjectIdentifier(projectIdentifier.toUpperCase()).orElseThrow(() ->
                        new BacklogNotFoundException("Error")));
            } else throw new ProjectNotFoundException("Project not found in your account!");
        }
        project.setUser(user);
        project.setProjectLeader(user.getUsername());
        try {
            return repository.save(project);
        } catch (ProjectIdException e) {
            throw new ProjectIdException("Project ID '" + projectIdentifier + "' already exists!");
        }
    }

    public Project findProject(String projectIdentifier, User user) {
        Optional<Project> optionalProject = repository.findByProjectIdentifier(projectIdentifier.toUpperCase());
        if (optionalProject.isPresent()) {
            Project project = optionalProject.get();
            if (project.getProjectLeader().equals(user.getUsername())) {
                return project;
            }
            throw new ProjectNotFoundException("Project not found in your account!");
        }
        throw new ProjectIdException("Project ID '" + projectIdentifier + "' does not exists!");
    }

    public List<Project> findAll(User user) {
        return repository.findAllByProjectLeader(user.getUsername());
    }

    public void deleteProject(String projectIdentifier, User user) {
        repository.delete(findProject(projectIdentifier, user));
    }
}
