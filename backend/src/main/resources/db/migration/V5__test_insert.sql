INSERT INTO colors (name)
VALUES ('Black'),
       ('White'),
       ('Brown');

INSERT INTO materials (name)
VALUES ('Gold'),
       ('Silver'),
       ('Platinum');

INSERT INTO additional_product_descriptions (id, weight, size, color_id, material_id)
VALUES ('9e7ed9ad-d0d1-44e3-9779-310815671639', 1.1, '22 mm', 1, 1),
       ('d33c3ef1-280f-4056-9630-30b82dbcb1cf', 1.5, '24 mm', 2, 2),
       ('261ec63e-2fc5-4540-88df-c82c8fc0edd6', 1.0, '19 mm', 3, 3),
       ('175ac5b1-515f-4fa8-90f3-30163d9cb223', 2.2, '20 mm', 1, 2),
       ('20ad0678-4cae-420b-bb6d-cfb7a404ae35', 1.7, '23 mm', 3, 3),
       ('fec23f6e-75b3-4136-ae5a-4bca60a3d0a0', 1.9, '24 mm', 2, 3);

INSERT INTO product_descriptions (id, description, additional_product_description_id)
VALUES ('6ad6a839-21ab-444d-a86f-0a6bc66f55b9', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat.', '9e7ed9ad-d0d1-44e3-9779-310815671639'),
       ('73a8a3ac-1397-4b75-8edc-8dc0478b90eb', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat.', 'd33c3ef1-280f-4056-9630-30b82dbcb1cf'),
       ('4494a9a0-6a68-4959-ad2f-0e6779d27fdd', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat.', '261ec63e-2fc5-4540-88df-c82c8fc0edd6'),
       ('f7aa5872-18a0-489f-9bf4-9bee34eec87b', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat.', '175ac5b1-515f-4fa8-90f3-30163d9cb223'),
       ('f26e3e3a-f8a4-43b7-b06b-f78ce9850c0e', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat.', '20ad0678-4cae-420b-bb6d-cfb7a404ae35'),
       ('f17024d7-228c-4f6b-9ecc-5643835f8824', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat.', 'fec23f6e-75b3-4136-ae5a-4bca60a3d0a0');

INSERT INTO types (name)
VALUES ('Earrings'),
       ('Hairpin'),
       ('Necklace');

INSERT INTO products (id, name, type_id, price, availability, product_description_id)
VALUES ('b892b6fa-d2cb-4a15-afbe-c96e6b5f9240', 'Lira Earrings', 1, 23.00, 10, '6ad6a839-21ab-444d-a86f-0a6bc66f55b9'),
       ('abca2987-794a-4635-8656-5b229833ca7e', 'Kaede Hair Pin Set Of 3', 2, 34.45, 0, '73a8a3ac-1397-4b75-8edc-8dc0478b90eb'),
       ('3ec6f386-b25b-42bc-8196-53663319bc15', 'Hal Earrings', 2, 20.00, 30, '4494a9a0-6a68-4959-ad2f-0e6779d27fdd'),
       ('0cae5285-2a27-48ad-beb3-655251d8d0e9', 'Yuki Hair Pin Set of 3', 1, 19.98, 0, 'f7aa5872-18a0-489f-9bf4-9bee34eec87b'),
       ('12849268-6170-4399-9300-8a75aaee84ce', 'Plaine Necklace', 2, 15.00, 50, 'f26e3e3a-f8a4-43b7-b06b-f78ce9850c0e'),
       ('3b53a366-191d-45a4-ae75-dea9f36e7714', 'Hair Pin Set of 3', 3, 40.00, 3, 'f17024d7-228c-4f6b-9ecc-5643835f8824');