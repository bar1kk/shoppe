package dev.danilbel.backend.controller;

import dev.danilbel.backend.controller.helper.ControllerHelper;
import dev.danilbel.backend.dto.exception.ExceptionResponseDto;
import dev.danilbel.backend.dto.user.ChangePasswordRequestDto;
import dev.danilbel.backend.dto.user.UserDetailsRequestDto;
import dev.danilbel.backend.dto.user.UserDto;
import dev.danilbel.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import java.security.Principal;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "User")
public class UserController {

    private static final String USER_PROFILE = "api/v1/user/profile";
    private static final String USER_DETAILS = "api/v1/user/details";
    private static final String USER_CHANGE_PASSWORD = "api/v1/user/change-password";

    UserService userService;

    ControllerHelper controllerHelper;

    @Operation(
            summary = "Get user profile",
            description = "Getting user profile",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Ok. User profile has been successfully received"),
                    @ApiResponse(responseCode = "401", description = "Unauthorized. Invalid token",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    ),
                    @ApiResponse(responseCode = "404", description = "Not Found. User with such email does not exist",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    ),
                    @ApiResponse(responseCode = "405", description = "Method Not Allowed",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    )
            }
    )
    @GetMapping(USER_PROFILE)
    public ResponseEntity<UserDto> profile(Principal principal) {

        UserDto userDto = userService.getUserByEmail(principal.getName());

        return ResponseEntity.ok(userDto);
    }

    @Operation(
            summary = "Update user details",
            description = "Updating user details",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Ok. User details have been successfully updated"),
                    @ApiResponse(responseCode = "400", description = "Bad Request. Invalid request body",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    ),
                    @ApiResponse(responseCode = "401", description = "Unauthorized. Invalid token",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    ),
                    @ApiResponse(responseCode = "404", description = "Not Found. User with such email does not exist",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    ),
                    @ApiResponse(responseCode = "405", description = "Method Not Allowed",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    )
            }
    )
    @PutMapping(USER_DETAILS)
    public ResponseEntity<UserDto> updateDetails(@RequestBody @Valid UserDetailsRequestDto userDetailsRequestDto,
                                                 Principal principal,
                                                 BindingResult bindingResult) {

        controllerHelper.checkBindingResultElseThrowException(bindingResult, "UserController.updateDetails");

        UserDto userDto = userService.updateUserDetailsByEmail(principal.getName(), userDetailsRequestDto);

        return ResponseEntity.ok(userDto);
    }

    @Operation(
            summary = "Change user password",
            description = "Changing user password",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Ok. User password has been successfully changed"),
                    @ApiResponse(responseCode = "400", description = "Bad Request. Invalid request body",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    ),
                    @ApiResponse(responseCode = "401", description = "Unauthorized. Invalid token",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    ),
                    @ApiResponse(responseCode = "403", description = "Forbidden. Old password is incorrect",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    ),
                    @ApiResponse(responseCode = "404", description = "Not Found. User with such email does not exist",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    ),
                    @ApiResponse(responseCode = "405", description = "Method Not Allowed",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    )
            }
    )
    @PutMapping(USER_CHANGE_PASSWORD)
    public ResponseEntity<UserDto> changePassword(@RequestBody @Valid ChangePasswordRequestDto userDetailsRequestDto,
                                                  Principal principal,
                                                  BindingResult bindingResult) {

        controllerHelper.checkBindingResultElseThrowException(bindingResult, "UserController.changePassword");

        UserDto userDto = userService.updateUserPasswordByEmail(principal.getName(), userDetailsRequestDto);

        return ResponseEntity.ok(userDto);
    }
}
