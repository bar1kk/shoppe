package dev.danilbel.backend.service.impl;

import dev.danilbel.backend.dto.order.OrderDto;
import dev.danilbel.backend.entity.OrderEntity;
import dev.danilbel.backend.entity.UserEntity;
import dev.danilbel.backend.mapper.OrderMapper;
import dev.danilbel.backend.repository.OrderRepository;
import dev.danilbel.backend.service.OrderService;
import dev.danilbel.backend.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Stream;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class OrderServiceImpl implements OrderService {

    OrderRepository orderRepository;

    UserService userService;

    OrderMapper orderMapper;

    @Override
    @Transactional
    public List<OrderDto> getAllOrders(String userEmail) {

        UserEntity userEntity = userService.getUserEntityByEmail(userEmail);

        Stream<OrderEntity> orderEntityStream = orderRepository.streamAllByUserId(userEntity.getId());

        List<OrderDto> result = orderEntityStream
                .map(orderMapper::map)
                .toList();

        log.info("IN OrderServiceImpl.getAllOrders - {} orders found by user email '{}'", result.size(), userEmail);
        return result;
    }
}