package dev.danilbel.backend.repository;

import dev.danilbel.backend.entity.view.BestSellingProductEntity;
import org.springframework.data.repository.Repository;

import java.util.stream.Stream;

@org.springframework.stereotype.Repository
public interface BestSellingProductRepository extends Repository<BestSellingProductEntity, String> {

    Stream<BestSellingProductEntity> streamAllBy();
}
