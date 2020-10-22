package uz.pdp.ppmtoolserver.payload;

import javax.validation.constraints.NotBlank;

public class ReqLogin {
    @NotBlank(message = "Username cannot be blank")
    private String username;
    @NotBlank(message = "Password cannot be blank")
    private String password;

    public ReqLogin() {
    }

    public ReqLogin(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
