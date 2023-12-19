package dev.danilbel.backend.mapper;

import dev.danilbel.backend.entity.DeliveryOptionEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DeliveryOptionMapper {

    default String map(DeliveryOptionEntity deliveryOptionEntity) {
        return deliveryOptionEntity.getName();
    }
}
