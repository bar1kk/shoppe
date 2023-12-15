CREATE TABLE shipping_addresses
(
    id           VARCHAR(36) PRIMARY KEY,
    first_name   VARCHAR(30) NOT NULL,
    last_name    VARCHAR(30) NOT NULL,
    country      VARCHAR(30) NOT NULL,
    city         VARCHAR(30) NOT NULL,
    street       VARCHAR(30) NOT NULL,
    apartment    VARCHAR(30),
    zip_code     VARCHAR(30) NOT NULL,
    phone_number VARCHAR(30) NOT NULL,
    email        VARCHAR(30) NOT NULL,
    user_id      VARCHAR(36) NOT NULL REFERENCES users (id) ON DELETE CASCADE
);