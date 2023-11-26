package dev.danilbel.backend.controller;

import dev.danilbel.backend.dto.user.UserDto;
import dev.danilbel.backend.service.UserService;
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

    @GetMapping(ADMINS)
    public ResponseEntity<List<UserDto>> getAllAdmins() {

        List<UserDto> result = userService.getAllAdmins();

        return ResponseEntity.ok(result);
    }

    @PutMapping(SET_ADMIN)
    public ResponseEntity<UserDto> setAdminRole(@PathVariable("id") String id) {

        UserDto result = userService.setAdminRoleForUserById(id);

        return ResponseEntity.ok(result);
    }

    @PutMapping(REMOVE_ADMIN)
    public ResponseEntity<UserDto> removeAdminRole(@PathVariable("id") String id) {

        UserDto result = userService.removeAdminRoleForUserById(id);

        return ResponseEntity.ok(result);
    }
}
