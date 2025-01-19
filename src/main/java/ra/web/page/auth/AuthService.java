package ra.web.page.auth;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.NonNull;
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
import org.springframework.transaction.annotation.Transactional;
import ra.web.common.exceptions.EntityAlreadyExistsException;
import ra.web.common.exceptions.NoSuchEntityException;
import ra.web.page.auth.dto.LoginRequest;
import ra.web.page.auth.dto.SignupRequest;
import ra.web.page.roles.UserRole;
import ra.web.page.roles.UserRoleRepository;
import ra.web.page.users.User;
import ra.web.page.users.UserMapper;
import ra.web.page.users.UserRepository;
import ra.web.page.users.dto.UserResponse;

import java.util.Locale;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log4j2
public class AuthService {
    private final SecurityContextRepository securityContextRepository;
    private final AuthenticationManager authManager;
    private final SecurityContextHolderStrategy securityContextHolderStrategy =
        SecurityContextHolder.getContextHolderStrategy();
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();
    private final AuthMapper authMapper;
    private final UserMapper userMapper;

    private static final int COOKIE_PERIOD_PERMANENT = 180 * 24 * 60 * 60; // пол года в секундах

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${server.servlet.session.timeout}")
    private int defaultSessionTimeout;

    @Transactional
    public User signup(@NonNull SignupRequest dto) {
        String email = dto.email().strip().toLowerCase(Locale.ROOT);
        Optional<User> userExisted = userRepository.findByEmailIgnoreCase(email);
        if (userExisted.isPresent()) {
            throw new EntityAlreadyExistsException("User already exist with such email: " + email);
        }
        User user = authMapper.map(dto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        UserRole userRole;
        if (dto.email().equals(adminEmail)) {
            userRole = userRoleRepository
                .findByRole(User.Role.ADMIN)
                .orElseThrow(() -> new NoSuchEntityException("Admin role not exists"));
        } else {
            userRole = userRoleRepository
                .findByRole(User.Role.USER)
                .orElseThrow(() -> new NoSuchEntityException("User role not exists"));
        }
        user.addRole(userRole);
        //TODO: refactor to activate user
        user.setEnabled(true);
        userRepository.save(user);
        return user;
    }

    public UserResponse login(LoginRequest dto, HttpServletRequest request, HttpServletResponse response) {
        UsernamePasswordAuthenticationToken token = UsernamePasswordAuthenticationToken.unauthenticated(
            dto.email().strip(), dto.password());
        Authentication authentication = this.authManager.authenticate(token);
        if (!authentication.isAuthenticated()) {
            throw new BadCredentialsException("Invalid username or password");
        }
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);
        this.securityContextHolderStrategy.setContext(context);
        this.securityContextRepository.saveContext(context, request, response);

        log.info(dto.rememberMe());

        // Устанавливаем срок действия сессии
        HttpSession session = request.getSession(true);
        if (dto.rememberMe() != null && dto.rememberMe()) {
            // Если выбрано "Запомнить меня", устанавливаем срок действия на год
            session.setMaxInactiveInterval(COOKIE_PERIOD_PERMANENT); // 1 год в секундах
        } else {
            session.setMaxInactiveInterval(defaultSessionTimeout);
        }

        session.setAttribute("IPAddress", request.getRemoteAddr());
        session.setAttribute("UserAgent", request.getHeader("User-Agent"));

        // Настраиваем куку JSESSIONID
        Cookie cookie = new Cookie("JSESSIONID", session.getId());
        cookie.setPath("/"); // Путь куки
        cookie.setHttpOnly(true); // Защита от XSS
        cookie.setSecure(request.isSecure()); // Только для HTTPS (если используется)

        // Устанавливаем срок действия куки
        if (dto.rememberMe() != null && dto.rememberMe()) {
            cookie.setMaxAge(COOKIE_PERIOD_PERMANENT); // 1 год в секундах
        } else {
            cookie.setMaxAge(-1); // Кука будет удалена при закрытии браузера
        }

        // Добавляем куку в ответ
        response.addCookie(cookie);

        String email = authentication.getName();
        User user = userRepository.findByEmailIgnoreCase(email)
            .orElseThrow(() -> new NoSuchEntityException("User does not exist"));
        UserResponse userResponse = userMapper.map(user);
        return userResponse;
    }

    public void logout(Authentication authentication, HttpServletRequest request, HttpServletResponse response) {
        this.logoutHandler.setClearAuthentication(true);
        this.logoutHandler.setInvalidateHttpSession(true);
        this.logoutHandler.setSecurityContextHolderStrategy(securityContextHolderStrategy);
        this.logoutHandler.setSecurityContextRepository(securityContextRepository);
        this.logoutHandler.logout(request, response, authentication);

        HttpSession session = request.getSession(true);
        Cookie cookie = new Cookie("JSESSIONID", session.getId());
        cookie.setPath("/"); // Путь куки
        cookie.setHttpOnly(true); // Защита от XSS
        cookie.setSecure(request.isSecure()); // Только для HTTPS (если используется)
        cookie.setMaxAge(0); // удалить вообще
        response.addCookie(cookie);
    }
}
