package ra.web.page.posts;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.web.context.WebApplicationContext;
import ra.web.page.auth.dto.LoginRequest;
import ra.web.page.posts.dto.PostCreateRequest;
import ra.web.page.users.User;
import ra.web.page.users.UserRepository;

import static io.restassured.RestAssured.given;
import static io.restassured.module.mockmvc.RestAssuredMockMvc.webAppContextSetup;
import static org.hamcrest.Matchers.blankOrNullString;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.not;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Log4j2
class PostControllerIntegrationTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    @LocalServerPort
    private Integer port;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Value("${app.mailing.admin-email}")
    private String adminEmail;

    @BeforeEach
    void setUp() {
        webAppContextSetup(webApplicationContext);
        //RestAssured.filters(new RequestLoggingFilter(), new ResponseLoggingFilter());
        //RestAssured.enableLoggingOfRequestAndResponseIfValidationFails();
        User user1 = User.builder()
            .email(adminEmail).firstName("Gendalf").lastName("White").enabled(true)
            .password(passwordEncoder.encode("password1"))
            .build();
        User user2 = User.builder()
            .email("user2@test.com").firstName("Alice").lastName("Stingray").enabled(true)
            .password(passwordEncoder.encode("password2"))
            .build();
        RestAssured.baseURI = "http://localhost:" + port;
        Post post1 = Post.builder()
            .title("Title 1").excerpt("Excerpt 1").content("Content 1").slug("title-1").enabled(true)
            .build();
        Post post2 = Post.builder()
            .title("Title 2").excerpt("Excerpt 2").content("Content 2").slug("title-2").enabled(true)
            .build();
        userRepository.truncateTable();
        userRepository.save(user1);
        userRepository.save(user2);
        postRepository.truncateTable();
        postRepository.save(post1);
        postRepository.save(post2);
    }

    @AfterEach
    public void
    clearUp() {
        RestAssuredMockMvc.reset();
    }

    @Test
    void shouldGetAllPosts() {
        given()
            .when()
            .get("/api/v1/posts")
            .then()
            .contentType(ContentType.JSON)
            .statusCode(200)
            .body("posts", hasSize(2))
            .body("posts.get(0).slug", equalTo("title-2"))
            .body("posts.get(1).slug", equalTo("title-1"));
    }

    @Test
    void shouldGetOnePost() {
        given()
            .contentType(ContentType.JSON)
            .when()
            .get("/api/v1/posts/1")
            .then()
            .contentType(ContentType.JSON)
            .statusCode(200)
            .body("slug", equalTo("title-1"));
    }

    @Test
    @WithUserDetails("gendalf-test-admin@white.com")
    void shouldPostOnePost() {
        PostCreateRequest postDTO = PostCreateRequest.builder()
            .title("Title 3").excerpt("Excerpt 3").content("Content 3").slug("title-3").enabled(true)
            .build();
        LoginRequest loginDTO = LoginRequest.builder()
            .email(adminEmail).password("password1")
            .build();
        String sessionId = given()
            //.log().everything(true)
            .contentType(ContentType.JSON)
            .with()
            .body(loginDTO)
            .when()
            .post("/api/v1/auth/login")
            .then()
            .statusCode(204)
            .extract()
            .sessionId();
        given()
            //.log().everything(true)
            .sessionId(sessionId)
            .contentType(ContentType.JSON)
            .with()
            .body(postDTO)
            .when()
            .post("/api/v1/posts")
            .then()
            .contentType(ContentType.JSON)
            .statusCode(201)
            .body("slug", equalTo("title-3"))
            .body("id", not(blankOrNullString()));
    }

    @Test
    void shouldPatchOnePost() {
        PostCreateRequest postDTO = PostCreateRequest.builder()
            .title("Title 2 patched").excerpt("Excerpt 2 patched").content("Content 2 patched").slug("title-2-patched")
            .enabled(true)
            .build();
        given()
            //.log().everything(true)
            .contentType(ContentType.JSON)
            .with()
            .body(postDTO)
            .when()
            .patch("/api/v1/posts/2")
            .then()
            .contentType(ContentType.JSON)
            .statusCode(200)
            .body("slug", equalTo("title-2-patched"));
    }

    @Test
    void shouldDeleteOnePost() throws JsonProcessingException {
        given()
            .contentType(ContentType.JSON)
            .when()
            .delete("/api/v1/posts/1")
            .then()
            .statusCode(204);
    }
}
