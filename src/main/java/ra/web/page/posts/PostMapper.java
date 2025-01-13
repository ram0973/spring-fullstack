package ra.web.page.posts;


import lombok.NoArgsConstructor;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;
import ra.web.page.posts.dto.PostCreateRequest;
import ra.web.page.posts.dto.PostUpdateRequest;

@NoArgsConstructor(force = true)
@Mapper(
    //uses = {JsonNullableMapper.class, ReferenceMapper.class},
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
    componentModel = MappingConstants.ComponentModel.SPRING,
    unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public abstract class PostMapper {
    public abstract Post map(PostCreateRequest dto);

    public abstract void update(@MappingTarget Post post, PostUpdateRequest dto);
}
