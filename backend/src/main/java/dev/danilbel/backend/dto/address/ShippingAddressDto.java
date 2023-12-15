package dev.danilbel.backend.dto.address;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class ShippingAddressDto {

    String id;

    @JsonProperty("first_name")
    @NotBlank(message = "First name cannot be blank")
    String firstName;

    @JsonProperty("last_name")
    @NotBlank(message = "Last name cannot be blank")
    String lastName;

    @NotBlank(message = "Country cannot be blank")
    String country;

    @NotBlank(message = "City cannot be blank")
    String city;

    @NotBlank(message = "Street cannot be blank")
    String street;

    String apartment;

    @JsonProperty("zip_code")
    @NotBlank(message = "Zip code cannot be blank")
    String zipCode;

    @JsonProperty("phone_number")
    @NotBlank(message = "Phone number cannot be blank")
    @Size(min = 12, max = 12, message = "Phone number should be 12 characters long")
    String phoneNumber;

    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Email should be valid")
    String email;
}
