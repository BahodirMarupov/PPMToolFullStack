package uz.pdp.ppmtoolserver.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import uz.pdp.ppmtoolserver.domain.User;
import uz.pdp.ppmtoolserver.service.UserService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

import static uz.pdp.ppmtoolserver.security.SecurityConstraints.*;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            final String jwt = getJwtFromRequest(httpServletRequest);
            if (StringUtils.hasText(jwt) && validateToken(jwt)) {
                final Long userId = getUserIdFromJwt(jwt);
                final User user = userService.loadUserById(userId);
                UsernamePasswordAuthenticationToken authenticationToken = new
                        UsernamePasswordAuthenticationToken(
                        user,
                        null,
                        Collections.emptyList()
                );
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String jwt = request.getHeader(HEADER_STRING);
        if (StringUtils.hasText(jwt) && jwt.startsWith(TOKEN_PREFIX)) {
            return jwt.substring(7);
        }
        return null;
    }

    private boolean validateToken(String jwt) {
        try {
            Jwts.parser().setSigningKey(JWT_KEY).parseClaimsJws(jwt);
            return true;
        } catch (SignatureException ex) {
            System.out.println("Invalid JWT Signature");
        } catch (MalformedJwtException ex) {
            System.out.println("Invalid JWT Token");
        } catch (ExpiredJwtException ex) {
            System.out.println("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            System.out.println("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            System.out.println("JWT claims string is empty");
        }
        return false;
    }

    private Long getUserIdFromJwt(String jwt) {
        final Claims claims = Jwts.parser().setSigningKey(JWT_KEY).parseClaimsJws(jwt).getBody();
        return Long.parseLong((String) claims.get("id"));
    }
}
