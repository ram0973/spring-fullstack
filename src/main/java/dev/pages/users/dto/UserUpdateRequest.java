package dev.pages.users.dto;

import dev.pages.users.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.util.Set;

public record UserUpdateRequest(
    boolean isEnabled,
    @NotBlank @Email String email,
    Set<User.Role> roles
) {
}
