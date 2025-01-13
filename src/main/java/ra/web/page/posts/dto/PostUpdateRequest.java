package ra.web.page.posts.dto;

import jakarta.validation.constraints.NotBlank;

public record PostUpdateRequest(
    @NotBlank String title,
    @NotBlank String slug,
    String excerpt,
    @NotBlank String content,
    String image,
    Boolean enabled
) {
}
