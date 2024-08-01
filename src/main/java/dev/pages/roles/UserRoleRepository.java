package dev.pages.roles;

import dev.pages.users.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, Integer> {
    Optional<UserRole> findByName(@Param(value = "name") User.Role userRole);
    Optional<UserRole> findById(int id);
}
