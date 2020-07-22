package uz.pdp.ppmtoolserver.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uz.pdp.ppmtoolserver.domain.Project;
import uz.pdp.ppmtoolserver.exception.ProjectIdException;
import uz.pdp.ppmtoolserver.repository.ProjectRepository;

import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository repository;

    public Project save(Project project) {
        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            return repository.save(project);
        } catch (Exception e) {
            throw new ProjectIdException("Project ID '"+project.getProjectIdentifier()+"' already exists!");
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
        if (repository.existsByProjectIdentifier(projectIdentifier.toUpperCase())){
            repository.deleteByProjectIdentifier(projectIdentifier.toUpperCase());
        }
        else throw new ProjectIdException("This project does not exist!");
    }
}
