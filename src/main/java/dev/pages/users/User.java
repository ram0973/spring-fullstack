package dev.pages.users;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.common.entity.BaseEntity;
import dev.pages.roles.UserRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name="user_")
@SuperBuilder
public class User extends BaseEntity {
    @Column(nullable = false, unique = true)
    @NotBlank
    @Email
    private String email;

    @Column(nullable = false)
    @NotBlank
    @JsonIgnore
    private String password;

    private boolean isEnabled = true;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<UserRole> roles;

    public void addRole(UserRole role) {
        this.roles.add(role);
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this
            .roles
            .stream()
            .map(role -> new SimpleGrantedAuthority(role.getName().toString()))
            .collect(Collectors.toSet());
    }

    @Getter
    public enum Role {
        ROLE_ADMIN(1,"Admin"),
        ROLE_MODERATOR(2,"Moderator"),
        ROLE_USER(3,"User");

        private final String label;
        private final Integer id;

        Role(Integer id, String label) {
            this.id = id;
            this.label = label;
        }
    }
}
