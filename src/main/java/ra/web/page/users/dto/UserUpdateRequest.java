package ra.web.page.users.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    //@JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
    List<User.Role> roles
) {
}
