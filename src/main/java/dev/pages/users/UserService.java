package dev.pages.users;

import dev.common.exceptions.ForbiddenOperationException;
import dev.common.exceptions.NoSuchEntityException;
import dev.pages.PagedEntityUtils;
import dev.pages.roles.UserRole;
import dev.pages.roles.UserRoleRepository;
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
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
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

    @Transactional
    public User createUser(@NotNull UserCreateRequest dto) {
        User user = UserMapper.INSTANCE.userFromUserRequest(dto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        List<UserRole> roles = userRoleRepository.findAll();
        for (UserRole userRole : roles) {
            if (dto.roles().contains(userRole.getRole())) {
                userRole.getUsers().add(user);
                user.addRole(userRole);
            }
        }
        return userRepository.save(user);
    }

    @Transactional
    public User updateUser(int id, @NotNull UserUpdateRequest dto) {
        User user = userRepository.findById(id).orElseThrow(
            () -> new NoSuchEntityException("No such User with id: " + id));
        UserMapper.INSTANCE.update(user, dto);
        user.setRoles(new HashSet<>());
        List<UserRole> roles = userRoleRepository.findAll();
        for (UserRole userRole : roles) {
            if (dto.roles().contains(userRole.getRole())) {
                user.addRole(userRole);
            }
        }
        return userRepository.save(user);
    }

    public void deleteUser(int id) {
        User user = findById(id).orElseThrow(
            () -> new NoSuchEntityException("No such User with id: " + id));
        if (user.getEmail().equals(adminEmail)) {
            throw new ForbiddenOperationException("You cannot delete admin account");
        }
        userRepository.deleteById(id);
    }
}
