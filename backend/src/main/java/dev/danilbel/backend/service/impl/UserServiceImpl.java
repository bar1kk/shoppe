package dev.danilbel.backend.service.impl;

import dev.danilbel.backend.dto.user.RegistrationRequestDto;
import dev.danilbel.backend.dto.user.UserDto;
import dev.danilbel.backend.entity.RoleEntity;
import dev.danilbel.backend.entity.UserEntity;
import dev.danilbel.backend.exception.AlreadyExistsException;
import dev.danilbel.backend.exception.NotFoundException;
import dev.danilbel.backend.mapper.UserMapper;
import dev.danilbel.backend.repository.UserRepository;
import dev.danilbel.backend.service.RoleService;
import dev.danilbel.backend.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    UserRepository userRepository;

    RoleService roleService;

    UserMapper userMapper;

    @Override
    public UserEntity getUserEntityByEmail(String email) {

        UserEntity result = userRepository.findByEmail(email).orElseThrow(
                () -> {
                    log.error("IN UserServiceImpl.getUserEntityByEmail - user with email '{}' not found", email);
                    return new NotFoundException(
                            String.format("User with email '%s' not found", email)
                    );
                }
        );

        log.info("IN UserServiceImpl.getUserEntityByEmail - user: {} found by email '{}'", result, email);
        return result;
    }

    @Override
    public UserDto createUser(RegistrationRequestDto registrationRequestDto) {

        userRepository.findByEmail(registrationRequestDto.getEmail()).ifPresent(
                userEntity -> {
                    log.error("IN UserServiceImpl.createUser - user with email '{}' already exists", registrationRequestDto.getEmail());
                    throw new AlreadyExistsException(
                            String.format("User with email '%s' already exists", registrationRequestDto.getEmail())
                    );
                }
        );

        RoleEntity roleEntity = roleService.getRoleEntityByName("ROLE_USER");

        UserEntity userEntity = UserEntity.builder()
                .email(registrationRequestDto.getEmail())
                .password(registrationRequestDto.getPassword())
                .roles(Set.of(roleEntity))
                .build();

        UserEntity savedUserEntity = userRepository.save(userEntity);

        return userMapper.toDto(savedUserEntity);
    }
}
