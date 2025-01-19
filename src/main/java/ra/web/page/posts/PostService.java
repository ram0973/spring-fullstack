package ra.web.page.posts;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ra.web.common.exceptions.NoSuchEntityException;
import ra.web.common.util.PagedEntityUtils;
import ra.web.page.posts.dto.PagedPostsResponse;
import ra.web.page.posts.dto.PostCreateRequest;
import ra.web.page.posts.dto.PostUpdateRequest;
import ra.web.page.users.User;
import ra.web.page.users.UserService;

import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log4j2
public class PostService {

    private final PostRepository postRepository;
    private final PostMapper postMapper;
    private final UserService userService;
    private final Environment environment;

    public Optional<PagedPostsResponse> findAllPaged(int page, int size, String[] sort) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(PagedEntityUtils.getSortOrders(sort)));
        Page<Post> pagedPosts = postRepository.findAll(pageable);
        List<Post> posts = pagedPosts.getContent();
        if (posts.isEmpty()) {
            return Optional.empty();
        } else {
            PagedPostsResponse dto = new PagedPostsResponse(posts, pagedPosts.getNumber(),
                pagedPosts.getTotalElements(), pagedPosts.getTotalPages());
            return Optional.of(dto);
        }
    }

    public Optional<Post> findById(int id) {
        return postRepository.findById(id);
    }

    public Optional<Post> findPostBySlug(String slug) {
        return postRepository.findBySlug(slug);
    }

    @Transactional
    public Post createPost(PostCreateRequest dto, Principal principal) throws IOException {
        Post post = postMapper.map(dto);
        System.out.println(principal);
        User user = null;
        // TODO: check this for anonymous, log error, etc
        if (principal == null) {
            log.error("No principal during post creation");
            throw new NoSuchEntityException("No such principal");
//            if (environment.matchesProfiles("dev")) {
//                throw new NoSuchEntityException("No such principal");
//            } else {
//                user = userService.findById(1).orElseThrow(() -> new NoSuchEntityException("No user with id: 1"));
//            }
        } else {
            Optional<User> existingUser = userService.findUserByEmailIgnoreCase(principal.getName());
            user = existingUser
                .orElseThrow(() -> new NoSuchEntityException("No such principal: " + principal.getName()));
        }
        post.setUser(user);
        // TODO: check if tags mapped, if not, add implementation
        return postRepository.save(post);
    }

    @Transactional
    public Post updatePost(int id, PostUpdateRequest dto) throws IOException {
        Post post = postRepository.findById(id).orElseThrow(
            () -> new NoSuchEntityException("No such Post with id: " + id));
        postMapper.update(post, dto);
        return postRepository.save(post);
    }

    public void deletePost(int id) {
        postRepository.findById(id).orElseThrow(() -> new NoSuchEntityException("No such post with id: " + id));
        postRepository.deleteById(id);
    }
}
