package dev.danilbel.backend.mapper;

import dev.danilbel.backend.dto.order.OrderDto;
import dev.danilbel.backend.entity.OrderEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring",
        uses = {DeliveryOptionMapper.class,
                PaymentMethodMapper.class,
                OrderItemMapper.class,
                ShippingAddressMapper.class,
                UserMapper.class})
public interface OrderMapper {

    OrderDto map(OrderEntity orderEntity);
}
