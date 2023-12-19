package dev.danilbel.backend.service;

import dev.danilbel.backend.dto.order.OrderDto;

import java.util.List;

public interface OrderService {

    List<OrderDto> getAllOrders(String userEmail);
}
