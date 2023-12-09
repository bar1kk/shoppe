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
import jakarta.persistence.Table;

import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@Entity
@Table(name = "additional_product_descriptions")
public class AdditionalProductDescriptionEntity {

    @Id
    @Column(name = "id")
    @Builder.Default
    String id = UUID.randomUUID().toString();

    @Column(name = "weight", nullable = false, unique = true)
    Double weight;

    @Column(name = "size", nullable = false, unique = true)
    String size;

    @ManyToOne
    @JoinColumn(name = "color_id")
    ColorEntity color;

    @ManyToOne
    @JoinColumn(name = "material_id")
    MaterialEntity material;
}
