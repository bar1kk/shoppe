package dev.danilbel.backend.service;

import dev.danilbel.backend.entity.RoleEntity;

public interface RoleService {

    RoleEntity getRoleEntityByName(String name);
}
