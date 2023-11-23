package dev.danilbel.backend.service.impl;

import dev.danilbel.backend.entity.RoleEntity;
import dev.danilbel.backend.exception.NotFoundException;
import dev.danilbel.backend.repository.RoleRepository;
import dev.danilbel.backend.service.RoleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class RoleServiceImpl implements RoleService {

    RoleRepository roleRepository;

    @Override
    public RoleEntity getRoleEntityByName(String name) {

        RoleEntity result = roleRepository.findByName(name).orElseThrow(
                () -> {
                    log.error("IN RoleServiceImpl.getRoleEntityByName - role with name '{}' not found", name);
                    return new NotFoundException(
                            String.format("Role with name '%s' not found", name)
                    );
                }
        );

        log.info("IN RoleServiceImpl.getRoleEntityByName - role: {} found by name '{}'", result, name);
        return result;
    }
}
