package ra.web.common.email;

import lombok.Builder;

@Builder
public record UserActivationProperties(
    String confirmationUrl,
    String activationCode
) {
}
