DROP DATABASE IF EXISTS games_dev;

CREATE DATABASE games_dev;

\c games_dev;

DROP TABLE IF EXISTS games;

CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    release_date DATE,
    developer TEXT,
    publisher TEXT,
    country VARCHAR(50),
    platform TEXT,
    genre TEXT,
    player_count INT DEFAULT 1,
    art TEXT DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg',
    description TEXT DEFAULT 'no description available.'
);