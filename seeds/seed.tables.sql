BEGIN;

TRUNCATE
"leaderboard",
"gameinfo";

INSERT INTO "leaderboard" ("id", "name", "score")
VALUES
  (1, 'TMP', 7),
  (2, 'ABC', 21),
  (3, 'AAA', 2),
  (4, 'SAD', 13),
  (5, 'ASS', 4);
INSERT INTO "gameinfo" ("id", "health", "boredom", "toiletpaper","food")
VALUES
  (
    1,
    100,
    100,
    3,
    3
  );

SELECT setval('leaderboard_id_seq', (SELECT MAX(id) from "leaderboard"));


COMMIT;