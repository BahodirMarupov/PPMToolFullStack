package uz.pdp.ppmtoolserver.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data@NoArgsConstructor@AllArgsConstructor
public class InvalidLoginResponse {
    private String username;
    private String password;
}
