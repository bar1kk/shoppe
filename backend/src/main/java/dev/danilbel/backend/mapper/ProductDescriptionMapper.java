package dev.danilbel.backend.mapper;

import dev.danilbel.backend.dto.product.ProductDescriptionDto;
import dev.danilbel.backend.entity.ProductDescriptionEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {AdditionalProductDescriptionMapper.class})
public interface ProductDescriptionMapper {

    ProductDescriptionDto map(ProductDescriptionEntity productDescriptionEntity);
}
