package dev.danilbel.backend.mapper;

import dev.danilbel.backend.dto.order.OrderDto;
import dev.danilbel.backend.entity.OrderEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring",
        uses = {DeliveryOptionMapper.class,
                PaymentMethodMapper.class,
                OrderItemMapper.class,
                ShippingAddressMapper.class,
                UserMapper.class})
public interface OrderMapper {

    @Mapping(target = "status", expression = "java(orderEntity.getStatus().toString())")
    OrderDto map(OrderEntity orderEntity);
}
