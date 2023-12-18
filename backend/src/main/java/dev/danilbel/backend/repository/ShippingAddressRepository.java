package dev.danilbel.backend.repository;

import dev.danilbel.backend.entity.ShippingAddressEntity;
import dev.danilbel.backend.enums.ShippingAddressStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ShippingAddressRepository extends JpaRepository<ShippingAddressEntity, String> {

    Optional<ShippingAddressEntity> findByIdAndStatus(String id, ShippingAddressStatus status);
}
