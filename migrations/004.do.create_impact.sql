CREATE TABLE IF NOT EXISTS impact (
  id SERIAL PRIMARY KEY,
  curveball_id INTEGER REFERENCES curveball(id) NOT NULL,
  health INT,
  boredom INT,
  toiletpaper INT,
  food INT
);

CREATE TYPE decision_category AS ENUM (
  'yes',
  'no'
);

ALTER TABLE impact
    ADD COLUMN decision decision_category;