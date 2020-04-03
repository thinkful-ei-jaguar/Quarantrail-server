BEGIN;

TRUNCATE
leaderboard,
gameinfo,
curveball,
impact,
memes;

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
    (3, 'You see the cashier coughing. Do you still want to buy?', 'market'),
    (4, 'Ooh! Free cheese sample! Do you want to grab some?', 'market'),
    (5, 'Someone behind you wants to ask you where the cup noodle is at. Do you want to answer him?', 'market'),
    (6, 'Someone just rang the doorbell. Should you open the door?', 'home'),
    (7, 'A child is running towards you. Do you still want to take a walk around the park?', 'park'),
    (8, 'You see a cute stubby Corgi walking by. Do you want to pet him?', 'park'),
    (9, 'Someone wants you to help him take a quick picture using his Cannon camera. Do you want to help?', 'park');

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
  (12, 6, 'no', -5, 15, 0, 0),
  (13, 7, 'yes', 10, -15, 0, 0),
  (14, 7, 'no', 5, -20, 0, 0),
  (15, 8, 'yes', 5, -15, 0, 0),
  (16, 8, 'no', -5, -5, 0, 0),
  (17, 9, 'yes', 15, -15, 0, 1),
  (18, 9, 'no', 10, 10, 0, 0);
  
SELECT setval('leaderboard_id_seq', (SELECT MAX(id) from "leaderboard"));

INSERT INTO memes (urls)
  VALUES
  ('data:image/jpeg;base64,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'),
  ('https://www.irishtimes.com/polopoly_fs/1.3895650.1558115006!/image/image.jpg_gen/derivatives/ratio_1x1_w1200/image.jpg'),
  ('https://preview.redd.it/ml76ootetfd41.jpg?width=960&crop=smart&auto=webp&s=f228791ed5c3167b52c5f2a6b463a6bd4b1f3b36'),
  ('https://preview.redd.it/8ozi75adziq41.jpg?width=640&crop=smart&auto=webp&s=46acb0d604ae88c79bbeca2b81abb92310058707'),
  ('https://preview.redd.it/n79bfs4o4hq41.jpg?width=960&crop=smart&auto=webp&s=0f6b543cea652118736ac255ec42397536da7211'),
  ('https://preview.redd.it/xeonx90eyhq41.jpg?width=640&crop=smart&auto=webp&s=73f1c18a22cac2155f165426855e456e16b0b5af'),
  ('https://preview.redd.it/mj6vi2xo6iq41.jpg?width=960&crop=smart&auto=webp&s=cc904d6fd0c7683e80d554fc378a2d1ed598f245'),
  ('https://i.redd.it/9avikxslwgq41.jpg'),
  ('https://steamuserimages-a.akamaihd.net/ugc/923668865532000780/B108646C60A44477F2E3CB7EACCE32BF7721CD82/'),
  ('https://quotetheanime.com/wp-content/uploads/2019/11/Anime-Meme.-Demon-slayer-FUNNY-Kimetsu-no-yaiba-has-great-characters.jpg'),
  ('https://preview.redd.it/yqf9sxcpveq41.jpg?width=640&crop=smart&auto=webp&s=f64f7ac3c8b92cc0e01edc66bcf36cbf5c1f91db'),
  ('https://preview.redd.it/gm0sc5uzvvp41.jpg?width=640&height=641&crop=smart&auto=webp&s=615c4e80b5b28efccb0175d29589e84be96b7270'),
  ('https://preview.redd.it/mueg4irhegq41.png?width=640&height=596&crop=smart&auto=webp&s=ef7f92e2e73eafc2cc22686ca32fea3e83e7e0e4'),
  ('https://preview.redd.it/lxqc9y0c7xp41.jpg?width=640&height=768&crop=smart&auto=webp&s=2db0fe8be3dca89726b4815153055db49600787d'),
  ('https://preview.redd.it/jlwuqapkvzp41.jpg?width=640&height=520&crop=smart&auto=webp&s=4e74b5d9abd6a13e377788c179b217e9e9e2ca74'),
  ('https://preview.redd.it/tk92ffhe9iq41.jpg?width=640&crop=smart&auto=webp&s=e11056b82b076f0d6b8719d4e91f74107192184b'),
  ('https://preview.redd.it/rjhu5fu81hq41.jpg?width=640&crop=smart&auto=webp&s=fb085a2bbe150fcee6ea69420068f327ada0aa90'),
  ('https://preview.redd.it/tj23fg2izbq41.jpg?width=640&crop=smart&auto=webp&s=55190a0056bef99d1cad00e2a43b8dfa76f42382'),
  ('https://preview.redd.it/nn4dqtvs7kq41.jpg?width=640&crop=smart&auto=webp&s=d2c4c2a3d834c4b5724dd14317238551eab5b5d4'),
  ('https://i.redd.it/jyeqe9a35kq41.jpg');

COMMIT;