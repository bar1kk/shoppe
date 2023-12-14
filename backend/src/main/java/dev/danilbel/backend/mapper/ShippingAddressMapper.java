package dev.danilbel.backend.mapper;

import dev.danilbel.backend.dto.address.ShippingAddressDto;
import dev.danilbel.backend.entity.ShippingAddressEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ShippingAddressMapper {

    ShippingAddressDto map(ShippingAddressEntity shippingAddressEntity);

    @Mapping(target = "id", ignore = true)
    ShippingAddressEntity map(ShippingAddressDto shippingAddressDto);
}
