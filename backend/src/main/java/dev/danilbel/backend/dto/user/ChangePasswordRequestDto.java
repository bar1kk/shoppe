package dev.danilbel.backend.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class ChangePasswordRequestDto {

    @JsonProperty("old_password")
    @NotBlank(message = "Old password cannot be blank")
    String oldPassword;

    @JsonProperty("new_password")
    @NotBlank(message = "New password cannot be blank")
    @Size(min = 8, message = "Password should be at least 8 characters long")
    String newPassword;
}
