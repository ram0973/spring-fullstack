package ra.web;

import org.springframework.boot.SpringApplication;

public class TestWebApplication {

    public static void main(String[] args) {
        SpringApplication.from(WebApplication::main).run(args);
    }

}
