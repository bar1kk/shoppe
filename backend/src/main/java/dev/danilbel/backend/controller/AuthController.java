package dev.danilbel.backend.controller;

import dev.danilbel.backend.controller.helper.ControllerHelper;
import dev.danilbel.backend.dto.auth.JwtRequestDto;
import dev.danilbel.backend.dto.auth.JwtResponseDto;
import dev.danilbel.backend.service.JwtTokenService;
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
public class AuthController {

    private static final String LOGIN = "api/v1/auth/login";

    ControllerHelper controllerHelper;

    JwtTokenService jwtTokenService;

    @PostMapping(LOGIN)
    public ResponseEntity<JwtResponseDto> login(@RequestBody @Valid JwtRequestDto jwtRequestDto,
                                                BindingResult bindingResult) {

        controllerHelper.checkBindingResultElseThrowException(bindingResult, "AuthController.login");

        JwtResponseDto jwtResponseDto = jwtTokenService.getToken(jwtRequestDto);

        return ResponseEntity.ok(jwtResponseDto);
    }
}
