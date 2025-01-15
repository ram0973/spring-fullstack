package ra.web.page.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import ra.web.page.auth.dto.LoginRequest;
import ra.web.page.auth.dto.SignupRequest;
import ra.web.page.users.User;
import ra.web.page.users.UserMapper;
import ra.web.page.users.UserService;
import ra.web.page.users.dto.UserResponse;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;
    private final UserMapper userMapper;

    @PostMapping(path = "/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public User signup(@Valid @RequestBody SignupRequest dto) {
        User user = this.authService.signup(dto);
        log.info("User with email: {} has successfully created", dto.email());
        return user;
    }

    @PostMapping("/login")
    public UserResponse login(
        @Valid @RequestBody LoginRequest dto, HttpServletRequest request, HttpServletResponse response) {
        UserResponse userResponse = authService.login(dto, request, response);
        log.info("User with email: {} has successfully authenticated", dto.email());
        return userResponse;
    }

    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void logout(
        Authentication authentication, HttpServletRequest request, HttpServletResponse response) {
        if (authentication != null) {
            authService.logout(authentication, request, response);
            log.info("Successful logout of user: {}", authentication.getName());
        } else {
            log.info("Cannot logout, not authenticated");
        }
    }

    @GetMapping("/me")
    public UserResponse me(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        } else  {
            User user = userService.findUserByEmailIgnoreCase(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException(
                    "User not found with email: " + authentication.getName()));
            log.info("Url: /me user email: {}", user.getEmail());
            UserResponse userResponse = userMapper.map(user);
            return userResponse;
        }
    }
}
