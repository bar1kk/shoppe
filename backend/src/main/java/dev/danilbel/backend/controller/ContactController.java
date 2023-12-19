package dev.danilbel.backend.controller;

import dev.danilbel.backend.controller.helper.ControllerHelper;
import dev.danilbel.backend.dto.contact.ContactDto;
import dev.danilbel.backend.service.ContactService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Contact")
public class ContactController {

    private static final String CONTACT = "api/v1/contacts";

    ContactService contactService;

    ControllerHelper controllerHelper;

    @PostMapping(CONTACT)
    public ResponseEntity<ContactDto> createContact(@RequestBody @Valid ContactDto contactDto,
                                                    BindingResult bindingResult) {

        controllerHelper.checkBindingResultElseThrowException(bindingResult, "ContactController.createContact");

        ContactDto result = contactService.createContact(contactDto);

        return ResponseEntity.ok(result);
    }
}
