package uz.pdp.ppmtoolserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class PpmtoolServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(PpmtoolServerApplication.class, args);
    }

}
