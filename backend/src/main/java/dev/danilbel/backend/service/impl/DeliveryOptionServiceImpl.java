package dev.danilbel.backend.service.impl;

import dev.danilbel.backend.entity.DeliveryOptionEntity;
import dev.danilbel.backend.exception.NotFoundException;
import dev.danilbel.backend.repository.DeliveryOptionRepository;
import dev.danilbel.backend.service.DeliveryOptionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class DeliveryOptionServiceImpl implements DeliveryOptionService {

    DeliveryOptionRepository deliveryOptionRepository;

    @Override
    public DeliveryOptionEntity getDeliveryOptionEntityById(Integer id) {

        DeliveryOptionEntity result = deliveryOptionRepository.findById(id).orElseThrow(
                () -> {
                    log.error("IN DeliveryOptionServiceImpl.getDeliveryOptionEntityById - delivery option with id '{}' not found", id);
                    return new NotFoundException(
                            String.format("Delivery option with id '%s' not found", id)
                    );
                }
        );

        log.info("IN DeliveryOptionServiceImpl.getDeliveryOptionEntityById - delivery option: {} found by id '{}'", result, id);
        return result;
    }
}
