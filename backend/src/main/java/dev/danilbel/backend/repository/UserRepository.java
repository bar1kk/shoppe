package dev.danilbel.backend.repository;

import dev.danilbel.backend.entity.RoleEntity;
import dev.danilbel.backend.entity.UserEntity;
import dev.danilbel.backend.enums.UserStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.stream.Stream;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {

    Optional<UserEntity> findByEmail(String email);

    Stream<UserEntity> streamAllBy();

    Stream<UserEntity> streamAllByStatus(UserStatus status);

    Stream<UserEntity> streamAllByRolesContaining(RoleEntity roleEntity);
}
