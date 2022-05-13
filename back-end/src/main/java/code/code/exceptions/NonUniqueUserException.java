package code.code.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.server.ResponseStatusException;

public class NonUniqueUserException extends ResponseStatusException {
    public NonUniqueUserException() {
        super(HttpStatus.BAD_REQUEST,"User is not unique");
    }
}
