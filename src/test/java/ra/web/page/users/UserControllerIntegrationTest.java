package ra.web.page.users;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import io.restassured.filter.log.RequestLoggingFilter;
import io.restassured.filter.log.ResponseLoggingFilter;
import io.restassured.http.ContentType;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.security.crypto.password.PasswordEncoder;
import ra.web.page.users.dto.UserCreateRequest;
import ra.web.page.users.dto.UserUpdateRequest;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.not;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.blankOrNullString;
import static org.hamcrest.Matchers.hasSize;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Log4j2
class UserControllerIntegrationTest {

    @LocalServerPort
    private Integer port;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        RestAssured.filters(new RequestLoggingFilter(), new ResponseLoggingFilter());
        RestAssured.enableLoggingOfRequestAndResponseIfValidationFails();
        User user1 = User.builder()
            .email("user1@test.com").firstName("Bob").lastName("Carter").enabled(true)
            .password(passwordEncoder.encode("password1"))
            .build();
        User user2 = User.builder()
            .email("user2@test.com").firstName("Alice").lastName("Stingray").enabled(true)
            .password(passwordEncoder.encode("password2"))
            .build();
        RestAssured.baseURI = "http://localhost:" + port;
        userRepository.truncateTable();
        userRepository.save(user1);
        userRepository.save(user2);
    }

    @Test
    void shouldGetAllCustomers() {
        given()
            .when()
            .get("/api/v1/users")
            .then()
            .contentType(ContentType.JSON)
            .statusCode(200)
            .body("users", hasSize(2))
            .body("users.get(0).email", equalTo("user2@test.com"))
            .body("users.get(1).email", equalTo("user1@test.com"));
    }

    @Test
    void shouldGetOneCustomer() {
        given()
            .contentType(ContentType.JSON)
            .when()
            .get("/api/v1/users/1")
            .then()
            .contentType(ContentType.JSON)
            .statusCode(200)
            .body("email", equalTo("user1@test.com"));
    }

    @Test
    void shouldPostOneCustomer() {
        UserCreateRequest userDTO = UserCreateRequest.builder()
            .email("user3@test.com").firstName("Trudy").lastName("Cappella").enabled(true)
            .password("password3")
            .build();
        given()
            //.log().everything(true)
            .contentType(ContentType.JSON)
            .with()
            .body(userDTO)
            .when()
            .post("/api/v1/users")
            .then()
            .contentType(ContentType.JSON)
            .statusCode(201)
            .body("email", equalTo("user3@test.com"))
            .body("id", not(blankOrNullString()));
    }

    @Test
    void shouldPatchOneCustomer() {
        UserUpdateRequest userDTO = UserUpdateRequest.builder()
            .email("user1-updated@test.com").firstName("Trudy-updated").lastName("Cappella-updated").enabled(false)
            .password("password1-updated")
            .build();
        given()
            //.log().everything(true)
            .contentType(ContentType.JSON)
            .with()
            .body(userDTO)
            .when()
            .patch("/api/v1/users/1")
            .then()
            .contentType(ContentType.JSON)
            .statusCode(200)
            .body("email", equalTo("user1-updated@test.com"))
            .body("firstName", equalTo("Trudy-updated"))
            .body("lastName", equalTo("Cappella-updated"))
            .body("enabled", equalTo(false));
    }

    @Test
    void shouldDeleteOneCustomer() throws JsonProcessingException {
        given()
            .contentType(ContentType.JSON)
            .when()
            .delete("/api/v1/users/1")
            .then()
            .statusCode(204);
    }
}
