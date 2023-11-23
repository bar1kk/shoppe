-- Добавить поле статуса в таблицу users
ALTER TABLE users
    ADD COLUMN status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE';