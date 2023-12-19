package dev.danilbel.backend.dto.contact;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class ContactDto {

    Integer id;

    @JsonProperty("first_name")
    @NotNull(message = "First name is required")
    @NotBlank(message = "First name cannot be blank")
    String firstName;

    @JsonProperty("last_name")
    @NotNull(message = "Last name is required")
    @NotBlank(message = "Last name cannot be blank")
    String lastName;

    @NotNull(message = "Email is required")
    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Email should be valid")
    String email;

    @NotNull(message = "Subject is required")
    @NotBlank(message = "Subject cannot be blank")
    String subject;

    @NotNull(message = "Message is required")
    @NotBlank(message = "Message cannot be blank")
    String message;
}
