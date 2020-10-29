package uz.pdp.ppmtoolserver.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import uz.pdp.ppmtoolserver.domain.User;
import uz.pdp.ppmtoolserver.payload.JwtLoginSuccessResponse;
import uz.pdp.ppmtoolserver.payload.ReqLogin;
import uz.pdp.ppmtoolserver.security.JwtTokenProvider;
import uz.pdp.ppmtoolserver.service.MapValidationErrorsService;
import uz.pdp.ppmtoolserver.service.UserService;
import uz.pdp.ppmtoolserver.validator.UserValidator;

import javax.validation.Valid;
import java.util.concurrent.locks.ReentrantLock;

import static uz.pdp.ppmtoolserver.security.SecurityConstraints.TOKEN_PREFIX;

@RestController
@RequestMapping("/api/users")
public class AuthController {

    @Autowired
    private MapValidationErrorsService errorsService;
    @Autowired
    private UserService service;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserValidator validator;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody ReqLogin reqLogin, BindingResult result) {
        if (result.hasErrors()) {
            return errorsService.mapValidateErrors(result);
        }
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        reqLogin.getUsername(),
                        reqLogin.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        //  JWT
        return ResponseEntity.ok(new JwtLoginSuccessResponse(true,TOKEN_PREFIX.concat(jwtTokenProvider.generateToken(authentication))));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid@RequestBody User user, BindingResult result ){
        validator.validate(user,result);
        if (result.hasErrors()){
            return errorsService.mapValidateErrors(result);
        }
        return new ResponseEntity<>(service.saveUser(user), HttpStatus.CREATED);
    }
}
