CREATE TABLE reviews
(
    id          VARCHAR(36) PRIMARY KEY,
    rating      INT         NOT NULL,
    description TEXT        NOT NULL,
    created_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    product_id  VARCHAR(36) NOT NULL REFERENCES products (id) ON DELETE CASCADE,
    user_id     VARCHAR(36) NOT NULL REFERENCES users (id) ON DELETE CASCADE
)