package dev.danilbel.backend.service;

import dev.danilbel.backend.dto.address.ShippingAddressDto;
import dev.danilbel.backend.entity.ShippingAddressEntity;

import java.util.List;

public interface ShippingAddressService {

    ShippingAddressEntity getShippingAddressEntityById(String id);

    ShippingAddressDto getShippingAddressById(String id);

    List<ShippingAddressDto> getAllShippingAddresses(String userEmail);

    ShippingAddressDto createShippingAddress(String userEmail, ShippingAddressDto shippingAddressDto);

    void deleteShippingAddress(String id);
}
