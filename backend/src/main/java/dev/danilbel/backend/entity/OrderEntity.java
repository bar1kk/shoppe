package dev.danilbel.backend.entity;

import dev.danilbel.backend.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@Entity
@Table(name = "orders")
public class OrderEntity {

    @Id
    @Column(name = "id")
    @Builder.Default
    String id = UUID.randomUUID().toString();

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    OrderStatus status = OrderStatus.PROCESSING;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "payment_method_id", nullable = false)
    PaymentMethodEntity paymentMethod;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "delivery_option_id", nullable = false)
    DeliveryOptionEntity deliveryOption;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id", nullable = false)
    List<OrderItemEntity> orderItems;

    @Column(name = "total_price", nullable = false)
    Double totalPrice;

    @Column(name = "created_at", nullable = false)
    @Builder.Default
    LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    @Builder.Default
    LocalDateTime updatedAt = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    UserEntity user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "shipping_address_id", nullable = false)
    ShippingAddressEntity shippingAddress;
}
