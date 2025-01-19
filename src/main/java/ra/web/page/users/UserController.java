package ra.web.page.users;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import ra.web.common.exceptions.NoSuchEntityException;
import ra.web.page.users.dto.UserCreateRequest;
import ra.web.page.users.dto.UserUpdateRequest;
import ra.web.page.users.dto.UsersResponse;

import java.io.IOException;

@SuppressWarnings("UnnecessaryLocalVariable")
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Log4j2
public class UserController {
    @NonNull
    private final UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')") // TODO: check everywhere for opportunity to use User.Role.ADMIN
    public UsersResponse getUsers(
        @RequestParam(required = false) String email,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "id,desc") String[] sort,
        HttpServletResponse response
    ) {
        UsersResponse responseBody = userService.findAllPaged(page, size, sort);
        response.addHeader("X-Total-Count", String.valueOf(responseBody.users().size()));
        return responseBody;
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public User getUserById(@PathVariable("id") int id) {
        User user = userService.findById(id).orElseThrow(
            () -> new NoSuchEntityException("No such user with id: " + id));
        return user;
    }

    // this is for admins
    //@PostMapping(path = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    // with @RequestParam instead of @ModelAttribute we get Content type not supported!
    // public User createUser(@Valid @ModelAttribute UserCreateRequest dto) throws IOException {
    public User createUser(@Valid @RequestBody UserCreateRequest dto) throws IOException {
        User user = userService.createUser(dto);
        return user;
    }

    //@PatchMapping(path = "{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PatchMapping(path = "{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public User updateUser(
        @PathVariable("id") int id, @Valid @RequestBody UserUpdateRequest dto) throws IOException {
        //@PathVariable("id") int id, @Valid @ModelAttribute UserUpdateRequest dto) throws IOException {
        User user = userService.updateUser(id, dto);
        return user;
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable("id") int id) {
        userService.deleteUser(id);
    }
}
