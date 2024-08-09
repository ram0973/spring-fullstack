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
import java.util.HashSet;
import java.util.Set;

@Configuration
@Log4j2
@RequiredArgsConstructor
public class DataInitializer {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;

    //@Bean
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
                .enabled(true)
                .roles(new HashSet<>())
                .build();
            userRepository.save(admin);

            log.info("Preloading userRoles");

            var adminRole = UserRole.builder()
                .role(User.Role.ADMIN)
                .createdBy(1)
                .lastModifiedBy(1)
                .createdDate(LocalDateTime.now())
                .build();
            userRoleRepository.save(adminRole);

            var moderatorRole = UserRole.builder()
                .role(User.Role.MODERATOR)
                .createdBy(1)
                .lastModifiedBy(1)
                .createdDate(LocalDateTime.now())
                .build();
            userRoleRepository.save(moderatorRole);

            var userRole = UserRole.builder()
                .role(User.Role.USER)
                .createdBy(1)
                .lastModifiedBy(1)
                .createdDate(LocalDateTime.now())
                .build();
            userRoleRepository.save(userRole);

            log.info("Set admin roles");

            admin = userRepository.findById(1).orElseThrow();
            admin.getRoles().add(adminRole);
            admin.getRoles().add(moderatorRole);
            admin.getRoles().add(userRole);
            userRepository.save(admin);

            log.info("Roles and admin complete");
        };
    }
}
