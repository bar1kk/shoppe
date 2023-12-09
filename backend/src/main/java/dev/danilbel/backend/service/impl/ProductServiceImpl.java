package dev.danilbel.backend.service.impl;

import dev.danilbel.backend.dto.product.ProductDto;
import dev.danilbel.backend.entity.ProductEntity;
import dev.danilbel.backend.exception.NotFoundException;
import dev.danilbel.backend.mapper.ProductMapper;
import dev.danilbel.backend.repository.ProductRepository;
import dev.danilbel.backend.service.ProductService;
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
public class ProductServiceImpl implements ProductService {

    ProductRepository productRepository;

    ProductMapper productMapper;

    private ProductEntity getProductEntityById(String id) {

        ProductEntity productEntity = productRepository.findById(id).orElseThrow(
                () -> {
                    log.error("IN ProductServiceImpl.getProductEntityById - product with id '{}' not found", id);
                    return new NotFoundException(
                            String.format("Product with id '%s' not found", id)
                    );
                }
        );

        log.info("IN ProductServiceImpl.getProductEntityById - product: {} found by id '{}'", productEntity, id);

        return productEntity;
    }

    @Override
    public ProductDto getProductById(String id) {

        ProductEntity productEntity = getProductEntityById(id);

        return productMapper.map(productEntity);
    }

    @Override
    @Transactional
    public List<ProductDto> getAllProducts() {

        Stream<ProductEntity> productEntityStream = productRepository.streamAllBy();

        List<ProductDto> productDtoList = productEntityStream
                .map(productMapper::map)
                .toList();

        log.info("IN ProductServiceImpl.getAllProducts - {} products found", productDtoList.size());

        return productDtoList;
    }
}
