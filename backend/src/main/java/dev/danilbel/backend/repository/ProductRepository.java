package dev.danilbel.backend.repository;

import dev.danilbel.backend.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.stream.Stream;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, String> {

    Stream<ProductEntity> streamAllBy();
}
