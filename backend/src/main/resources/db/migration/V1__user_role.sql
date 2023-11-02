CREATE TABLE users
(
    id           VARCHAR(36) PRIMARY KEY,
    email        VARCHAR(255) NOT NULL UNIQUE,
    password     VARCHAR(255) NOT NULL,
    first_name   VARCHAR(30),
    last_name    VARCHAR(30),
    phone_number VARCHAR(15),
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roles
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE users_roles
(
    user_id VARCHAR(36) REFERENCES users (id) ON DELETE CASCADE,
    role_id INT REFERENCES roles (id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

INSERT INTO roles (name)
VALUES ('ROLE_USER'),
       ('ROLE_ADMIN');

-- password: 123 (encoded: C9OWwH4l1zRPGOuUdvAiVuz5hYW2gMpjOdggog8dsqA=)
INSERT INTO users (id, email, password)
VALUES ('5f280fcb-7390-4724-86ce-0097a22b67ba', 'user@ex.com', 'C9OWwH4l1zRPGOuUdvAiVuz5hYW2gMpjOdggog8dsqA='),
       ('986d1f77-0e89-4119-916b-2a41069cbf16', 'admin@ex.com', 'C9OWwH4l1zRPGOuUdvAiVuz5hYW2gMpjOdggog8dsqA=');

INSERT INTO users_roles (user_id, role_id)
VALUES ('5f280fcb-7390-4724-86ce-0097a22b67ba', 1),
       ('986d1f77-0e89-4119-916b-2a41069cbf16', 1),
       ('986d1f77-0e89-4119-916b-2a41069cbf16', 2);