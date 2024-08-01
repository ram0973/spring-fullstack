package dev.pages.roles;

import dev.common.exception.Exceptions;
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

    public Optional<UserRole> findById(int id) {
        return userRoleRepository.findById(id);
    }

    public Optional<UserRole> findUserByRole(User.Role roleEnum) {
        return userRoleRepository.findByName(User.Role.valueOf(roleEnum.name()));
    }

    public UserRole createUserRole(@NotNull UserRoleCreateRequest dto) {
        UserRole userRole = UserRoleMapper.INSTANCE.userRoleFromUserRoleRequest(dto);
        return userRoleRepository.save(userRole);
    }

    public UserRole updateUserRole(int id, @NotNull UserRoleUpdateRequest dto) {
        UserRole userRole = userRoleRepository.findById(id).orElseThrow(
            () -> new Exceptions.NoSuchEntityException("No such User Role with id: " + id));
        UserRoleMapper.INSTANCE.update(userRole, dto);
        return userRoleRepository.save(userRole);
    }

    public void deleteUserRole(int id) {
        findById(id).orElseThrow(() -> new Exceptions.NoSuchEntityException("No such User Role with id: " + id));
        userRoleRepository.deleteById(id);
    }
}
