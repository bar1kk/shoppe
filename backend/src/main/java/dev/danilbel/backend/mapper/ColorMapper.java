package dev.danilbel.backend.mapper;

import dev.danilbel.backend.entity.ColorEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ColorMapper {

    default String map(ColorEntity colorEntity) {
        return colorEntity.getName();
    }
}
