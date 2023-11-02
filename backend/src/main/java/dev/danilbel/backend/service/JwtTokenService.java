package dev.danilbel.backend.service;

import dev.danilbel.backend.dto.auth.JwtRequestDto;
import dev.danilbel.backend.dto.auth.JwtResponseDto;

public interface JwtTokenService {

    JwtResponseDto getToken(JwtRequestDto jwtRequestDto);
}
