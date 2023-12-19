package dev.danilbel.backend.service.impl;

import dev.danilbel.backend.entity.PaymentMethodEntity;
import dev.danilbel.backend.exception.NotFoundException;
import dev.danilbel.backend.repository.PaymentMethodRepository;
import dev.danilbel.backend.service.PaymentMethodService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class PaymentMethodServiceImpl implements PaymentMethodService {

    PaymentMethodRepository paymentMethodRepository;

    @Override
    public PaymentMethodEntity getPaymentMethodEntityById(Integer id) {

        PaymentMethodEntity result = paymentMethodRepository.findById(id).orElseThrow(
                () -> {
                    log.error("IN PaymentMethodServiceImpl.getPaymentMethodEntityById - payment method with id '{}' not found", id);
                    return new NotFoundException(
                            String.format("Payment method with id '%s' not found", id)
                    );
                }
        );

        log.info("IN PaymentMethodServiceImpl.getPaymentMethodEntityById - payment method: {} found by id '{}'", result, id);
        return result;
    }
}
