package dev.danilbel.backend.mapper;

import dev.danilbel.backend.dto.product.AdditionalProductDescriptionDto;
import dev.danilbel.backend.entity.AdditionalProductDescriptionEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {ColorMapper.class, MaterialMapper.class})
public interface AdditionalProductDescriptionMapper {

    AdditionalProductDescriptionDto map(AdditionalProductDescriptionEntity additionalProductDescriptionEntity);
}
