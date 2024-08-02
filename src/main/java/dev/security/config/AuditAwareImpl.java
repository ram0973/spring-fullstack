package dev.security.config;

import dev.pages.users.User;
import dev.pages.users.UserDetailsImpl;
import dev.pages.users.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.AuditorAware;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Principal;
import java.util.Optional;

public class AuditAwareImpl implements AuditorAware<Integer> {

    @Override
    public @NonNull Optional<Integer> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() ||
            authentication instanceof AnonymousAuthenticationToken) {
            return Optional.empty();
        }
        User user = ((UserDetailsImpl) authentication.getPrincipal()).getUser();
        return Optional.ofNullable(user.getId());
    }
}
