package dev.danilbel.backend.mapper;

import dev.danilbel.backend.dto.product.ProductDto;
import dev.danilbel.backend.entity.ProductEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {TypeMapper.class, ProductDescriptionMapper.class})
public interface ProductMapper {

    ProductDto map(ProductEntity productEntity);
}
