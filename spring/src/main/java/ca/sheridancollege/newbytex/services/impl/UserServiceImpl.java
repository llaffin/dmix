package ca.sheridancollege.newbytex.services.impl;

import ca.sheridancollege.newbytex.beans.*;
import ca.sheridancollege.newbytex.repositories.UserRepository;
import ca.sheridancollege.newbytex.security.JwtProvider;
import ca.sheridancollege.newbytex.security.UserPrincipal;
import ca.sheridancollege.newbytex.services.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.*;
import java.util.stream.Collectors;

@Service("userDetailsServiceImpl")
@RequiredArgsConstructor
public class UserServiceImpl implements UserDetailsService, UserService {

    @Value("${hostname_spring}")
    private String hostname_spring;
    
    @Value("${hostname_react}")
    private String hostname_react;

    private final JwtProvider jwtProvider;
    
    @Autowired
    private final UserRepository userRepository;
    
    private final MailSender mailSender;
    
    private final PasswordEncoder passwordEncoder;

   //sample line

    @Override
    public User findUserById(String userId) {
        return userRepository.findByName(userId);
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User findByPasswordResetCode(String code) {
        return userRepository.findByPasswordResetCode(code);
    }

    @Override
    public Map<String, Object> login(String email) {
        User user = userRepository.findByEmail(email);
        String userRole = user.getRoles().iterator().next().name();
        String token = jwtProvider.createToken(email, userRole);

        Map<String, Object> response = new HashMap<>();
        response.put("email", email);
        response.put("token", token);
        response.put("userRole", userRole);
        return response;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException, LockedException {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        if (user.getActivationCode() != null) {
            throw new LockedException("email not activated");
        }
        return UserPrincipal.create(user);
    }

    @Override
    public boolean registerUser(User user) {
        User userFromDb = userRepository.findByEmail(user.getEmail());

        if (userFromDb != null) {
            return false;
        }
        
        user.setActive(false);
        user.setRoles(Collections.singleton(Role.ADMIN));
        user.setProvider(AuthProvider.LOCAL);
        user.setActivationCode(UUID.randomUUID().toString());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        String subject = "Activation code";
        List<String> emailMessages = new ArrayList<>();
        emailMessages.add("Welcome to NDMix!");
        emailMessages.add("Please click the following link to activate your account: ");
        sendMessage(user, emailMessages, subject, user.getActivationCode(), "activate");
        return true;
    }

    @Override
    public void registerOauthUser(String email, String username, String address, String phonenumber) {
        User user = new User();
        user.setEmail(email);
        user.setName(username);
        user.setPhonenumber(phonenumber);
        user.setAddress(address);
        user.setActive(true);
        user.setRoles(Collections.singleton(Role.USER));
        user.setProvider(AuthProvider.GOOGLE);
        userRepository.save(user);
    }

    @Override
    public void updateOauthUser(User user, String username) {
        user.setName(username);
        user.setProvider(AuthProvider.LOCAL);
        userRepository.save(user);
    }

    @Override
    public boolean sendPasswordResetCode(String email) {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            return false;
        }
        user.setPasswordResetCode(UUID.randomUUID().toString());
        userRepository.save(user);

        String subject = "NDMix Password reset";
        List<String> emailMessages = new ArrayList<>();
        emailMessages.add("You have requested to change your password.");
        emailMessages.add("To reset your password, click the following link: ");
        sendMessage(user, emailMessages, subject, user.getPasswordResetCode(), "reset");
        return true;
    }

    @SuppressWarnings("deprecation")
	public void sendMessage(User user, List<String> emailMessages, String subject, String code, String urlPart) {
        if (!StringUtils.isEmpty(user.getEmail())) {
 
        	//String hostname = ("activate").equals(urlPart) ? hostname_spring : hostname_react;
 
        	code = "?token=" + code;
        	
            String message = String.format("Hello, %s! \n" + "%s \n" + "%s http://%s/%s/%s",
                    user.getName(),
                    emailMessages.get(0),
                    emailMessages.get(1),
                    hostname_react,
                    urlPart,
                    code
            );
            mailSender.send(user.getEmail(), subject, message);
        }
    }

    @Override
    public void passwordReset(String email, String password) {
        User user = userRepository.findByEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setPasswordResetCode(null);
        userRepository.save(user);
    }

    @Override
    public boolean activateUser(String code) {
        User user = userRepository.findByActivationCode(code);

        if (user == null) {
            return false;
        }
        user.setActivationCode(null);
        user.setActive(true);
        userRepository.save(user);
        return true;
    }

    @Override
    public void userSave(String username, Map<String, String> form, User user) {
        user.setName(username);
        Set<String> roles = Arrays.stream(Role.values())
                .map(Role::name)
                .collect(Collectors.toSet());

        user.getRoles().clear();

        for (String key : form.keySet()) {
            if (roles.contains(key)) {
                user.getRoles().add(Role.valueOf(key));
            }
        }
        userRepository.save(user);
    }

    @Override
    public void updateProfile(String email, String username) {
        User user = userRepository.findByEmail(email);
        user.setName(username);
        userRepository.save(user);
    }

	@Override
	public User findOne(String id) {
		// TODO Auto-generated method stub
		return null;
	}
}
