package dev.danilbel.backend.mapper;

import dev.danilbel.backend.entity.MaterialEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MaterialMapper {

    default String map(MaterialEntity materialEntity) {
        return materialEntity.getName();
    }
}
