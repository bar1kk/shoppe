package dev.danilbel.backend.dto.order;

import com.fasterxml.jackson.annotation.JsonProperty;
import dev.danilbel.backend.dto.address.ShippingAddressDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class OrderDto {

    String id;

    String status;

    @JsonProperty("payment_method")
    String paymentMethod;

    @JsonProperty("delivery_option")
    String deliveryOption;

    @JsonProperty("total_price")
    Double totalPrice;

    @JsonProperty("created_at")
    String createdAt;

    @JsonProperty("updated_at")
    String updatedAt;

    @JsonProperty("order_items")
    List<OrderItemDto> orderItems;

    @JsonProperty("shipping_address")
    ShippingAddressDto shippingAddress;
}
