package ra.web.page.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

// this is for user self registration, not for registration by admin
@Builder
public record SignupRequest(
    @NotNull @NotBlank(message = "Email cannot be empty") @Email String email,
    @NotNull @NotBlank(message = "Password cannot be empty") String password) {
}
