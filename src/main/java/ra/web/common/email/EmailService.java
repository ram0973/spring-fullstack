package ra.web.common.email;

import gg.jte.CodeResolver;
import gg.jte.ContentType;
import gg.jte.TemplateEngine;
import gg.jte.TemplateOutput;
import gg.jte.output.StringOutput;
import gg.jte.resolve.DirectoryCodeResolver;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.nio.file.Path;

import static java.nio.charset.StandardCharsets.UTF_8;
import static org.springframework.mail.javamail.MimeMessageHelper.MULTIPART_MODE_MIXED;

@Service
@Log4j2
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender = new JavaMailSenderImpl(); // Idea: no beans found - is bullshit error

    @Value("${app.mailing.admin-email}")
    private String adminEmail;

    @Async
    public void sendUserActivationEmail(String to, String fullName, EmailTemplateName emailTemplate, String confirmationUrl,
                                        String activationCode, String subject
    ) throws MessagingException {

        // render user activation email from jte template
        CodeResolver codeResolver = new DirectoryCodeResolver(Path.of("jte")); // This is the directory where your .jte files are located.
        TemplateEngine templateEngine = TemplateEngine.create(codeResolver, ContentType.Html); // Two choices: Plain or Html
        TemplateOutput templateOutput = new StringOutput();
        String templateName = emailTemplate.name();
        UserActivationProperties properties = UserActivationProperties.builder()
            .activationCode(activationCode)
            .confirmationUrl(confirmationUrl)
            .build();
        templateEngine.render(templateName, properties, templateOutput);

        // populate email requisites and send email
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, MULTIPART_MODE_MIXED, UTF_8.name());
        helper.setFrom(adminEmail);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(templateOutput.toString(), true);
        mailSender.send(mimeMessage);
    }
}
