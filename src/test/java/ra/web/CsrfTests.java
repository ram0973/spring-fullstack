package ra.web;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//@ExtendWith(SpringExtension.class)
//@ContextConfiguration(classes = SecurityConfig.class)
//@WebAppConfiguration
public class CsrfTests {

    private MockMvc mockMvc;

//    @BeforeEach
//    public void setUp(WebApplicationContext applicationContext) {
//        this.mockMvc = MockMvcBuilders.webAppContextSetup(applicationContext)
//            .apply(springSecurity())
//            .build();
//    }

    @Test
    public void loginWhenValidCsrfTokenThenSuccess() throws Exception {
        this.mockMvc.perform(post("/api/v1/auth/login").with(csrf())
                .accept(MediaType.TEXT_HTML)
                .param("username", "user")
                .param("password", "password"))
            .andExpect(status().is3xxRedirection())
            .andExpect(header().string(HttpHeaders.LOCATION, "/"));
    }

    @Test
    public void loginWhenInvalidCsrfTokenThenForbidden() throws Exception {
        this.mockMvc.perform(post("/api/v1/auth/login").with(csrf().useInvalidToken())
                .accept(MediaType.TEXT_HTML)
                .param("username", "user")
                .param("password", "password"))
            .andExpect(status().isForbidden());
    }

    @Test
    public void loginWhenMissingCsrfTokenThenForbidden() throws Exception {
        this.mockMvc.perform(post("/api/v1/auth/login")
                .accept(MediaType.TEXT_HTML)
                .param("username", "user")
                .param("password", "password"))
            .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser
    public void logoutWhenValidCsrfTokenThenSuccess() throws Exception {
        this.mockMvc.perform(post("/api/v1/auth/login").with(csrf())
                .accept(MediaType.TEXT_HTML))
            .andExpect(status().is3xxRedirection())
            .andExpect(header().string(HttpHeaders.LOCATION, "/login?logout"));
    }
}
