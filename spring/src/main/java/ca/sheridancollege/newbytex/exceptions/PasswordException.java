package ca.sheridancollege.newbytex.exceptions;

import lombok.Getter;

@Getter
public class PasswordException extends RuntimeException {
    private final String passwordErrorMsg;

    public PasswordException(String passwordErrorMsg) {
        this.passwordErrorMsg = passwordErrorMsg;
    }
}
