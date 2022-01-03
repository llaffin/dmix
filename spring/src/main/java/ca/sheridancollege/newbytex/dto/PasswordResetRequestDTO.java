package ca.sheridancollege.newbytex.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PasswordResetRequestDTO {
	private String email;
	private String passwordResetCode;
	private String password;
	private String password2;
}
