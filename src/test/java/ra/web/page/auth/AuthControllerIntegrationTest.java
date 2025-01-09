package ra.web.page.auth;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import io.restassured.filter.log.RequestLoggingFilter;
import io.restassured.filter.log.ResponseLoggingFilter;
import io.restassured.http.ContentType;
import lombok.extern.java.Log;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.security.crypto.password.PasswordEncoder;
import ra.web.page.auth.dto.LoginRequest;
import ra.web.page.auth.dto.SignupRequest;
import ra.web.page.roles.UserRole;
import ra.web.page.roles.UserRoleRepository;
import ra.web.page.users.User;
import ra.web.page.users.UserRepository;
import ra.web.page.users.dto.UserCreateRequest;
import ra.web.page.users.dto.UserUpdateRequest;

import java.time.LocalDateTime;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Log4j2
class AuthControllerIntegrationTest {

    @LocalServerPort
    private Integer port;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        RestAssured.filters(new RequestLoggingFilter(), new ResponseLoggingFilter());
        RestAssured.enableLoggingOfRequestAndResponseIfValidationFails();
        User user1 = User.builder()
            .email("user1@test.com").firstName("Bob").lastName("Carter").enabled(true)
            .password(passwordEncoder.encode("password1"))
            .build();
        RestAssured.baseURI = "http://localhost:" + port;
        userRepository.truncateTable();
        userRepository.save(user1);

        userRoleRepository.truncateTable();
        UserRole adminRole = UserRole.builder()
            .role(User.Role.ADMIN)
            .createdBy(1)
            .lastModifiedBy(1)
            .createdDate(LocalDateTime.now())
            .build();
        userRoleRepository.save(adminRole);

        UserRole moderatorRole = UserRole.builder()
            .role(User.Role.MODERATOR)
            .createdBy(1)
            .lastModifiedBy(1)
            .createdDate(LocalDateTime.now())
            .build();
        userRoleRepository.save(moderatorRole);

        UserRole userRole = UserRole.builder()
            .role(User.Role.USER)
            .createdBy(1)
            .lastModifiedBy(1)
            .createdDate(LocalDateTime.now())
            .build();
        userRoleRepository.save(userRole);
    }

    @Test
    void shouldSignup() {
        SignupRequest signupDTO = SignupRequest.builder()
            .email("user2@test.com")
            .password("password3")
            .build();
        given()
            //.log().everything(true)
            .contentType(ContentType.JSON)
            .with()
            .body(signupDTO)
            .when()
            .post("/api/v1/auth/signup")
            .then()
            .statusCode(201)
            .body("email", equalTo("user2@test.com"))
            .body("id", not(blankOrNullString()));
    }

    @Test
    void shouldLogin() {
        LoginRequest loginDTO = LoginRequest.builder()
            .email("user1@test.com")
            .password("password1")
            .build();
        given()
            //.log().everything(true)
            .contentType(ContentType.JSON)
            .with()
            .body(loginDTO)
            .when()
            .post("/api/v1/auth/login")
            .then()
            .statusCode(204);
    }

    @Test
    void shouldLogout() {
        given()
            //.log().everything(true)
            .contentType(ContentType.JSON)
            .when()
            .post("/api/v1/auth/logout")
            .then()
            .statusCode(204);
    }

    @Test
    void shouldGetMeNotAuthenticated() {
        given()
            .contentType(ContentType.JSON)
            .when()
            .get("/api/v1/auth/me")
            .then()
            //.contentType(ContentType.JSON)
            .statusCode(401);
            //.body("email", equalTo("user1@test.com"));
    }
}
