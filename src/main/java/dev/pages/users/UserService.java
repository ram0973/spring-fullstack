package dev.pages.users;

import dev.common.exception.Exceptions;
import dev.pages.roles.UserRole;
import dev.pages.roles.UserRoleRepository;
import dev.pages.PagedEntityUtils;
import dev.pages.users.dto.PagedUsersResponse;
import dev.pages.users.dto.UserCreateRequest;
import dev.pages.users.dto.UserUpdateRequest;

import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRoleRepository userRoleRepository;

    @Value("${app.admin.email}")
    private String adminEmail;

    public Optional<PagedUsersResponse> findAll(int page, int size, String[] sort) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(PagedEntityUtils.getSortOrders(sort)));
        Page<User> pagedUsers = userRepository.findAll(pageable);
        List<User> Users = pagedUsers.getContent();
        if (Users.isEmpty()) {
            return Optional.empty();
        } else {
            PagedUsersResponse PagedUsersResponseDto = new PagedUsersResponse(Users, pagedUsers.getNumber(),
                pagedUsers.getTotalElements(), pagedUsers.getTotalPages());
            return Optional.of(PagedUsersResponseDto);
        }
    }

    public Optional<User> findById(int id) {
        return userRepository.findById(id);
    }

    public Optional<User> findUserByEmailIgnoreCase(String email) {
        return userRepository.findByEmailIgnoreCase(email);
    }

    public User createUser(@NotNull UserCreateRequest dto) {
        User user = UserMapper.INSTANCE.userFromUserRequest(dto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (dto.email().equals(adminEmail)) {
            UserRole adminRole =
                userRoleRepository
                    .findByName(User.Role.ROLE_ADMIN)
                    .orElseThrow(() -> new Exceptions.NoSuchEntityException("Admin Role not exists"));
            user.addRole(adminRole);
        }
        return userRepository.save(user);
    }

    public User updateUser(int id, @NotNull UserUpdateRequest dto) {
        User user = userRepository.findById(id).orElseThrow(
            () -> new Exceptions.NoSuchEntityException("No such User with id: " + id));
        UserMapper.INSTANCE.update(user, dto);
        return userRepository.save(user);
    }

    public void deleteUser(int id) {
        User user = findById(id).orElseThrow(
            () -> new Exceptions.NoSuchEntityException("No such User with id: " + id));
        if (user.getEmail().equals(adminEmail)) {
            throw new Exceptions.ForbiddenOperationException("You cannot delete admin account");
        }
        userRepository.deleteById(id);
    }
}
