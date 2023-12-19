CREATE TABLE payment_methods
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE delivery_options
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE orders
(
    id                  VARCHAR(36) PRIMARY KEY,
    status              VARCHAR(30)    NOT NULL,
    payment_method_id   INT            NOT NULL REFERENCES payment_methods (id) ON DELETE CASCADE,
    delivery_option_id  INT            NOT NULL REFERENCES delivery_options (id) ON DELETE CASCADE,
    total_price         DECIMAL(10, 2) NOT NULL,
    created_at          TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id             VARCHAR(36)    NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    shipping_address_id VARCHAR(36)    NOT NULL REFERENCES shipping_addresses (id) ON DELETE CASCADE
);

CREATE TABLE order_items
(
    id         SERIAL PRIMARY KEY,
    order_id   VARCHAR(36) NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
    product_id VARCHAR(36) NOT NULL REFERENCES products (id) ON DELETE CASCADE,
    quantity   INT         NOT NULL
);
