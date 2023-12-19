package dev.danilbel.backend.controller;

import dev.danilbel.backend.dto.order.OrderDto;
import dev.danilbel.backend.service.OrderService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Order")
public class OrderController {

    private static final String ORDERS = "api/v1/user/orders";

    OrderService orderService;

    @GetMapping(ORDERS)
    public ResponseEntity<List<OrderDto>> getAllOrders(Principal principal) {

        List<OrderDto> result = orderService.getAllOrders(principal.getName());

        return ResponseEntity.ok(result);
    }
}