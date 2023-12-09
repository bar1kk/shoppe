package dev.danilbel.backend.controller;

import dev.danilbel.backend.dto.product.ProductDto;
import dev.danilbel.backend.service.ProductService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Product")
public class ProductController {

    private static final String PRODUCTS = "api/v1/products";
    private static final String PRODUCT = "api/v1/products/{id}";

    ProductService productService;

    @GetMapping(PRODUCTS)
    public ResponseEntity<List<ProductDto>> getAllProducts() {

        List<ProductDto> result = productService.getAllProducts();

        return ResponseEntity.ok(result);
    }

    @GetMapping(PRODUCT)
    public ResponseEntity<ProductDto> getProductById(@PathVariable("id") String id) {

        ProductDto result = productService.getProductById(id);

        return ResponseEntity.ok(result);
    }
}
