package dev.danilbel.backend.service.impl;

import dev.danilbel.backend.dto.user.RegistrationRequestDto;
import dev.danilbel.backend.dto.user.UserDto;
import dev.danilbel.backend.entity.RoleEntity;
import dev.danilbel.backend.entity.UserEntity;
import dev.danilbel.backend.enums.UserStatus;
import dev.danilbel.backend.exception.AccessDeniedException;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Stream;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    UserRepository userRepository;

    RoleService roleService;

    UserMapper userMapper;

    PasswordEncoder passwordEncoder;

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

    private UserEntity getUserEntityById(String id) {

        UserEntity result = userRepository.findById(id).orElseThrow(
                () -> {
                    log.error("IN UserServiceImpl.getUserEntityById - user with id '{}' not found", id);
                    return new NotFoundException(
                            String.format("User with id '%s' not found", id)
                    );
                }
        );

        log.info("IN UserServiceImpl.getUserEntityById - user: {} found by id '{}'", result, id);
        return result;
    }

    @Override
    public UserDto getUserById(String id) {

        UserEntity userEntity = getUserEntityById(id);

        return userMapper.toDto(userEntity);
    }

    @Override
    @Transactional
    public List<UserDto> getAllUsers() {

        Stream<UserEntity> userEntityStream = userRepository.streamAllBy();

        List<UserDto> result = userEntityStream
                .map(userMapper::toDto)
                .toList();

        log.info("IN UserServiceImpl.getAllUsers - {} users found", result.size());
        return result;
    }

    @Override
    @Transactional
    public List<UserDto> getAllUsersByStatus(UserStatus status) {

        Stream<UserEntity> userEntityStream = userRepository.streamAllByStatus(status);

        List<UserDto> result = userEntityStream
                .map(userMapper::toDto)
                .toList();

        log.info("IN UserServiceImpl.getAllUsersByStatus - {} users found", result.size());
        return result;
    }

    @Override
    @Transactional
    public List<UserDto> getAllAdmins() {

        RoleEntity roleAdmin = roleService.getRoleAdmin();

        Stream<UserEntity> userEntityStream = userRepository.streamAllByRolesContaining(roleAdmin);

        List<UserDto> result = userEntityStream
                .map(userMapper::toDto)
                .toList();
        log.info("IN UserServiceImpl.getAllAdmins - {} admins found", result.size());

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

        RoleEntity roleUser = roleService.getRoleUser();

        UserEntity userEntity = UserEntity.builder()
                .email(registrationRequestDto.getEmail())
                .password(passwordEncoder.encode(registrationRequestDto.getPassword()))
                .roles(Set.of(roleUser))
                .build();

        UserEntity savedUserEntity = userRepository.save(userEntity);

        return userMapper.toDto(savedUserEntity);
    }

    @Override
    public UserDto setNotActiveStatusForUserById(String id) {

        UserEntity userEntity = getUserEntityById(id);

        RoleEntity roleAdmin = roleService.getRoleAdmin();
        if (userEntity.getRoles().contains(roleAdmin)) {
            log.error("IN UserServiceImpl.setNotActiveStatusForUserById - user with id '{}' is admin", id);
            throw new AccessDeniedException(
                    String.format("Cannot ban user with id '%s' because he is admin", id)
            );
        }

        if (userEntity.getStatus() == UserStatus.NOT_ACTIVE) {
            log.error("IN UserServiceImpl.setNotActiveStatusForUserById - user with id '{}' already has status NOT_ACTIVE", id);
            throw new AlreadyExistsException(
                    String.format("User with id '%s' already has status NOT_ACTIVE", id)
            );
        }

        userEntity.setStatus(UserStatus.NOT_ACTIVE);
        userEntity.setUpdatedAt(LocalDateTime.now());
        UserEntity savedUserEntity = userRepository.save(userEntity);
        log.info("IN UserServiceImpl.setNotActiveStatusForUserById - user with id '{}' status set to NOT_ACTIVE", id);

        return userMapper.toDto(savedUserEntity);
    }

    @Override
    public UserDto setActiveStatusForUserById(String id) {

        UserEntity userEntity = getUserEntityById(id);

        RoleEntity roleAdmin = roleService.getRoleAdmin();
        if (userEntity.getRoles().contains(roleAdmin)) {
            log.error("IN UserServiceImpl.setActiveStatusForUserById - user with id '{}' is admin", id);
            throw new AccessDeniedException(
                    String.format("Cannot unban user with id '%s' because he is admin", id)
            );
        }

        if (userEntity.getStatus() == UserStatus.ACTIVE) {
            log.error("IN UserServiceImpl.setActiveStatusForUserById - user with id '{}' already has status ACTIVE", id);
            throw new AlreadyExistsException(
                    String.format("User with id '%s' already has status ACTIVE", id)
            );
        }

        userEntity.setStatus(UserStatus.ACTIVE);
        userEntity.setUpdatedAt(LocalDateTime.now());
        UserEntity savedUserEntity = userRepository.save(userEntity);
        log.info("IN UserServiceImpl.setActiveStatusForUserById - user with id '{}' status set to ACTIVE", id);

        return userMapper.toDto(savedUserEntity);
    }

    @Override
    public UserDto setAdminRoleForUserById(String id) {

        UserEntity userEntity = getUserEntityById(id);

        RoleEntity roleSuperAdmin = roleService.getRoleSuperAdmin();
        if (userEntity.getRoles().contains(roleSuperAdmin)) {
            log.error("IN UserServiceImpl.setAdminRoleForUserById - user with id '{}' is super admin", id);
            throw new AccessDeniedException(
                    String.format("Cannot set admin role for user with id '%s' because he is super admin", id)
            );
        }

        RoleEntity roleAdmin = roleService.getRoleAdmin();
        if (userEntity.getRoles().contains(roleAdmin)) {
            log.error("IN UserServiceImpl.setAdminRoleForUserById - user with id '{}' already has role ROLE_ADMIN", id);
            throw new AlreadyExistsException(
                    String.format("User with id '%s' already has role ROLE_ADMIN", id)
            );
        }

        userEntity.getRoles().add(roleAdmin);
        userEntity.setUpdatedAt(LocalDateTime.now());
        UserEntity savedUserEntity = userRepository.save(userEntity);
        log.info("IN UserServiceImpl.setAdminRoleForUserById - user with id '{}' role set to ROLE_ADMIN", id);

        return userMapper.toDto(savedUserEntity);
    }

    @Override
    public UserDto removeAdminRoleForUserById(String id) {

        UserEntity userEntity = getUserEntityById(id);

        RoleEntity roleSuperAdmin = roleService.getRoleSuperAdmin();
        if (userEntity.getRoles().contains(roleSuperAdmin)) {
            log.error("IN UserServiceImpl.removeAdminRoleForUserById - user with id '{}' is super admin", id);
            throw new AccessDeniedException(
                    String.format("Cannot remove admin role for user with id '%s' because he is super admin", id)
            );
        }

        RoleEntity roleAdmin = roleService.getRoleAdmin();
        if (!userEntity.getRoles().contains(roleAdmin)) {
            log.error("IN UserServiceImpl.removeAdminRoleForUserById - user with id '{}' does not have role ROLE_ADMIN", id);
            throw new AlreadyExistsException(
                    String.format("User with id '%s' does not have role ROLE_ADMIN", id)
            );
        }

        userEntity.getRoles().remove(roleAdmin);
        userEntity.setUpdatedAt(LocalDateTime.now());
        UserEntity savedUserEntity = userRepository.save(userEntity);
        log.info("IN UserServiceImpl.removeAdminRoleForUserById - user with id '{}' role removed ROLE_ADMIN", id);

        return userMapper.toDto(savedUserEntity);
    }
}
