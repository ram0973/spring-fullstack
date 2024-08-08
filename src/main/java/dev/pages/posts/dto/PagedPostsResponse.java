package dev.pages.posts.dto;

import dev.pages.posts.Post;

import java.util.List;

public record PagedPostsResponse(List<Post> post, int currentPage, long totalItems, int totalPages) {
}
