package dev.pages.users.dto;

import dev.pages.users.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Set;

public record UserCreateRequest(
    boolean isEnabled,
    @NotBlank @Email String email,

    @NotBlank
    @Size(min = 8, message = "Password must have 8 symbols or more")
    @Size(max = 64, message = "Password length larger than 64 symbols")
    String password,
    Set<User.Role> roles
) {
}
