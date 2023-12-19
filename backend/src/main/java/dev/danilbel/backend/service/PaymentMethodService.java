package dev.danilbel.backend.service;

import dev.danilbel.backend.entity.PaymentMethodEntity;

public interface PaymentMethodService {

    PaymentMethodEntity getPaymentMethodEntityById(Integer id);
}
