package dev.danilbel.backend.repository;

import dev.danilbel.backend.entity.ShippingAddressEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShippingAddressRepository extends JpaRepository<ShippingAddressEntity, String> {
}
