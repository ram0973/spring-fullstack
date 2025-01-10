package ra.web.page.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import ra.web.page.auth.dto.LoginRequest;
import ra.web.page.auth.dto.SignupRequest;
import ra.web.page.users.User;

import java.security.Principal;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/v1/auth")
public class AuthController {
    @NonNull
    private final AuthService authService;

    @PostMapping(path = "/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public User signup(@Valid @RequestBody SignupRequest dto) {
        User user = this.authService.signup(dto);
        log.info("User with email: {} has successfully created", dto.email());
        return user;
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void login(
        @Valid @RequestBody LoginRequest dto, HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = authService.login(dto, request, response);
        log.info("User with email: {} has successfully login", dto.email());
    }

    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void logout(
        Authentication authentication, HttpServletRequest request, HttpServletResponse response) {
        authService.logout(authentication, request, response);
        if (authentication != null) {
            log.info("Successful logout of user: {}", authentication.getName());
        } else {
            log.info("Cannot logout, not authenticated");
        }
    }

    @GetMapping("/me")
    public ResponseEntity<String> profile(Principal principal) {
        log.info("Url: /me Principal {}", principal);
        if (principal != null) {
            return ResponseEntity.ok(principal.getName());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
