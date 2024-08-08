package dev.pages.posts_comments;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import dev.common.entity.BaseEntity;
import dev.pages.posts.Post;
import dev.pages.users.User;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class PostComment extends BaseEntity {
    @NotBlank
    private String content;

    @ManyToOne(fetch = FetchType.EAGER) //TODO: check this
    @JsonIgnoreProperties(
        {"email", "password", "enabled", "createdDate", "lastModifiedDate", "createdBy", "lastModifiedBy", "roles"}
    )
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY) //TODO: check this
    @JsonIgnore
    @JoinColumn(name = "post_id", referencedColumnName = "id")
    private Post post;

    @Builder.Default
    private boolean enabled = true;
}
