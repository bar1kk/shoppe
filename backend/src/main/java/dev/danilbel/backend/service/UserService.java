package dev.danilbel.backend.service;

import dev.danilbel.backend.dto.user.RegistrationRequestDto;
import dev.danilbel.backend.dto.user.UserDto;
import dev.danilbel.backend.entity.UserEntity;
import dev.danilbel.backend.enums.UserStatus;

import java.util.List;

public interface UserService {

    UserEntity getUserEntityByEmail(String email);

    UserDto getUserById(String id);

    List<UserDto> getAllUsers();

    List<UserDto> getAllUsersByStatus(UserStatus status);

    UserDto createUser(RegistrationRequestDto registrationRequestDto);

    UserDto setNotActiveStatusForUserById(String id);

    UserDto setActiveStatusForUserById(String id);
}
