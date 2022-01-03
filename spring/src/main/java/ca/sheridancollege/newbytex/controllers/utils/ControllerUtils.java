package ca.sheridancollege.newbytex.controllers.utils;

import org.springframework.util.StringUtils;

public class ControllerUtils {
	
	public static boolean isPasswordConfirmEmpty(String password2) {
        return StringUtils.isEmpty(password2);
    }

    public static boolean isPasswordDifferent(String password, String password2) {
        return password != null && !password.equals(password2);
    }

}
