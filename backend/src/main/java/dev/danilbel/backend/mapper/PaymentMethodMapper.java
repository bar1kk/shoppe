package dev.danilbel.backend.mapper;

import dev.danilbel.backend.entity.PaymentMethodEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PaymentMethodMapper {

    default String map(PaymentMethodEntity paymentMethodEntity) {
        return paymentMethodEntity.getName();
    }
}
