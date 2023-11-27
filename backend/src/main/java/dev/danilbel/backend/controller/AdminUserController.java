package dev.danilbel.backend.controller;

import dev.danilbel.backend.dto.exception.ExceptionResponseDto;
import dev.danilbel.backend.dto.user.UserDto;
import dev.danilbel.backend.enums.UserStatus;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Admin User")
public class AdminUserController {

    private static final String USERS = "api/v1/admin/users";
    private static final String USER = "api/v1/admin/users/{id}";
    private static final String USER_BAN = "api/v1/admin/users/{id}/ban";
    private static final String USER_UNBAN = "api/v1/admin/users/{id}/unban";

    UserService userService;

    @Operation(
            summary = "Get all users",
            description = "Getting all users",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Ok. Users have been successfully received"),
                    @ApiResponse(responseCode = "400", description = "Bad Request. Validation error UserStatus",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    ),
                    @ApiResponse(responseCode = "405", description = "Method Not Allowed",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    )
            }
    )
    @GetMapping(USERS)
    public ResponseEntity<List<UserDto>> getAllUsers(
            @RequestParam(name = "status", required = false) Optional<UserStatus> status) {

        List<UserDto> result = status
                .map(userService::getAllUsersByStatus)
                .orElseGet(userService::getAllUsers);

        return ResponseEntity.ok(result);
    }

    @Operation(
            summary = "Get user by id",
            description = "Getting user by id",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Ok. User has been successfully received"),
                    @ApiResponse(responseCode = "404", description = "Not Found. User not found by id",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    ),
                    @ApiResponse(responseCode = "405", description = "Method Not Allowed",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    )
            }
    )
    @GetMapping(USER)
    public ResponseEntity<UserDto> getUser(@PathVariable("id") String id) {

        UserDto result = userService.getUserById(id);

        return ResponseEntity.ok(result);
    }

    @Operation(
            summary = "Ban user by id",
            description = "Setting the status of the user to 'NOT_ACTIVE'",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Ok. User has been successfully banned"),
                    @ApiResponse(responseCode = "403", description = "Forbidden. User with id is admin",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    ),
                    @ApiResponse(responseCode = "404", description = "Not Found. User not found by id",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    ),
                    @ApiResponse(responseCode = "405", description = "Method Not Allowed",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    ),
                    @ApiResponse(responseCode = "409", description = "Conflict. User already banned",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    )
            }
    )
    @PutMapping(USER_BAN)
    public ResponseEntity<UserDto> banUser(@PathVariable("id") String id) {

        UserDto result = userService.setNotActiveStatusForUserById(id);

        return ResponseEntity.ok(result);
    }

    @Operation(
            summary = "Unban user by id",
            description = "Setting the status of the user to 'ACTIVE'",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Ok. User has been successfully unbanned"),
                    @ApiResponse(responseCode = "403", description = "Forbidden. User with id is admin",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    ),
                    @ApiResponse(responseCode = "404", description = "Not Found. User not found by id",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    ),
                    @ApiResponse(responseCode = "405", description = "Method Not Allowed",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    ),
                    @ApiResponse(responseCode = "409", description = "Conflict. User already unbanned",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    )
            }
    )
    @PutMapping(USER_UNBAN)
    public ResponseEntity<UserDto> unbanUser(@PathVariable("id") String id) {

        UserDto result = userService.setActiveStatusForUserById(id);

        return ResponseEntity.ok(result);
    }
}
