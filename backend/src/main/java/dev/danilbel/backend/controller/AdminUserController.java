package dev.danilbel.backend.controller;

import dev.danilbel.backend.dto.user.UserDto;
import dev.danilbel.backend.enums.UserStatus;
import dev.danilbel.backend.service.UserService;
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
@Tag(name = "Admin User")
public class AdminUserController {

    private static final String USERS = "api/v1/admin/users";
    private static final String USER = "api/v1/admin/users/{id}";
    private static final String USER_BAN = "api/v1/admin/users/{id}/ban";
    private static final String USER_UNBAN = "api/v1/admin/users/{id}/unban";

    UserService userService;

    @GetMapping(USERS)
    public ResponseEntity<List<UserDto>> getAllUsers(
            @RequestParam(name = "status", required = false) Optional<UserStatus> status) {

        List<UserDto> result = status
                .map(userService::getAllUsersByStatus)
                .orElseGet(userService::getAllUsers);

        return ResponseEntity.ok(result);
    }

    @GetMapping(USER)
    public ResponseEntity<UserDto> getUser(@PathVariable("id") String id) {

        UserDto result = userService.getUserById(id);

        return ResponseEntity.ok(result);
    }

    @PutMapping(USER_BAN)
    public ResponseEntity<UserDto> banUser(@PathVariable("id") String id) {

        UserDto result = userService.setNotActiveStatusForUserById(id);

        return ResponseEntity.ok(result);
    }

    @PutMapping(USER_UNBAN)
    public ResponseEntity<UserDto> unbanUser(@PathVariable("id") String id) {

        UserDto result = userService.setActiveStatusForUserById(id);

        return ResponseEntity.ok(result);
    }
}
