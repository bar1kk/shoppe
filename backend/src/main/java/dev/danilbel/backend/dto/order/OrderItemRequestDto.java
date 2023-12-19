package dev.danilbel.backend.dto.order;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class OrderItemRequestDto {

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity should be greater than 0")
    Integer quantity;

    @JsonProperty("product_id")
    @NotNull(message = "Product id is required")
    @NotBlank(message = "Product id cannot be blank")
    @Size(min = 36, max = 36, message = "Product id should be 36 characters long")
    String productId;
}