package ra.web.page.users;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserControllerTest {

    @LocalServerPort
    private Integer port;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @BeforeEach
    void setUp() {
        RestAssured.baseURI = "http://localhost:" + port;
        userRepository.deleteAll();
    }

    @Test
    void shouldGetAllCustomers() {
        User user1 = User.builder()
                        .email("user1@test.com").firstName("Bob").lastName("Carter").enabled(true)
                        .password(passwordEncoder.encode("password"))
                        .build();
        User user2 = User.builder()
                        .email("user2@test.com").firstName("Alice").lastName("Stingray").enabled(true)
                        .password(passwordEncoder.encode("password"))
                        .build();
        userRepository.save(user1);
        userRepository.save(user2);

        given()
                .contentType(ContentType.JSON)
                .when()
                .get("/api/v1/users")
                .then()
                .statusCode(200)
                .body("users", hasSize(2))
                .body("users.get(0).email", equalTo("user2@test.com"))
                .body("users.get(1).email", equalTo("user1@test.com"));
    }
}
