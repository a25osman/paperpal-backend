DROP TABLE IF EXISTS groceries CASCADE;

CREATE TABLE groceries (
  id SERIAL PRIMARY KEY,
  item VARCHAR(255),
  qty INTEGER DEFAULT 1,
  is_purchased BOOLEAN DEFAULT FALSE
);