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
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Principal;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name="user_")
@SuperBuilder
public class User extends BaseEntity implements UserDetails {
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
    private Set<UserRole> roles = new HashSet<>();

    public void addRole(UserRole role) {
        if (this.roles == null) {
            this.roles = new HashSet<>();
        }
        this.roles.add(role);
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.roles == null) {
            return null;
        }
        return this
            .roles
            .stream()
            .map(role -> new SimpleGrantedAuthority(role.getRole().toString()))
            .collect(Collectors.toSet());
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Getter
    public enum Role {
        ROLE_ADMIN(100,"Admin"),
        ROLE_MODERATOR(2,"Moderator"),
        ROLE_USER(3,"User"),
        ROLE_TESTER(4,"Editor");

        private final Integer index;
        private final String label;

        Role(Integer index, String label) {
            this.index = index;
            this.label = label;
        }
    }
}
