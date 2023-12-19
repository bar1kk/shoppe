package dev.danilbel.backend.repository;

import dev.danilbel.backend.entity.DeliveryOptionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryOptionRepository extends JpaRepository<DeliveryOptionEntity, Integer> {
}
