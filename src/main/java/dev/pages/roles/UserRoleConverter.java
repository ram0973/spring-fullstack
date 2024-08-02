package dev.pages.roles;

import dev.pages.users.User;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.Arrays;
import java.util.Objects;

@Converter
public class UserRoleConverter implements AttributeConverter<User.Role, Integer> {
    @Override
    public Integer convertToDatabaseColumn(User.Role role)
    {
        return role.getIndex();
    }

    @Override
    public User.Role convertToEntityAttribute(Integer index) {
        return Arrays.stream(User.Role.values())
            .filter(o -> Objects.equals(o.getIndex(), index))
            .findFirst()
            .orElseThrow(IllegalArgumentException::new);
    }
}
