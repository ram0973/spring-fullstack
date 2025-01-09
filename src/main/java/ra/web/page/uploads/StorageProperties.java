package ra.web.page.uploads;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Setter
@Getter
@Component
@ConfigurationProperties("storage")
public class StorageProperties {
    /** Folder location for storing files */
    private String location = "public/uploads";
}
