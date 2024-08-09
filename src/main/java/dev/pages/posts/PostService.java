package dev.pages.posts;

import dev.common.exceptions.NoSuchEntityException;
import dev.pages.MultiPartFileUtils;
import dev.pages.PagedEntityUtils;
import dev.pages.posts.dto.PagedPostsResponse;
import dev.pages.posts.dto.PostCreateRequest;
import dev.pages.posts.dto.PostUpdateRequest;
import dev.pages.posts_categories.PostCategory;
import dev.pages.posts_categories.PostCategoryService;
import dev.pages.users.*;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final IUserService IUserService;
    private final PostCategoryService postCategoryService;


    public Optional<PagedPostsResponse> findAllPaged(int page, int size, String[] sort) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(PagedEntityUtils.getSortOrders(sort)));
        Page<Post> pagedPosts = postRepository.findAll(pageable);
        List<Post> posts = pagedPosts.getContent();
        if (posts.isEmpty()) {
            return Optional.empty();
        } else {
            // TODO: Maybe add generics?
            PagedPostsResponse PagedPostsResponseDto = new PagedPostsResponse(posts, pagedPosts.getNumber(),
                pagedPosts.getTotalElements(), pagedPosts.getTotalPages());
            return Optional.of(PagedPostsResponseDto);
        }
    }

    public Optional<Post> findById(int id) {
        return postRepository.findById(id);
    }

    public Optional<Post> findPostBySlug(String slug) {
        return postRepository.findBySlug(slug);
    }

    @Transactional
    public Post createPost(@NotNull PostCreateRequest dto, Principal principal) throws IOException {
        Post post = PostMapper.INSTANCE.postFromPostRequest(dto);
        PostCategory postCategory = postCategoryService.findById(dto.category()).orElseThrow(
            () -> new NoSuchEntityException("No such post category with id: " + dto.category()));
        post.setCategory(postCategory);
        if (dto.image() != null && dto.image().getOriginalFilename() != null) {
            String newImagePath = MultiPartFileUtils.saveMultiPartImage(dto.image());
            post.setImage(newImagePath);
        }
        // TODO: check this for anonymous, log error, etc
        Optional<User> optionalUser = IUserService.findUserByEmailIgnoreCase(principal.getName());
        User user = optionalUser.orElseThrow(
            () -> new NoSuchEntityException("No such principal: " + principal.getName())
        );
        post.setUser(user);
        // TODO: check if tags mapped, if not, add implementation
        return postRepository.save(post);
    }

    @Transactional
    public Post updatePost(int id, @NotNull PostUpdateRequest dto) throws IOException {
        Post post = postRepository.findById(id).orElseThrow(
            () -> new NoSuchEntityException("No such Post with id: " + id));
        PostMapper.INSTANCE.update(post, dto);
        if (dto.image() != null && dto.image().getOriginalFilename() != null) {
            String newImagePath = MultiPartFileUtils.saveMultiPartImage(dto.image());
            post.setImage(newImagePath);
        }
        // TODO: check if tags mapped, if not, add implementation
        return postRepository.save(post);
    }

    public void deletePost(int id) {
        postRepository.findById(id).orElseThrow(() -> new NoSuchEntityException("No such post with id: " + id));
        postRepository.deleteById(id);
    }
}
