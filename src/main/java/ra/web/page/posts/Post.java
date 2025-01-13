package ra.web.page.posts;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import ra.web.common.entity.BaseEntity;
import ra.web.page.users.User;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class Post extends BaseEntity {
    @NotBlank
    @Size(max = 255)
    private String title;

    @NotBlank
    @Size(max = 255)
    @Column(nullable = false, unique = true)
    // TODO: make slug readonly after save for user?
    private String slug;

    private String excerpt;

    @NotBlank
    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    private String image;

    @ManyToOne(fetch = FetchType.EAGER) //TODO: check this
    @JsonIncludeProperties({"email"})
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private Boolean enabled;
}
