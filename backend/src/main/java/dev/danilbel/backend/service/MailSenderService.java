package dev.danilbel.backend.service;

import jakarta.mail.MessagingException;

import java.io.IOException;

public interface MailSenderService {

    void sendMailWithNewsletterSubscription(String to) throws MessagingException, IOException;
}
