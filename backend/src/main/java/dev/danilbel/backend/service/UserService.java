package dev.danilbel.backend.service;

import dev.danilbel.backend.entity.UserEntity;

public interface UserService {

    UserEntity getUserEntityByEmail(String email);
}
