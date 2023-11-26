INSERT INTO roles (name)
VALUES ('ROLE_SUPER_ADMIN');

-- password: 123 (encoded: C9OWwH4l1zRPGOuUdvAiVuz5hYW2gMpjOdggog8dsqA=)
INSERT INTO users (id, email, password)
VALUES ('5f280feb-5672-9023-86ce-0097a55b00ba', 'super.admin@ex.com', 'C9OWwH4l1zRPGOuUdvAiVuz5hYW2gMpjOdggog8dsqA=');

INSERT INTO users_roles (user_id, role_id)
VALUES ('5f280feb-5672-9023-86ce-0097a55b00ba', 1),
       ('5f280feb-5672-9023-86ce-0097a55b00ba', 2),
       ('5f280feb-5672-9023-86ce-0097a55b00ba', 3);