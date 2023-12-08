-- Active: 1701687883633@@127.0.0.1@5432@moviehubtietokanta@public
CREATE TYPE pronouns_type AS ENUM ('She', 'He', 'They','Empty');

CREATE TABLE users(  
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    firstname TEXT,
    secondname TEXT,
    username TEXT,
    password TEXT,
    email TEXT,
    pronouns pronouns_type
);