package dev.common.entity;

import dev.pages.roles.UserRole;
import dev.pages.roles.UserRoleRepository;
import dev.pages.users.User;
import dev.pages.users.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import net.datafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Configuration
@Log4j2
@RequiredArgsConstructor
public class DataInitializer {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;

    @Bean
    @Transactional
    CommandLineRunner initDatabase() {
        return args -> {
            log.info("Preloading Admin User");
            User admin = User.builder()
                .firstName("Gendalf")
                .lastName("White")
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

            Faker faker = new Faker();

            for (int i = 0; i < 50; i++) {
                User user = User.builder()
                    .firstName(faker.name().firstName())
                    .lastName(faker.name().lastName())
                    .email(faker.internet().emailAddress())
                    .enabled(true)
                    .password(passwordEncoder.encode("password"))
                    .roles(new HashSet<>())
                    .build();
                //userRole = userRoleRepository.findByRole(User.Role.USER).orElseThrow();
                //user.addRole(userRole);
                userRepository.save(user);
            }
        };
    }
}
