package uz.pdp.ppmtoolserver.exception;

import org.omg.CORBA.UserException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler
    public final ResponseEntity<?> handleProjectIdException(ProjectIdException exception, WebRequest request){
        ProjectIdExceptionResponse exceptionResponse=new ProjectIdExceptionResponse(exception.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<?> handleBacklogNotFoundException(BacklogNotFoundException exception,WebRequest request){
        BacklogExceptionResponse backlogExceptionResponse=new BacklogExceptionResponse(exception.getMessage());
        return new ResponseEntity<>(backlogExceptionResponse,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<?> handleUsernameException(UserException exception){
        UsernameExceptionResponse exceptionResponse=new UsernameExceptionResponse(exception.getMessage());
        return new ResponseEntity<>(exceptionResponse,HttpStatus.BAD_REQUEST);
    }
}
