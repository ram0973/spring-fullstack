package ra.web.page.users.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import org.springframework.web.multipart.MultipartFile;
import ra.web.page.users.User;

import java.util.List;

@Builder
public record UserUpdateRequest(
    //MultipartFile avatar,
    String avatar,
    @NotBlank @Email String email,
    boolean enabled,
    String firstName,
    String lastName,
    String password,
    List<User.Role> roles
) {
}
