package uz.pdp.ppmtoolserver.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data@AllArgsConstructor
public class BacklogExceptionResponse {
    private String ProjectNotFound;
}
