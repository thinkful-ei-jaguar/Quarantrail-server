CREATE TABLE IF NOT EXISTS curveball (
    id SERIAL PRIMARY KEY,
    question TEXT
);

CREATE TYPE location_category AS ENUM (
  'home',
  'market'
);

ALTER TABLE curveball
    ADD COLUMN setting location_category;