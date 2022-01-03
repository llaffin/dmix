package ca.sheridancollege.newbytex.services;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import ca.sheridancollege.newbytex.beans.User;

public interface UserService {
	
	User findOne(String id);

    User findUserById(String userId);

    User findUserByEmail(String email);

    List<User> findAllUsers();

    User findByPasswordResetCode(String code);

    Map<String, Object> login(String email);

    boolean registerUser(User user);

    void registerOauthUser(String email, String username, String address, String phonenumber);

    void updateOauthUser(User user, String username);

    boolean activateUser(String code);

    boolean sendPasswordResetCode(String email);

    void passwordReset(String email, String password);

    void userSave(String username, Map<String, String> form, User user);

    void updateProfile(String email, String username);

}
