package dev.danilbel.backend.service;

import dev.danilbel.backend.dto.product.ProductDto;

import java.util.List;

public interface ProductService {

    ProductDto getProductById(String id);

    List<ProductDto> getAllProducts();
}
