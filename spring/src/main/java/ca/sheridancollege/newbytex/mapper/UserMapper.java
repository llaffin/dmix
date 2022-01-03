package ca.sheridancollege.newbytex.mapper;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ca.sheridancollege.newbytex.beans.User;
import ca.sheridancollege.newbytex.dto.RegistrationRequestDTO;
import ca.sheridancollege.newbytex.dto.UserRequestDTO;
import ca.sheridancollege.newbytex.dto.UserResponseDTO;
import ca.sheridancollege.newbytex.services.UserService;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserMapper {

	@Autowired
    private final ModelMapper modelMapper;
	
	@Autowired
    private final UserService userService;

   
    private User convertToEntity(UserRequestDTO userRequestDto) {
        return modelMapper.map(userRequestDto, User.class);
    }

    private User convertToEntity(RegistrationRequestDTO registrationRequestDto) {
        return modelMapper.map(registrationRequestDto, User.class);
    }

    public UserResponseDTO convertToResponseDto(User user) {
        return modelMapper.map(user, UserResponseDTO.class);
    }

    public UserResponseDTO findUserById(String userId) {
        return convertToResponseDto(userService.findUserById(userId));
    }

    public UserResponseDTO findUserByEmail(String email) {
        return convertToResponseDto(userService.findUserByEmail(email));
    }

    
    public List<UserResponseDTO> findAllUsers() {
        return userService.findAllUsers()
                .stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }

    public UserResponseDTO findByPasswordResetCode(String code) {
        return convertToResponseDto(userService.findByPasswordResetCode(code));
    }

    public Map<String, Object> login(String email) {
        return userService.login(email);
    }

    public boolean registerUser(RegistrationRequestDTO registrationRequestDto) {
        return userService.registerUser(convertToEntity(registrationRequestDto));
    }

    public boolean activateUser(String code) {
        return userService.activateUser(code);
    }

    public boolean sendPasswordResetCode(String email) {
        return userService.sendPasswordResetCode(email);
    }

    public void passwordReset(String email, String password) {
        userService.passwordReset(email, password);
    }

    public void userSave(String username, Map<String, String> form, UserRequestDTO userRequestDto) {
        userService.userSave(username, form, convertToEntity(userRequestDto));
    }

    public void updateProfile(String email, String username) {
        userService.updateProfile(email, username);
    }
}