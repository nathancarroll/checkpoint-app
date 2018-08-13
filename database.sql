CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL
);

CREATE TABLE "race" (
	"id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) UNIQUE NOT NULL,
	"start_time" TIMESTAMP,
	"creator" INTEGER REFERENCES person(id)
);

CREATE TABLE "checkpoint" (
	"id" SERIAL PRIMARY KEY,
	"latitude" REAL NOT NULL,
	"longitude" REAL NOT NULL,
	"name" VARCHAR (32) UNIQUE NOT NULL,
	"description" TEXT,
	"race_id" INTEGER REFERENCES race(id)
);

CREATE TABLE "person_race" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER REFERENCES person(id),
	"race_id" INTEGER REFERENCES race(id)
);

CREATE TABLE "person_checkpoint" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER REFERENCES person(id),
	"checkpoint_id" INTEGER REFERENCES checkpoint(id),
	"timestamp" TIMESTAMP DEFAULT NOW()
);

-- Add some dummy users, races, and checkpoints.

INSERT INTO person (username, password) 
VALUES ('nate', '123'),('bj', '123'),('tyler', '123'),('dane', '123'),('casey', '123'),('isaac', '123');

INSERT INTO race (name, start_time, creator)
VALUES ('first_race', NOW(), 4),('second_race', NOW() + TIME('03:00'), 1);

INSERT INTO person_race (user_id, race_id)
VALUES (1, 1), (2, 1), (3, 1), (6, 1), (2, 2), (4, 2), (5, 2);

INSERT INTO checkpoint (latitude, longitude, name, description, race_id)
VALUES 
(44.978133, -93.256087, 'The Guthrie', 'Run inside and grab a playbill from the lobby', 1),
(45.007385, -93.272435, 'Psycho Suzie''s Motor Lounge', 'Have a drink!', 1),
(44.927984, -93.307983, 'Lake Harriet Bandshell', 'Run up on the stage', 1),
(44.982505, -93.154329, 'Como Zoo', 'Take a picture of an animal', 2),
(44.976547, -93.241133, 'Bohemian Flats', 'Stick your hand in the river', 2);





