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
public class UserDetailsRequestDto {

    @JsonProperty("first_name")
    @NotBlank(message = "First name cannot be blank")
    String firstName;

    @JsonProperty("last_name")
    @NotBlank(message = "Last name cannot be blank")
    String lastName;

    @JsonProperty("phone_number")
    @Size(min = 12, max = 12, message = "Phone number should be 12 characters long")
    String phoneNumber;
}
