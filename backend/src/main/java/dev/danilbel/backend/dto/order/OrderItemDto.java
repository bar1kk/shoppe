package dev.danilbel.backend.dto.order;

import dev.danilbel.backend.dto.product.ProductSummaryDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class OrderItemDto {

    Integer quantity;

    ProductSummaryDto product;
}
