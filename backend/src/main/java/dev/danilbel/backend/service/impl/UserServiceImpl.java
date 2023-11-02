package dev.danilbel.backend.service.impl;

import dev.danilbel.backend.entity.UserEntity;
import dev.danilbel.backend.exception.NotFoundException;
import dev.danilbel.backend.repository.UserRepository;
import dev.danilbel.backend.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    UserRepository userRepository;

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
}
