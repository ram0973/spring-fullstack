package dev.pages.roles;

import dev.common.exception.Exceptions;
import dev.pages.roles.dto.UserRoleCreateRequest;
import dev.pages.roles.dto.UserRoleUpdateRequest;
import dev.pages.users.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/roles")
@RequiredArgsConstructor
@Log4j2
public class UserRoleController {
    private final UserRoleService userRoleService;

    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserRole>> getUserRoles() {
        List<UserRole> userRoles = userRoleService.findAll();
        return ResponseEntity.ok(userRoles);
    }

    @GetMapping("/{role}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserRole> getUserRoleByRole(@PathVariable("role") User.Role role) {
        UserRole userRole = userRoleService.findUserRole(role).orElseThrow(
            () -> new Exceptions.EntityAlreadyExistsException("No such user role with name: " + role));
        return ResponseEntity.ok(userRole);
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserRole> createUserRole(@Valid @RequestBody UserRoleCreateRequest dto) {
        Optional<UserRole> optionalUserRole = userRoleService.findUserRole(dto.role());
        if (optionalUserRole.isPresent()) {
            throw new Exceptions.EntityAlreadyExistsException("This user role already exists");
        } else {
            // check exceptions?
            UserRole userRole = userRoleService.createUserRole(dto);
            return ResponseEntity.ok(userRole);
        }
    }

    @PutMapping("/{role}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserRole> updateUserRole(
        @PathVariable("role") User.Role role, @Valid @RequestBody UserRoleUpdateRequest dto) {
        UserRole userRole = userRoleService.updateUserRole(role, dto);
        return ResponseEntity.ok(userRole);
    }

    @DeleteMapping("/{role}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteUserRole(@PathVariable("role") User.Role roleEnum) {
        userRoleService.deleteUserRole(roleEnum);
        return ResponseEntity.ok("Successfully deleted user role with id: " + roleEnum);
    }
}
