package uz.pdp.ppmtoolserver.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import uz.pdp.ppmtoolserver.domain.User;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static uz.pdp.ppmtoolserver.security.SecurityConstraints.EXPIRE_TIME;
import static uz.pdp.ppmtoolserver.security.SecurityConstraints.JWT_KEY;

@Component
public class JwtTokenProvider {

    public String generateToken(Authentication authentication){
        User user=(User) authentication.getPrincipal();
        Date now=new Date(System.currentTimeMillis());
        Date expireDate=new Date(System.currentTimeMillis()+EXPIRE_TIME);
        String userId= String.valueOf(user.getId());
        Map<String,Object> claims=new HashMap<>();
        claims.put("id",userId);
        claims.put("username",user.getUsername());
        claims.put("fullName",user.getFullName());

        return Jwts.builder()
                .setSubject(userId)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.ES512,JWT_KEY)
                .compact();

    }
}
