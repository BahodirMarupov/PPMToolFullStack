package uz.pdp.ppmtoolserver.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import uz.pdp.ppmtoolserver.domain.User;
import uz.pdp.ppmtoolserver.exception.UsernameException;
import uz.pdp.ppmtoolserver.payload.ReqLogin;
import uz.pdp.ppmtoolserver.repository.UserRepository;

import javax.transaction.Transactional;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository repository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User saveUser(User user) {
        if (repository.existsByUsername(user.getUsername()))
            throw new UsernameException("This username is already taken!");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repository.save(user);
    }


    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return null;
    }

    @Transactional
    public User loadUserById(Long id) {
        return repository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found!"));
    }

}
