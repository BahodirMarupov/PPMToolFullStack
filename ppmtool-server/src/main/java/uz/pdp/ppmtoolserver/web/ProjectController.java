package uz.pdp.ppmtoolserver.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import uz.pdp.ppmtoolserver.domain.Project;
import uz.pdp.ppmtoolserver.service.MapValidationErrorsService;
import uz.pdp.ppmtoolserver.service.ProjectService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/project")
public class ProjectController {

    @Autowired
    private ProjectService service;
    @Autowired
    private MapValidationErrorsService errorsService;

    @PostMapping("")
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result){

        if (result.hasErrors()) return errorsService.mapValidateErrors(result);
        Project project1=service.save(project);
        return new ResponseEntity<>(project1, HttpStatus.CREATED);
    }

    @GetMapping("/{projectIdentifier}")
    public ResponseEntity<?> getProject(@PathVariable String projectIdentifier){
        Project project=service.findProject(projectIdentifier);
        return new ResponseEntity<>(project,HttpStatus.OK);
    }

    @GetMapping("/all")
    public List<Project> getAll(){
        return service.findAll();
    }

    @DeleteMapping("/{projectIdentifier}")
    public ResponseEntity<?> deleteProject(@PathVariable String projectIdentifier){
        service.deleteProject(projectIdentifier);
        return new ResponseEntity<>("The project is deleted!",HttpStatus.OK);
    }
}
