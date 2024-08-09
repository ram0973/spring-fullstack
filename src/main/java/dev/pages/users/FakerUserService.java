package dev.pages.users;

import dev.pages.roles.UserRole;
import dev.pages.users.dto.PagedUsersResponse;
import dev.pages.users.dto.UserCreateRequest;
import dev.pages.users.dto.UserUpdateRequest;

import net.datafaker.Faker;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;
import net.datafaker.Faker;
import java.util.*;

//@Profile("faker")
@Primary
@Service
public class FakerUserService implements IUserService {
    Faker faker = new Faker();
    List<User> users = new ArrayList<>();
    Set<UserRole> roles = new HashSet<>();
    public FakerUserService() {
        for (int i = 1; i <= User.Role.values().length; i++) {
            var role = new UserRole();
            role.setId(i);
            role.setRole(User.Role.values()[i-1]);
            roles.add(role);
        }
        for (int i = 1; i < 50; i++) {
            var user = new User();
            user.setId(i);
            String firstName = faker.name().firstName();
            String lastName = faker.name().lastName();
            String email = faker.internet().emailAddress();
            user = User.builder().firstName(firstName).lastName(lastName).email(email).enabled(true).password("")
                .roles(roles)
                .build();
            users.add(user);
        }
    }

    @Override
    public Optional<PagedUsersResponse> findAllPaged(int page, int size, String[] sort) {
        int pages = users.size() / size + users.size() % size == 0 ? 0 : 1;
        PagedUsersResponse response = new PagedUsersResponse(users, page, users.size(), pages);
        return Optional.of(response);
    }

    @Override
    public Optional<User> findById(int id) {
        return Optional.empty();
    }

    @Override
    public Optional<User> findUserByEmailIgnoreCase(String email) {
        return Optional.empty();
    }

    @Override
    public User createUser(UserCreateRequest dto) {
        return null;
    }

    @Override
    public User updateUser(int id, UserUpdateRequest dto) {
        return null;
    }

    @Override
    public void deleteUser(int id) {

    }
}
