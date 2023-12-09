package dev.danilbel.backend.service;

import dev.danilbel.backend.dto.user.ChangePasswordRequestDto;
import dev.danilbel.backend.dto.user.RegistrationRequestDto;
import dev.danilbel.backend.dto.user.UserDetailsRequestDto;
import dev.danilbel.backend.dto.user.UserDto;
import dev.danilbel.backend.entity.UserEntity;
import dev.danilbel.backend.enums.UserStatus;

import java.util.List;

public interface UserService {

    UserEntity getUserEntityByEmail(String email);

    UserDto getUserByEmail(String email);

    UserDto getUserById(String id);

    List<UserDto> getAllUsers();

    List<UserDto> getAllUsersByStatus(UserStatus status);

    List<UserDto> getAllAdmins();

    UserDto createUser(RegistrationRequestDto registrationRequestDto);

    UserDto updateUserDetailsByEmail(String email, UserDetailsRequestDto userDetailsRequestDto);

    UserDto updateUserPasswordByEmail(String email, ChangePasswordRequestDto changePasswordRequestDto);

    UserDto setNotActiveStatusForUserById(String id);

    UserDto setActiveStatusForUserById(String id);

    UserDto setAdminRoleForUserById(String id);

    UserDto removeAdminRoleForUserById(String id);
}
