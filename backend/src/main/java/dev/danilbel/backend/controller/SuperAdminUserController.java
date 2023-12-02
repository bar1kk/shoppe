package dev.danilbel.backend.controller;

import dev.danilbel.backend.dto.exception.ExceptionResponseDto;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Super Admin User")
public class SuperAdminUserController {

    private static final String ADMINS = "api/v1/super-admin/admins";
    private static final String SET_ADMIN = "api/v1/super-admin/admins/{id}/set-admin";
    private static final String REMOVE_ADMIN = "api/v1/super-admin/admins/{id}/remove-admin";

    UserService userService;

    @Operation(
            summary = "Get all admins",
            description = "Getting all admins",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Ok. Admins have been successfully received"),
                    @ApiResponse(responseCode = "405", description = "Method Not Allowed",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    )
            }
    )
    @GetMapping(ADMINS)
    public ResponseEntity<List<UserDto>> getAllAdmins() {

        List<UserDto> result = userService.getAllAdmins();

        return ResponseEntity.ok(result);
    }

    @Operation(
            summary = "Set admin role for user",
            description = "Setting admin role for user",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Ok. Admin role has been successfully set"),
                    @ApiResponse(responseCode = "403", description = "Forbidden. User with id is super admin",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    ),
                    @ApiResponse(responseCode = "404", description = "Not Found. User not found",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    ),
                    @ApiResponse(responseCode = "405", description = "Method Not Allowed",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    ),
                    @ApiResponse(responseCode = "409", description = "Conflict. User already has admin role",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    )
            }
    )
    @PutMapping(SET_ADMIN)
    public ResponseEntity<UserDto> setAdminRole(@PathVariable("id") String id) {

        UserDto result = userService.setAdminRoleForUserById(id);

        return ResponseEntity.ok(result);
    }

    @Operation(
            summary = "Remove admin role for user",
            description = "Removing admin role for user",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Ok. Admin role has been successfully removed"),
                    @ApiResponse(responseCode = "403", description = "Forbidden. User with id is super admin",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    ),
                    @ApiResponse(responseCode = "404", description = "Not Found. User not found",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    ),
                    @ApiResponse(responseCode = "405", description = "Method Not Allowed",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    ),
                    @ApiResponse(responseCode = "409", description = "Conflict. User already has not admin role",
                            content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))
                    )
            }
    )
    @PutMapping(REMOVE_ADMIN)
    public ResponseEntity<UserDto> removeAdminRole(@PathVariable("id") String id) {

        UserDto result = userService.removeAdminRoleForUserById(id);

        return ResponseEntity.ok(result);
    }
}
