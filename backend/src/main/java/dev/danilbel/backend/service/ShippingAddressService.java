package dev.danilbel.backend.service;

import dev.danilbel.backend.dto.address.ShippingAddressDto;

public interface ShippingAddressService {

    ShippingAddressDto getShippingAddressById(String id);

    ShippingAddressDto createShippingAddress(String userEmail, ShippingAddressDto shippingAddressDto);

    void deleteShippingAddress(String id);
}
