package dev.danilbel.backend.dto.product;

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
public class ProductDto {

    String id;

    String name;

    String type;

    Double price;

    Integer availability;

    ProductDescriptionDto productDescription;

    List<String> images;
}
