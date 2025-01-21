package ra.web.page.users;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserActivationTokenRepository extends JpaRepository<UserActivationToken, Integer> {
    Optional<UserActivationToken> findByToken(String token);
}
