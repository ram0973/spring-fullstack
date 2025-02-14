package ra.web.page.users.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import ra.web.page.roles.UserRole;
import ra.web.page.users.RolesArraySerializer;

import java.util.List;

public record UserResponse(
    Integer id,
    String avatar,
    String email,
    boolean enabled,
    String firstName,
    String lastName,
    @JsonSerialize(using = RolesArraySerializer.class)
    List<UserRole> roles) {
}
