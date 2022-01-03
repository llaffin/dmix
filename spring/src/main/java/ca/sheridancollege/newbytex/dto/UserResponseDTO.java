package ca.sheridancollege.newbytex.dto;

import java.util.Set;

import ca.sheridancollege.newbytex.beans.Role;
import lombok.Data;

@Data
public class UserResponseDTO {
//    private Long id;
	private String id;
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
