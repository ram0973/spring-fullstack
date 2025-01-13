package ra.web.page.posts;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import ra.web.common.exceptions.EntityAlreadyExistsException;
import ra.web.common.exceptions.NoSuchEntityException;
import ra.web.page.posts.dto.PagedPostsResponse;
import ra.web.page.posts.dto.PostCreateRequest;
import ra.web.page.posts.dto.PostUpdateRequest;

import java.io.IOException;
import java.security.Principal;
import java.util.Collections;
import java.util.Optional;

@SuppressWarnings("UnnecessaryLocalVariable")
@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
@Log4j2
public class PostController {
    private final PostService postService;

    @GetMapping("")
    //@PreAuthorize("hasRole('ADMIN')") // TODO: add front page methods and dto?
    public PagedPostsResponse getPosts(
        @RequestParam(required = false) String title, // TODO: search by title
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "id,desc") String[] sort
    ) {
        // TODO: check if really need Optional here
        PagedPostsResponse pagedPostsResponse = postService.findAllPaged(page, size, sort).orElse(
            new PagedPostsResponse(Collections.emptyList(), 0, 0, 0)
        );
        return pagedPostsResponse;
    }

    @GetMapping("/{id}")
    //@PreAuthorize("hasRole('ADMIN')")
    public Post getPostById(@PathVariable("id") int id) {
        Post post = postService.findById(id).orElseThrow(
            () -> new NoSuchEntityException("No such post with id: " + id));
        return post;
    }

    // this is for admin
    //@PostMapping(path = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PostMapping(path = "")
    //@PreAuthorize("hasRole('ADMIN')")
    //public Post createPost(@Valid @ModelAttribute PostCreateRequest dto, Principal principal
    @ResponseStatus(HttpStatus.CREATED)
    public Post createPost(@Valid @RequestBody PostCreateRequest dto, Principal principal) throws IOException {
        if (dto.slug() == null) {
            throw new IllegalArgumentException("Slug cannot be null");
        }
        Optional<Post> existingPost = postService.findPostBySlug(dto.slug().strip());
        if (existingPost.isPresent()) {
            throw new EntityAlreadyExistsException("Post with such slug already exists");
        } else {
            // check exceptions?debug
            Post post = postService.createPost(dto, principal);
            return post;
        }
    }

    //@PatchMapping(path = "{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PatchMapping(path = "{id}")
    //@PreAuthorize("hasRole('ADMIN')")
    public Post updatePost(
        @PathVariable("id") int id, @Valid @RequestBody PostUpdateRequest dto) throws IOException {
        //@PathVariable("id") int id, @Valid @ModelAttribute PostUpdateRequest dto) throws IOException {
        Post post = postService.updatePost(id, dto);
        return post;
    }

    @DeleteMapping("/{id}")
    //@PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePost(@PathVariable("id") int id) {
        postService.deletePost(id);
    }
}
