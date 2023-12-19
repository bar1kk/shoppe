package dev.danilbel.backend.repository;

import dev.danilbel.backend.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.stream.Stream;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, String> {

    Stream<OrderEntity> streamAllByUserId(String userId);
}
