package dev.danilbel.backend.mapper;

import dev.danilbel.backend.entity.RoleEntity;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring")
public interface RoleMapper {

    default String map(RoleEntity roleEntity) {
        return roleEntity.getName();
    }

    List<String> map(Set<RoleEntity> roles);
}
