package dev.danilbel.backend.entity.view;

import lombok.Getter;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Immutable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Getter
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@Entity(name = "best_selling_products_view")
@Immutable
public class BestSellingProductEntity {

    @Id
    @Column(name = "id")
    String id;

    @Column(name = "name")
    String name;

    @Column(name = "total_purchases")
    Integer totalPurchases;
}
