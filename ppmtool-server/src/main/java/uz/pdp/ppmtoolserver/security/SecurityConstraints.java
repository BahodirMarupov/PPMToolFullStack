package uz.pdp.ppmtoolserver.security;

public class  SecurityConstraints {
     public static final String SIGN_UP_URL="/api/users/**";
     public static final String JWT_KEY="believe";
     public static final String HEADER_STRING="Authorization";
     public static final String TOKEN_PREFIX="Bearer ";
}
