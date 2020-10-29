package uz.pdp.ppmtoolserver.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import uz.pdp.ppmtoolserver.domain.User;

import java.util.Optional;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
public class AuditingConfig {
    @Bean
    AuditorAware<Long> auditorProvider(){
        return new AuditorAwareImp();
    }
}

class AuditorAwareImp implements AuditorAware<Long>{
    @Override
    public Optional<Long> getCurrentAuditor() {
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        if (authentication==null||!authentication.isAuthenticated()||
                authentication instanceof AnonymousAuthenticationToken){
            return Optional.empty();
        }
        User user=(User)authentication.getPrincipal();
        return Optional.ofNullable(user.getId());
    }
}
