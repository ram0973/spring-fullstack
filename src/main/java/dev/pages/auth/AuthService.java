package dev.pages.auth;

import dev.common.exception.Exceptions;
import dev.pages.auth.dto.LoginRequest;
import dev.pages.auth.dto.RegisterRequest;
import dev.pages.roles.UserRole;
import dev.pages.roles.UserRoleRepository;
import dev.pages.users.User;
import dev.pages.users.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final SecurityContextRepository securityContextRepository;
    private final AuthenticationManager authManager;
    private final SecurityContextHolderStrategy securityContextHolderStrategy = SecurityContextHolder.getContextHolderStrategy();
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();


    @Value("${app.admin.email}")
    private String adminEmail;

    public User register(RegisterRequest dto) {
        String email = dto.email().trim();
        Optional<User> userExists = userRepository.findByEmailIgnoreCase(email);
        if (userExists.isPresent()) {
            throw new Exceptions.EntityAlreadyExistsException("User already exist with such email: " + email);
        }
        User user = AuthMapper.INSTANCE.userFromRegisterRequest(dto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (dto.email().equals(adminEmail)) {
            UserRole userRole =
                userRoleRepository
                    .findByName(User.Role.ROLE_USER)
                    .orElseThrow(() -> new Exceptions.NoSuchEntityException("User role not exists"));
            user.addRole(userRole);
        }
        userRepository.save(user);
        return user;
    }

    public Authentication login(LoginRequest dto, HttpServletRequest request, HttpServletResponse response) {
        UsernamePasswordAuthenticationToken token = UsernamePasswordAuthenticationToken.unauthenticated(
            dto.email().trim(), dto.password());
        Authentication authentication = this.authManager.authenticate(token);
        if (!authentication.isAuthenticated()) {
            throw new BadCredentialsException("Invalid username or password");
        }
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);
        this.securityContextHolderStrategy.setContext(context);
        this.securityContextRepository.saveContext(context, request, response);
        return authentication;
    }

    public void logout(Authentication authentication, HttpServletRequest request, HttpServletResponse response) {
        this.logoutHandler.setClearAuthentication(true);
        this.logoutHandler.setInvalidateHttpSession(true);
        this.logoutHandler.setSecurityContextHolderStrategy(securityContextHolderStrategy);
        this.logoutHandler.setSecurityContextRepository(securityContextRepository);
        this.logoutHandler.logout(request, response, authentication);
    }
}
