package dev.danilbel.backend.service.impl;

import dev.danilbel.backend.dto.address.ShippingAddressDto;
import dev.danilbel.backend.entity.ShippingAddressEntity;
import dev.danilbel.backend.entity.UserEntity;
import dev.danilbel.backend.exception.NotFoundException;
import dev.danilbel.backend.mapper.ShippingAddressMapper;
import dev.danilbel.backend.repository.ShippingAddressRepository;
import dev.danilbel.backend.service.ShippingAddressService;
import dev.danilbel.backend.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class ShippingAddressServiceImpl implements ShippingAddressService {

    ShippingAddressRepository shippingAddressRepository;

    UserService userService;

    ShippingAddressMapper shippingAddressMapper;

    private ShippingAddressEntity getShippingAddressEntityById(String id) {

        ShippingAddressEntity result = shippingAddressRepository.findById(id).orElseThrow(
                () -> {
                    log.error("IN ShippingAddressServiceImpl.getShippingAddressEntityById - shipping address with id '{}' not found", id);
                    return new NotFoundException(
                            String.format("Shipping address with id '%s' not found", id)
                    );
                }
        );

        log.info("IN ShippingAddressServiceImpl.getShippingAddressEntityById - shipping address: {} found by id '{}'", result, id);
        return result;
    }

    @Override
    public ShippingAddressDto getShippingAddressById(String id) {

        ShippingAddressEntity shippingAddressEntity = getShippingAddressEntityById(id);

        return shippingAddressMapper.map(shippingAddressEntity);
    }

    @Override
    public ShippingAddressDto createShippingAddress(String userEmail, ShippingAddressDto shippingAddressDto) {

        UserEntity userEntity = userService.getUserEntityByEmail(userEmail);

        ShippingAddressEntity shippingAddressEntity = shippingAddressMapper.map(shippingAddressDto);

        shippingAddressEntity.setUser(userEntity);

        shippingAddressEntity = shippingAddressRepository.save(shippingAddressEntity);

        log.info("IN ShippingAddressServiceImpl.createShippingAddress - shipping address: {} created for user with email '{}'", shippingAddressEntity, userEmail);
        return shippingAddressMapper.map(shippingAddressEntity);
    }

    @Override
    public void removeShippingAddress(String id) {

        ShippingAddressEntity shippingAddressEntity = getShippingAddressEntityById(id);

        shippingAddressRepository.delete(shippingAddressEntity);

        log.info("IN ShippingAddressServiceImpl.removeShippingAddress - shipping address: {} removed", shippingAddressEntity);
    }
}
