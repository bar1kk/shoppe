package dev.danilbel.backend.service;

import dev.danilbel.backend.dto.order.OrderDto;
import dev.danilbel.backend.dto.order.OrderRequestDto;

import java.util.List;

public interface OrderService {

    List<OrderDto> getAllOrders(String userEmail);

    OrderDto createOrderByUserEmail(String userEmail, OrderRequestDto orderRequestDto);
}
