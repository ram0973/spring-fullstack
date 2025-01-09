package ra.web.page.users.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import ra.web.page.roles.UserRole;
import ra.web.page.users.RolesArraySerializer;
import ra.web.page.users.User;

import java.util.List;
import java.util.Set;

public record UserResponse(
    Integer id,
    String avatar,
    String email,
    boolean enabled,
    String firstName,
    String lastName,
    String password,
    @JsonSerialize(using = RolesArraySerializer.class)
    List<UserRole> roles)
{}
