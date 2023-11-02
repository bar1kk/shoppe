package dev.danilbel.backend.service.impl;

import dev.danilbel.backend.dto.auth.JwtRequestDto;
import dev.danilbel.backend.dto.auth.JwtResponseDto;
import dev.danilbel.backend.entity.UserEntity;
import dev.danilbel.backend.exception.JwtAuthenticationException;
import dev.danilbel.backend.security.JwtTokenProvider;
import dev.danilbel.backend.service.JwtTokenService;
import dev.danilbel.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class JwtTokenServiceImpl implements JwtTokenService {

    UserService userService;

    JwtTokenProvider jwtTokenProvider;

    AuthenticationManager authenticationManager;

    @Override
    public JwtResponseDto getToken(JwtRequestDto jwtRequestDto) {

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtRequestDto.getEmail(), jwtRequestDto.getPassword()));
        } catch (BadCredentialsException e) {
            log.error("IN AuthController.auth - BadCredentialsException: {}", e.getMessage());
            throw new JwtAuthenticationException("Invalid username or password");
        }

        UserEntity user = userService.getUserEntityByEmail(jwtRequestDto.getEmail());

        String token = jwtTokenProvider.generateToken(user);

        log.info("IN JwtTokenServiceImpl.getToken - token: {} generated for user with email '{}'", token, jwtRequestDto.getEmail());

        return new JwtResponseDto(token);
    }
}
