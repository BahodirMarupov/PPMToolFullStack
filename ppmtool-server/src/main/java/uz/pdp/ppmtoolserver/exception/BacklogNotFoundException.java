package uz.pdp.ppmtoolserver.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BacklogNotFoundException extends RuntimeException{
    public BacklogNotFoundException(String message){
        super(message);
    }
}
