
CREATE database triv_db WITH encoding 'utf8';

DROP TABLE IF EXISTS clue;
DROP TABLE IF EXISTS category;

CREATE TABLE category (
    category_id serial primary key,
    category_name varchar(255) NOT NULL
);

CREATE TABLE clue (
    clue_id serial primary key,
    category_id serial references category(category_id),
    question varchar(355) NOT NULL,
    answer varchar(355) NOT NULL
);