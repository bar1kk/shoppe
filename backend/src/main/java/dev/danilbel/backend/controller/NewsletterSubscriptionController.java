package dev.danilbel.backend.controller;

import dev.danilbel.backend.service.MailSenderService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Newsletter subscription")
public class NewsletterSubscriptionController {

    private static final String SUBSCRIBE = "api/v1/subscribe";

    MailSenderService mailSenderService;

    @PostMapping(SUBSCRIBE)
    public ResponseEntity<String> subscribe(@RequestParam("email") String email) {

        try {
            mailSenderService.sendMailWithNewsletterSubscription(email);
        } catch (Exception e) {
            log.error("NewsletterSubscriptionController.subscribe: error while sending email to {}", email, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
