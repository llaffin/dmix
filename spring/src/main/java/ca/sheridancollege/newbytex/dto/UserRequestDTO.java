package ca.sheridancollege.newbytex.dto;

import java.util.Set;

import javax.validation.constraints.NotBlank;

import ca.sheridancollege.newbytex.beans.Role;
import lombok.Data;

@Data
public class UserRequestDTO {
    
    @NotBlank(message = "Username cannot be empty")
    private String name;
    private String address;
    private String phonenumber;
    private String email;
    private boolean active;
    private String activationCode;
    private String passwordResetCode;
    private String token;
    private Set<Role> roles;
}
