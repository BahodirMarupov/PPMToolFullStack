package uz.pdp.ppmtoolserver.security;

public class  SecurityConstraints {
     public static final String SIGN_UP_URL="/api/users/register";
     public static final long EXPIRE_TIME=(3*24*3600*1000); // 3 kun
     public static final String JWT_KEY="believe";
     public static final String HEADER_STRING="Authorization";
     public static final String TOKEN_PREFIX="Bearer";
}
