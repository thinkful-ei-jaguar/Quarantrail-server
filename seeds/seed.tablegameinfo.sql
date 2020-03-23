BEGIN;

TRUNCATE
  "gameinfo";

INSERT INTO "gameinfo" ("id", "health", "boredom", "toiletpaper","food")
VALUES
  (
    1,
    '100',
    '100',
    '3',
    '3'
  );

