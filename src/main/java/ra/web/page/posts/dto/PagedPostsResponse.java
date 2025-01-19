package ra.web.page.posts.dto;

import ra.web.page.posts.Post;

import java.util.List;

public record PagedPostsResponse(List<Post> posts, int currentPage, long totalItems, int totalPages) {
}
