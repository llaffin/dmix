package ca.sheridancollege.newbytex.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class RegistrationRequestDTO {

    @NotBlank(message = "Username cannot be empty")
    private String name;
    
    private String address;
    private String phonenumber;

    @NotBlank(message = "Password cannot be empty")
    private String password;

    @NotBlank(message = "Password confirmation cannot be empty.")
    private String password2;

    @Email(message = "Incorrect email")
    @NotBlank(message = "Email cannot be empty")
    private String email;
}
