package dev.pages.users;

import dev.common.exception.Exceptions;
import dev.pages.users.dto.PagedUsersResponse;
import dev.pages.users.dto.UserCreateRequest;
import dev.pages.users.dto.UserUpdateRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Log4j2
public class UserController {
    private final UserService userService;

    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PagedUsersResponse> getUsers(
        @RequestParam(required = false) String title,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "id,desc") String[] sort
    ) {
        // TODO: check if really need Optional here
        PagedUsersResponse pagedUsersResponse = userService.findAll(page, size, sort).orElse(
            new PagedUsersResponse(Collections.emptyList(), 0, 0, 0)
        );
        return ResponseEntity.ok(pagedUsersResponse);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> getUserById(@PathVariable("id") int id) {
        User user = userService.findById(id).orElseThrow(
            () -> new Exceptions.NoSuchEntityException("No such user with id: " + id));
        return ResponseEntity.ok(user);
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> createUser(@Valid @RequestBody UserCreateRequest dto) {
        Optional<User> optionalUser = userService.findUserByEmailIgnoreCase(dto.email());
        if (optionalUser.isPresent()) {
            throw new Exceptions.EntityAlreadyExistsException("Email already in use");
        } else {
            // check exceptions?
            User user = userService.createUser(dto);
            return ResponseEntity.ok(user);
        }
    }

    @PutMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> updateUser(
        @PathVariable("id") int id, @Valid @RequestBody UserUpdateRequest dto) {
        User user = userService.updateUser(id, dto);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteUser(@PathVariable("id") int id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("Successfully deleted user with id: " + id);
    }
}
