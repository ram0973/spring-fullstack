package dev.pages.roles;

import dev.common.exceptions.NoSuchEntityException;
import dev.pages.roles.dto.UserRoleCreateRequest;
import dev.pages.roles.dto.UserRoleUpdateRequest;
import dev.pages.users.User;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserRoleService {
    private final UserRoleRepository userRoleRepository;

    public List<UserRole> findAll() {
        return userRoleRepository.findAll();
    }

    public Optional<UserRole> findUserRole(User.Role roleEnum) {
        return userRoleRepository.findByRole(roleEnum);
    }

    public UserRole createUserRole(@NotNull UserRoleCreateRequest dto) {
        UserRole role = UserRoleMapper.INSTANCE.userRoleFromUserRoleRequest(dto);
        if (userRoleRepository.findByRole(role.getRole()).isPresent())
            throw new NoSuchEntityException("This role already exists: " + role);
        return userRoleRepository.save(role);
    }

    public UserRole updateUserRole(User.Role role, @NotNull UserRoleUpdateRequest dto) {
        UserRole userRole = userRoleRepository.findByRole(role).orElseThrow(
            () -> new NoSuchEntityException("No such user role: " + role));
        UserRoleMapper.INSTANCE.update(userRole, dto);
        return userRoleRepository.save(userRole);
    }

    public void deleteUserRole(User.Role roleEnum) {
        UserRole role = userRoleRepository
            .findByRole(roleEnum)
            .orElseThrow(() -> new NoSuchEntityException("No such User Role with role: " + roleEnum));
        userRoleRepository.delete(role);
    }
}
