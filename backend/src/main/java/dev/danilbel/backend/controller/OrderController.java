package dev.danilbel.backend.controller;

import dev.danilbel.backend.controller.helper.ControllerHelper;
import dev.danilbel.backend.dto.order.OrderDto;
import dev.danilbel.backend.dto.order.OrderRequestDto;
import dev.danilbel.backend.service.OrderService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

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

    ControllerHelper controllerHelper;

    @GetMapping(ORDERS)
    public ResponseEntity<List<OrderDto>> getAllOrders(Principal principal) {

        List<OrderDto> result = orderService.getAllOrders(principal.getName());

        return ResponseEntity.ok(result);
    }

    @PostMapping(ORDERS)
    public ResponseEntity<OrderDto> createOrder(@RequestBody @Valid OrderRequestDto orderRequestDto,
                                                Principal principal,
                                                BindingResult bindingResult) {

        controllerHelper.checkBindingResultElseThrowException(bindingResult, "OrderController.createOrderByUserEmail");

        OrderDto result = orderService.createOrderByUserEmail(principal.getName(), orderRequestDto);

        return ResponseEntity.ok(result);
    }
}