package dev.danilbel.backend.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class JwtRequestDto {

    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Email should be valid")
    String email;

    @NotBlank(message = "Password cannot be blank")
    String password;
}