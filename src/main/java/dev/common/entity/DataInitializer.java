package dev.common.entity;

import dev.pages.roles.UserRole;
import dev.pages.roles.UserRoleRepository;
import dev.pages.users.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import dev.pages.users.User;

import java.time.LocalDateTime;
import java.util.Set;

@Configuration
@Log4j2
@RequiredArgsConstructor
public class DataInitializer {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;

    @Bean
    CommandLineRunner initDatabase() {
        return args -> {
            log.info("Preloading Admin User");
            User admin = User.builder()
                .email("gendalf@white.com")
                .password(passwordEncoder.encode("password"))
                .createdBy(1)
                .lastModifiedBy(1)
                .createdDate(LocalDateTime.now())
                .lastModifiedDate(LocalDateTime.now())
                .isEnabled(true)
                .build();
            userRepository.save(admin);

            log.info("Preloading userRoles");
            var adminRole = new UserRole(User.Role.ROLE_ADMIN, Set.of(admin));
            adminRole.setCreatedBy(1);
            adminRole.setLastModifiedBy(1);
            adminRole.setCreatedDate(LocalDateTime.now());
            userRoleRepository.save(adminRole);

            var moderatorRole = new UserRole(User.Role.ROLE_MODERATOR, Set.of(admin));
            moderatorRole.setCreatedBy(1);
            moderatorRole.setLastModifiedBy(1);
            moderatorRole.setCreatedDate(LocalDateTime.now());
            userRoleRepository.save(moderatorRole);

            var userRole = new UserRole(User.Role.ROLE_USER, Set.of(admin));
            userRole.setCreatedBy(1);
            userRole.setLastModifiedBy(1);
            userRole.setCreatedDate(LocalDateTime.now());
            userRoleRepository.save(userRole);

            log.info("Set admin roles");

            admin = userRepository.findById(1).orElseThrow();
            admin.addRole(adminRole);
            admin.addRole(moderatorRole);
            admin.addRole(userRole);
            userRepository.save(admin);

            log.info("Roles and admin complete");
        };
    }
}
