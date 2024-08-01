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

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserRole> getUserRoleById(@PathVariable("id") int id) {
        UserRole userRole = userRoleService.findById(id).orElseThrow(
            () -> new Exceptions.NoSuchEntityException("No such user role with id: " + id));
        return ResponseEntity.ok(userRole);
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserRole> createUserRole(@Valid @RequestBody UserRoleCreateRequest dto) {
        Optional<UserRole> optionalUserRole = userRoleService.findUserByRole(User.Role.valueOf(dto.name()));
        if (optionalUserRole.isPresent()) {
            throw new Exceptions.EntityAlreadyExistsException("This User Role already exists");
        } else {
            // check exceptions?
            UserRole userRole = userRoleService.createUserRole(dto);
            return ResponseEntity.ok(userRole);
        }
    }

    @PutMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserRole> updateUserRole(
        @PathVariable("id") int id, @Valid @RequestBody UserRoleUpdateRequest dto) {
        UserRole userRole = userRoleService.updateUserRole(id, dto);
        return ResponseEntity.ok(userRole);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteUserRole(@PathVariable("id") int id) {
        userRoleService.deleteUserRole(id);
        return ResponseEntity.ok("Successfully deleted user role with id: " + id);
    }
}
