package dev.danilbel.backend.mapper;

import dev.danilbel.backend.dto.product.view.BestSellingProductDto;
import dev.danilbel.backend.entity.view.BestSellingProductEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BestSellingProductMapper {

    BestSellingProductDto map(BestSellingProductEntity bestSellingProductEntity);
}
