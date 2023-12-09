package dev.danilbel.backend.mapper;

import dev.danilbel.backend.entity.TypeEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TypeMapper {

    default String map(TypeEntity typeEntity) {
        return typeEntity.getName();
    }
}
