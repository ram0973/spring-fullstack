package ra.web.page.users;

import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;
import ra.web.common.exceptions.NoSuchEntityException;
import ra.web.common.mappers.JsonNullableMapper;
import ra.web.common.mappers.ReferenceMapper;
import ra.web.page.roles.UserRole;
import ra.web.page.roles.UserRoleRepository;
import ra.web.page.users.dto.UserCreateRequest;
import ra.web.page.users.dto.UserResponse;
import ra.web.page.users.dto.UserUpdateRequest;

import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Mapper(
    uses = {JsonNullableMapper.class, ReferenceMapper.class},
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
    componentModel = MappingConstants.ComponentModel.SPRING,
    unmappedTargetPolicy = ReportingPolicy.IGNORE
)
@RequiredArgsConstructor
@NoArgsConstructor(force = true)
public abstract class UserMapper {
    private final UserRoleRepository userRoleRepository;

    //@Mapping(target = "avatar", ignore = true)
    @Mapping(target = "roles", ignore = true, qualifiedByName = "mapRolesStringsToEntities")
    public abstract User map(UserCreateRequest dto);

    public abstract UserResponse map(User user);

    //@Mapping(target = "avatar", ignore = true)
    @Mapping(target = "roles", ignore = true, qualifiedByName = "mapRolesStringsToEntities")
    public abstract void update(@MappingTarget User user, UserUpdateRequest dto);

    @Named("mapRolesStringsToEntities")
    public Set<UserRole> map(List<User.Role> roles) {
        Set<UserRole> result = new HashSet<>();
        for (User.Role role : roles) {
            UserRole userRole =
                userRoleRepository.findByRole(role).orElseThrow(() -> new NoSuchEntityException(role.name()));
            result.add(userRole);
        }
        return result;
    }
}
