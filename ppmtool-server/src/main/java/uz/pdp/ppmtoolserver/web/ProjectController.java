package uz.pdp.ppmtoolserver.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import uz.pdp.ppmtoolserver.domain.Project;
import uz.pdp.ppmtoolserver.domain.User;
import uz.pdp.ppmtoolserver.security.CurrentUser;
import uz.pdp.ppmtoolserver.service.MapValidationErrorsService;
import uz.pdp.ppmtoolserver.service.ProjectService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/project")
@CrossOrigin
public class ProjectController {

    @Autowired
    private ProjectService service;
    @Autowired
    private MapValidationErrorsService errorsService;

    @PostMapping("")
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project,
                                              BindingResult result, @CurrentUser User user){

        if (result.hasErrors()) return errorsService.mapValidateErrors(result);
        Project project1=service.save(project,user);
        return new ResponseEntity<>(project1, HttpStatus.CREATED);
    }

    @GetMapping("/{projectIdentifier}")
    public ResponseEntity<?> getProject(@PathVariable String projectIdentifier,@CurrentUser User user){
        Project project=service.findProject(projectIdentifier,user);
        return new ResponseEntity<>(project,HttpStatus.OK);
    }

    @GetMapping("/all")
    public List<Project> getAll(@CurrentUser User user){
        return service.findAll(user);
    }

    @DeleteMapping("/{projectIdentifier}")
    public ResponseEntity<?> deleteProject(@PathVariable String projectIdentifier,@CurrentUser User user){
        service.deleteProject(projectIdentifier,user);
        return new ResponseEntity<>("The project is deleted!",HttpStatus.OK);
    }
}
