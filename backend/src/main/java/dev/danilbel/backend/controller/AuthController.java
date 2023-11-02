package dev.danilbel.backend.controller;

import dev.danilbel.backend.controller.helper.ControllerHelper;
import dev.danilbel.backend.dto.auth.JwtRequestDto;
import dev.danilbel.backend.dto.auth.JwtResponseDto;
import dev.danilbel.backend.dto.exception.ExceptionResponseDto;
import dev.danilbel.backend.service.JwtTokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Auth")
public class AuthController {

    private static final String LOGIN = "api/v1/auth/login";

    ControllerHelper controllerHelper;

    JwtTokenService jwtTokenService;

    @Operation(
            summary = "Login",
            description = "Getting a jwt token",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Ok. User has been successfully issued a token"),
                    @ApiResponse(responseCode = "400", description = "Bad Request. Validation error JwtRequest",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    ),
                    @ApiResponse(responseCode = "401", description = "Unauthorized. Invalid email or password",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    ),
                    @ApiResponse(responseCode = "404", description = "Not Found. User not found",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    ),
                    @ApiResponse(responseCode = "405", description = "Method Not Allowed",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    )
            }
    )
    @PostMapping(LOGIN)
    public ResponseEntity<JwtResponseDto> login(@RequestBody @Valid JwtRequestDto jwtRequestDto,
                                                BindingResult bindingResult) {

        controllerHelper.checkBindingResultElseThrowException(bindingResult, "AuthController.login");

        JwtResponseDto jwtResponseDto = jwtTokenService.getToken(jwtRequestDto);

        return ResponseEntity.ok(jwtResponseDto);
    }
}
