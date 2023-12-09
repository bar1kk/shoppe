package dev.danilbel.backend.mapper.impl;

import dev.danilbel.backend.entity.ProductImageEntity;
import dev.danilbel.backend.mapper.ProductImageMapper;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductImageMapperImpl implements ProductImageMapper {

    @Value("${app.image.api.url}")
    String apiURL;

    @Override
    public String map(ProductImageEntity productImageEntity) {
        return apiURL + productImageEntity.getPath();
    }
}
