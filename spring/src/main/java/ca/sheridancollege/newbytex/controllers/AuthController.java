package ca.sheridancollege.newbytex.controllers;

import java.util.Map;
import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ca.sheridancollege.newbytex.dto.AdminResponseDTO;
import ca.sheridancollege.newbytex.dto.AuthenticationRequestDTO;
import ca.sheridancollege.newbytex.dto.PasswordResetRequestDTO;
import ca.sheridancollege.newbytex.dto.UserResponseDTO;
import ca.sheridancollege.newbytex.exceptions.ApiRequestException;
import ca.sheridancollege.newbytex.mapper.UserMapper;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

	private final AuthenticationManager authenticationManager;	
	private final UserMapper userMapper;

	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody AuthenticationRequestDTO request) {
		try {
			authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

			return ResponseEntity.ok(userMapper.login(request.getEmail()));
		} catch (AuthenticationException e) {
			throw new ApiRequestException("Incorrect email or password", HttpStatus.FORBIDDEN);
		}
	}
	
	@GetMapping("/logout")
	public ResponseEntity<String> logout(Authentication authentication) {

		if(authentication != null) {
			authentication.setAuthenticated(false);	
		}
		return ResponseEntity.ok("Logged Out");
	}


	@PostMapping("/forgot")
	public ResponseEntity<String> forgotPassword(@Valid @RequestBody PasswordResetRequestDTO passwordReset) {
		boolean sendEmail = userMapper.sendPasswordResetCode(passwordReset.getEmail());
		if (!sendEmail) {
			throw new ApiRequestException("Email not found", HttpStatus.BAD_REQUEST);
		}

		return ResponseEntity.ok("Password reset code has been sent to your email");
	}

	@PostMapping("/reset")
	public boolean passwordReset(@Valid @RequestBody PasswordResetRequestDTO passwordReset) {
		UserResponseDTO user = userMapper.findByPasswordResetCode(passwordReset.getPasswordResetCode());
		try {
			userMapper.passwordReset(user.getEmail(), passwordReset.getPassword());
			return true;
		} catch (AuthenticationException e) {
			return false;
		}
	}

	@GetMapping("/isAdmin")
	public ResponseEntity<AdminResponseDTO> isAdmin(Authentication authentication) {

		AdminResponseDTO res = new AdminResponseDTO();
		
		if(authentication !=null) {
			res.setAdmin(authentication.getAuthorities().stream().anyMatch(r -> r.getAuthority().equals("ADMIN")));
		}
		return ResponseEntity.ok(res);
		
	}
}
