CREATE VIEW best_selling_products_view AS
SELECT p.id             AS id,
       p.name           AS name,
       SUM(oi.quantity) AS total_purchases
FROM products p
         JOIN order_items oi ON p.id = oi.product_id
         JOIN orders o ON o.id = oi.order_id AND EXTRACT(MONS FROM created_at) = EXTRACT(MONS FROM CURRENT_TIMESTAMP)
GROUP BY p.id
ORDER BY total_purchases DESC
LIMIT 6;