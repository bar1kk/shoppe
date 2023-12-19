package dev.danilbel.backend.service;

import dev.danilbel.backend.dto.contact.ContactDto;

public interface ContactService {

    ContactDto createContact(ContactDto contactDto);
}
