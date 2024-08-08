package dev.pages.posts_tags.dto;

import dev.pages.posts_tags.PostTag;

import java.util.List;

public record PagedPostsTagsResponse(List<PostTag> tags, int currentPage, long totalItems, int totalPages) {
}
