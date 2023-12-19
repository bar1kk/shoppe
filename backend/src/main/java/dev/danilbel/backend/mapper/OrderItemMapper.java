package dev.danilbel.backend.mapper;

import dev.danilbel.backend.dto.order.OrderItemDto;
import dev.danilbel.backend.entity.OrderItemEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = {ProductMapper.class})
public interface OrderItemMapper {

    OrderItemDto map(OrderItemEntity orderItemEntity);

    List<OrderItemDto> map(List<OrderItemEntity> orderItemEntities);
}
