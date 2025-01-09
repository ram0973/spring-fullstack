package ra.web.page.auth;

import org.mapstruct.*;
import ra.web.common.mappers.JsonNullableMapper;
import ra.web.common.mappers.ReferenceMapper;
import ra.web.page.auth.dto.SignupRequest;
import ra.web.page.users.User;

@Mapper(
    uses = {JsonNullableMapper.class, ReferenceMapper.class},
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
    componentModel = MappingConstants.ComponentModel.SPRING,
    unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public abstract class AuthMapper {
    public abstract User map(SignupRequest dto);
}
