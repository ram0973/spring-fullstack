package dev.pages.roles;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.common.entity.BaseEntity;
import dev.pages.users.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "user_role")
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class UserRole extends BaseEntity {

    @Column(unique = true)
    @Enumerated(EnumType.STRING)
    private User.Role role;

    @ManyToMany(mappedBy = "roles")
    @JsonIgnore
    private Set<User> users = new HashSet<>();
}

