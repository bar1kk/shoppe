package dev.danilbel.backend.mapper;

import dev.danilbel.backend.dto.contact.ContactDto;
import dev.danilbel.backend.entity.ContactEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ContactMapper {

    ContactDto map(ContactEntity contactEntity);

    @Mapping(target = "id", ignore = true)
    ContactEntity map(ContactDto contactDto);
}
