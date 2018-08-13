CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL
);

CREATE TABLE "checkpoint" (
	"id" SERIAL PRIMARY KEY,
	"latitude" REAL NOT NULL,
	"longitude" REAL NOT NULL,
	"name" VARCHAR (32) UNIQUE NOT NULL,
	"description" TEXT,
	"race_id" INTEGER REFERENCES race(id)
);

CREATE TABLE "race" (
	"id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) UNIQUE NOT NULL,
	"start_time" TIMESTAMP,
	"creator" INTEGER REFERENCES person(id)
);

CREATE TABLE "person_checkpoint" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER REFERENCES person(id),
	"checkpoint_id" INTEGER REFERENCES checkpoint(id)
	"timestamp" TIMESTAMP DEFAULT NOW()
);



