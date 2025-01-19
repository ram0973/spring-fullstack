package ra.web.page.posts.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record PostCreateRequest(
    @NotBlank String title,
    @NotBlank @NotNull String slug,
    String excerpt,
    @NotBlank String content,
    String image,
    Boolean enabled
) {
}
