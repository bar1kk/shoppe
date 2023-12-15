package dev.danilbel.backend.controller;

import dev.danilbel.backend.controller.helper.ControllerHelper;
import dev.danilbel.backend.dto.address.ShippingAddressDto;
import dev.danilbel.backend.service.ShippingAddressService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import java.security.Principal;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "ShippingAddress")
public class ShippingAddressController {

    ShippingAddressService shippingAddressService;

    ControllerHelper controllerHelper;

    private static final String SHIPPING_ADDRESS_ID = "api/v1/shipping-address/{id}";
    private static final String SHIPPING_ADDRESS_CREATE = "api/v1/shipping-address/create";
    private static final String SHIPPING_ADDRESS_DELETE = "api/v1/shipping-address/{id}/delete";

    @GetMapping(SHIPPING_ADDRESS_ID)
    public ResponseEntity<ShippingAddressDto> getShippingAddressById(@PathVariable("id") String id) {

        ShippingAddressDto result = shippingAddressService.getShippingAddressById(id);

        return ResponseEntity.ok(result);
    }

    @PostMapping(SHIPPING_ADDRESS_CREATE)
    public ResponseEntity<ShippingAddressDto> createShippingAddress(@RequestBody @Valid ShippingAddressDto shippingAddressDto,
                                                                    Principal principal,
                                                                    BindingResult bindingResult) {

        controllerHelper.checkBindingResultElseThrowException(bindingResult, "ShippingAddressController.createShippingAddress");

        String userEmail = principal.getName();

        ShippingAddressDto result = shippingAddressService.createShippingAddress(userEmail, shippingAddressDto);

        return ResponseEntity.ok(result);
    }

    @DeleteMapping(SHIPPING_ADDRESS_DELETE)
    public ResponseEntity<ShippingAddressDto> deleteShippingAddress(@PathVariable("id") String id) {

        shippingAddressService.deleteShippingAddress(id);

        return ResponseEntity.ok().build();
    }

}
