package uz.pdp.ppmtoolserver.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uz.pdp.ppmtoolserver.domain.Backlog;
import uz.pdp.ppmtoolserver.domain.Project;
import uz.pdp.ppmtoolserver.domain.User;
import uz.pdp.ppmtoolserver.exception.BacklogNotFoundException;
import uz.pdp.ppmtoolserver.exception.ProjectIdException;
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
        String projectIdentifier=project.getProjectIdentifier();
        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            if (project.getId()==null){
                Backlog backlog=new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(projectIdentifier.toUpperCase());
//                backlogRepository.save(backlog);
            }
            else {
                project.setBacklog(backlogRepository.
                        findByProjectIdentifier(projectIdentifier.toUpperCase()).orElseThrow(() ->
                        new BacklogNotFoundException("Error")));
            }
            project.setUser(user);
            project.setProjectLeader(user.getUsername());
            return repository.save(project);
        } catch (Exception e) {
            throw new ProjectIdException("Project ID '"+projectIdentifier+"' already exists!");
        }
    }

    public Project findProject(String projectIdentifier){
        return repository.findByProjectIdentifier(projectIdentifier.toUpperCase()).orElseThrow(() ->
                new ProjectIdException("Project ID '"+projectIdentifier+"' does not exists!"));
    }

    public List<Project> findAll() {
        return repository.findAll();
    }

    public void deleteProject(String projectIdentifier) {
        Optional<Project> optionalProject = repository.findByProjectIdentifier(projectIdentifier.toUpperCase());
        if (optionalProject.isPresent()){
            repository.delete(optionalProject.get());
        }
        else throw new ProjectIdException("This project does not exist!");
    }
}
