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

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class OrderRequestDto {

    @JsonProperty("payment_method_id")
    @NotNull(message = "Payment method id is required")
    @Min(value = 1, message = "Payment method id should be greater than 0")
    Integer paymentMethodId;

    @JsonProperty("delivery_option_id")
    @NotNull(message = "Delivery option id is required")
    @Min(value = 1, message = "Delivery option id should be greater than 0")
    Integer deliveryOptionId;

    @JsonProperty("order_items")
    @NotNull(message = "Order items are required")
    @Size(min = 1, message = "Order items should contain at least 1 item")
    List<OrderItemRequestDto> orderItems;

    @JsonProperty("shipping_address_id")
    @NotBlank(message = "Shipping address id cannot be blank")
    @Size(min = 36, max = 36, message = "Shipping address id should be 36 characters long")
    String shippingAddressId;
}