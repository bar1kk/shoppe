package dev.danilbel.backend.service;

import dev.danilbel.backend.dto.product.ProductDto;
import dev.danilbel.backend.entity.ProductEntity;

import java.util.List;

public interface ProductService {

    ProductEntity getProductEntityById(String id);

    ProductDto getProductById(String id);

    List<ProductDto> getAllProducts();
}
