CREATE TABLE colors
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE materials
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE additional_product_descriptions
(
    id          VARCHAR(36) PRIMARY KEY,
    weight      DECIMAL(10, 2) NOT NULL,
    size        VARCHAR(20)    NOT NULL,
    color_id    INT REFERENCES colors (id) ON DELETE CASCADE,
    material_id INT REFERENCES materials (id) ON DELETE CASCADE
);

CREATE TABLE product_descriptions
(
    id                                VARCHAR(36) PRIMARY KEY,
    description                       VARCHAR(255) NOT NULL,
    additional_product_description_id VARCHAR(36) REFERENCES additional_product_descriptions (id) ON DELETE CASCADE
);

CREATE TABLE types
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE products
(
    id                     VARCHAR(36) PRIMARY KEY,
    name                   VARCHAR(255) UNIQUE NOT NULL,
    type_id                INT REFERENCES types (id) ON DELETE CASCADE,
    price                  DECIMAL(10, 2)      NOT NULL,
    availability           INT                 NOT NULL,
    product_description_id VARCHAR(36) REFERENCES product_descriptions (id) ON DELETE CASCADE
);

