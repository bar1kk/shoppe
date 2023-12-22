package dev.danilbel.backend.service.impl;

import dev.danilbel.backend.service.MailSenderService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Service
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class MailSenderServiceImpl implements MailSenderService {

    @NonFinal
    @Value("${spring.mail.username}")
    String emailFrom;

    JavaMailSender mailSender;

    ResourceLoader resourceLoader;


    @Override
    public void sendMailWithNewsletterSubscription(String to) throws MessagingException, IOException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(message,
                MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name());

        Resource resource = resourceLoader.getResource("classpath:templates/newsletter-subscription.html");
        InputStream inputStream = resource.getInputStream();
        String emailContent = new String(FileCopyUtils.copyToByteArray(inputStream), StandardCharsets.UTF_8);

        mimeMessageHelper.setTo(to);
        mimeMessageHelper.setSubject("Shoppe Subscription");
        mimeMessageHelper.setFrom("Shoppe Team <" + emailFrom + ">");
        mimeMessageHelper.setText(emailContent, true);

        mailSender.send(message);

        log.info("MailSenderServiceImpl.sendMailWithNewsletterSubscription: email sent to {}", to);
    }
}
