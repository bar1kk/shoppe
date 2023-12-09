package dev.danilbel.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@Entity
@Table(name = "products")
public class ProductEntity {

    @Id
    @Column(name = "id")
    @Builder.Default
    String id = UUID.randomUUID().toString();

    @Column(name = "name", nullable = false, unique = true)
    String name;

    @ManyToOne
    @JoinColumn(name = "type_id")
    TypeEntity type;

    @Column(name = "price", nullable = false)
    Double price;

    @Column(name = "availability", nullable = false)
    Integer availability;

    @OneToOne
    @JoinColumn(name = "product_description_id")
    ProductDescriptionEntity productDescription;
}
