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
@Table(name = "product_descriptions")
public class ProductDescriptionEntity {

    @Id
    @Column(name = "id")
    @Builder.Default
    String id = UUID.randomUUID().toString();

    @Column(name = "description", nullable = false)
    String description;

    @OneToOne
    @JoinColumn(name = "additional_product_description_id")
    AdditionalProductDescriptionEntity additionalProductDescription;
}
