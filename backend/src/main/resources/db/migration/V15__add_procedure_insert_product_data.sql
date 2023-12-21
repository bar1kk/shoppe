CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE PROCEDURE insert_product_data(
    product_name_param VARCHAR(255),
    type_id_param INT,
    price_param DECIMAL(10, 2),
    availability_param INT,
    description_param VARCHAR(255),
    weight_param DECIMAL(10, 2),
    size_param VARCHAR(20),
    color_id_param INT,
    material_id_param INT,
    image_paths_param VARCHAR(255)[]
) AS
$$
DECLARE
    additional_desc_uuid UUID;
    product_desc_uuid    UUID;
    product_uuid         UUID;
    image_path           TEXT;
BEGIN
    INSERT INTO additional_product_descriptions (id, weight, size, color_id, material_id)
    VALUES (uuid_generate_v4(), weight_param, size_param, color_id_param, material_id_param)
    RETURNING id INTO additional_desc_uuid;

    INSERT INTO product_descriptions (id, description, additional_product_description_id)
    VALUES (uuid_generate_v4(), description_param, additional_desc_uuid)
    RETURNING id INTO product_desc_uuid;

    INSERT INTO products (id, name, type_id, price, availability, product_description_id)
    VALUES (uuid_generate_v4(), product_name_param, type_id_param, price_param, availability_param, product_desc_uuid)
    RETURNING id INTO product_uuid;

    FOREACH image_path IN ARRAY image_paths_param
        LOOP
            INSERT INTO images (path, product_id)
            VALUES (image_path, product_uuid);
        END LOOP;
END;
$$ LANGUAGE plpgsql;
