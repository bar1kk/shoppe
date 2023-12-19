package dev.danilbel.backend.service.impl;

import dev.danilbel.backend.dto.contact.ContactDto;
import dev.danilbel.backend.entity.ContactEntity;
import dev.danilbel.backend.mapper.ContactMapper;
import dev.danilbel.backend.repository.ContactRepository;
import dev.danilbel.backend.service.ContactService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class ContactServiceImpl implements ContactService {

    ContactRepository contactRepository;

    ContactMapper contactMapper;

    @Override
    public ContactDto createContact(ContactDto contactDto) {

        ContactEntity contactEntity = contactMapper.map(contactDto);

        contactEntity = contactRepository.save(contactEntity);

        log.info("IN ContactServiceImpl.createContact - contact: {} successfully created", contactEntity);
        return contactMapper.map(contactEntity);
    }
}
