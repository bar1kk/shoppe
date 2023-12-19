package dev.danilbel.backend.service.impl;

import dev.danilbel.backend.dto.order.OrderDto;
import dev.danilbel.backend.dto.order.OrderRequestDto;
import dev.danilbel.backend.entity.DeliveryOptionEntity;
import dev.danilbel.backend.entity.OrderEntity;
import dev.danilbel.backend.entity.OrderItemEntity;
import dev.danilbel.backend.entity.PaymentMethodEntity;
import dev.danilbel.backend.entity.ProductEntity;
import dev.danilbel.backend.entity.ShippingAddressEntity;
import dev.danilbel.backend.entity.UserEntity;
import dev.danilbel.backend.mapper.OrderMapper;
import dev.danilbel.backend.repository.OrderRepository;
import dev.danilbel.backend.service.DeliveryOptionService;
import dev.danilbel.backend.service.OrderService;
import dev.danilbel.backend.service.PaymentMethodService;
import dev.danilbel.backend.service.ProductService;
import dev.danilbel.backend.service.ShippingAddressService;
import dev.danilbel.backend.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class OrderServiceImpl implements OrderService {

    OrderRepository orderRepository;

    UserService userService;
    ProductService productService;
    ShippingAddressService shippingAddressService;
    DeliveryOptionService deliveryOptionService;
    PaymentMethodService paymentMethodService;

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

    @Override
    public OrderDto createOrderByUserEmail(String userEmail, OrderRequestDto orderRequestDto) {

        UserEntity userEntity = userService.getUserEntityByEmail(userEmail);
        PaymentMethodEntity paymentMethodEntity = paymentMethodService.getPaymentMethodEntityById(orderRequestDto.getPaymentMethodId());
        DeliveryOptionEntity deliveryOptionEntity = deliveryOptionService.getDeliveryOptionEntityById(orderRequestDto.getDeliveryOptionId());
        ShippingAddressEntity shippingAddressEntity = shippingAddressService.getShippingAddressEntityById(orderRequestDto.getShippingAddressId());

        AtomicReference<Double> totalPrice = new AtomicReference<>(0.0);

        List<OrderItemEntity> orderItemEntities = orderRequestDto.getOrderItems().stream()
                .map(orderItemRequestDto -> {

                    ProductEntity productEntity = productService.getProductEntityById(orderItemRequestDto.getProductId());

                    if (productEntity.getAvailability() < orderItemRequestDto.getQuantity()) {
                        log.error("IN OrderServiceImpl.createOrderByUserEmail - product with id '{}' has not enough quantity", productEntity.getId());
                        throw new IllegalArgumentException(
                                String.format("Product with id '%s' has not enough quantity", productEntity.getId())
                        );
                    }

                    productEntity.setAvailability(productEntity.getAvailability() - orderItemRequestDto.getQuantity());

                    totalPrice.updateAndGet(v -> v + productEntity.getPrice() * orderItemRequestDto.getQuantity());

                    return OrderItemEntity.builder()
                            .product(productEntity)
                            .quantity(orderItemRequestDto.getQuantity())
                            .build();
                })
                .collect(Collectors.toList());

        log.info("IN OrderServiceImpl.createOrderByUserEmail - order items: {} created", orderItemEntities.size());

        OrderEntity orderEntity = OrderEntity.builder()
                .user(userEntity)
                .paymentMethod(paymentMethodEntity)
                .deliveryOption(deliveryOptionEntity)
                .shippingAddress(shippingAddressEntity)
                .orderItems(orderItemEntities)
                .totalPrice(totalPrice.get())
                .build();

        orderEntity = orderRepository.save(orderEntity);

        log.info("IN OrderServiceImpl.createOrderByUserEmail - order: {} created by user with email '{}'", orderEntity, userEmail);
        return orderMapper.map(orderEntity);
    }
}