BEGIN;

TRUNCATE
leaderboard,
gameinfo,
curveball,
impact;

INSERT INTO leaderboard (id, name, score)
VALUES
  (1, 'TMP', 7),
  (2, 'ABC', 21),
  (3, 'AAA', 2),
  (4, 'SAD', 13),
  (5, 'ASS', 4);

INSERT INTO gameinfo (id, health, boredom, toiletpaper, food)
VALUES
  (
    1,
    0,
    0,
    3,
    3
  );


INSERT INTO curveball (id, question, setting)
  VALUES 
    (1, 'Your sister just caught the Corona Virus and requested you to bring her your specialty cup noodle with a sprinkle of spam cubes on top. Do you want to fulfill this request?', 'home'),
    (2, 'A granny just slipped on the floor. Do you want to help her get back up?', 'market'),
    (3, 'You see the cashier coughing. Do you run home instead?', 'market'),
    (4, 'Ooh! Free cheese sample! Do you want to grab some?', 'market'),
    (5, 'Someone behind you wants to ask you where the cup noodle is at. Do you want to answer him?', 'market'),
    (6, 'Someone just rang the doorbell. Should you open the door?', 'home');

INSERT INTO impact (id, curveball_id, decision, health, boredom, toiletpaper, food)
  VALUES 
  (1, 1, 'yes', 15, -15, 0, 0),
  (2, 1, 'no', 0, 15, -1, 0),
  (3, 2, 'yes', 12, -10, 0, 1),
  (4, 2, 'no', 0, -5, 0, 0),
  (5, 3, 'yes', 0, 0, 0, 0),
  (6, 3, 'no', 10, 10, 2, 1),
  (7, 4, 'yes', 10, -10, 1, 0),
  (8, 4, 'no', 0, 5, 0, 0),
  (9, 5, 'yes', 10, -10, 0, 0),
  (10, 5, 'no', 0, 10, 0, 0),
  (11, 6, 'yes', 15, -10, 1, 0),
  (12, 6, 'no', -5, 15, 0, 0);

SELECT setval('leaderboard_id_seq', (SELECT MAX(id) from "leaderboard"));

COMMIT;