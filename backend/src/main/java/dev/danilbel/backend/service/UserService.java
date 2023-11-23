package dev.danilbel.backend.service;

import dev.danilbel.backend.dto.user.RegistrationRequestDto;
import dev.danilbel.backend.dto.user.UserDto;
import dev.danilbel.backend.entity.UserEntity;

public interface UserService {

    UserEntity getUserEntityByEmail(String email);

    UserDto createUser(RegistrationRequestDto registrationRequestDto);
}
