package dev.danilbel.backend.service;

import dev.danilbel.backend.dto.address.ShippingAddressDto;

import java.util.List;

public interface ShippingAddressService {

    ShippingAddressDto getShippingAddressById(String id);

    List<ShippingAddressDto> getAllShippingAddresses(String userEmail);

    ShippingAddressDto createShippingAddress(String userEmail, ShippingAddressDto shippingAddressDto);

    void deleteShippingAddress(String id);
}
