package uz.pdp.ppmtoolserver.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import uz.pdp.ppmtoolserver.domain.ProjectTask;
import uz.pdp.ppmtoolserver.domain.User;
import uz.pdp.ppmtoolserver.security.CurrentUser;
import uz.pdp.ppmtoolserver.service.MapValidationErrorsService;
import uz.pdp.ppmtoolserver.service.ProjectTaskService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {

    @Autowired
    private ProjectTaskService service;
    @Autowired
    private MapValidationErrorsService errorsService;

    @PostMapping("/{backlog_id}")
    public ResponseEntity<?> saveOrUpdateProjectTask(@PathVariable String backlog_id,
                                                     @Valid @RequestBody ProjectTask projectTask,
                                                     BindingResult result,
                                                     @CurrentUser User user) {

        if (result.hasErrors()) {
            return errorsService.mapValidateErrors(result);
        }

        return new ResponseEntity<>(service.addProjectTask(backlog_id, projectTask,user), HttpStatus.CREATED);
    }

    @GetMapping("/{backlog_id}")
    public List<ProjectTask> getBacklog(@PathVariable String backlog_id, @CurrentUser User user) {
        return service.getBacklog(backlog_id,user);
    }

    @GetMapping("/{backlog_id}/{projectSequence}")
    public ResponseEntity<?> findByProjectSequence(@PathVariable String backlog_id, @PathVariable String projectSequence,@CurrentUser User user) {
        return new ResponseEntity<>(service.findByProjectSequence(projectSequence, backlog_id,user), HttpStatus.OK);
    }

    @PatchMapping("/{backlog_id}/{projectSequence}")
    public ResponseEntity<?> updateProjectTask(@PathVariable String backlog_id,
                                             @PathVariable String projectSequence,
                                             @RequestBody @Valid ProjectTask updatedTask,
                                             BindingResult result,
                                               @CurrentUser User user){
        if (result.hasErrors()){
            return errorsService.mapValidateErrors(result);
        }

        return new ResponseEntity<>(service.updateProjectTask(backlog_id,projectSequence,updatedTask,user),HttpStatus.OK);
    }

    @DeleteMapping("/{backlog_id}/{projectSequence}")
    public ResponseEntity<?> deleteProjectTask(@PathVariable String backlog_id,
                                               @PathVariable String projectSequence,
                                               @CurrentUser User user){
        service.deleteProjectTask(backlog_id,projectSequence,user);
        return new ResponseEntity<String>("Project task "+projectSequence+" is deleted",HttpStatus.OK);
    }
}
