package uz.pdp.ppmtoolserver.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uz.pdp.ppmtoolserver.domain.Project;
import uz.pdp.ppmtoolserver.exception.ProjectIdException;
import uz.pdp.ppmtoolserver.repository.ProjectRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository repository;

    public Project save(Project project) {
        String projectIdentifier=project.getProjectIdentifier();
        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
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
