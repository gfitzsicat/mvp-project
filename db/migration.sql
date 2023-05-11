DROP TABLE IF EXISTS aircraft;
-- DROP TABLE IF EXISTS aircraft_civ;


CREATE TABLE aircraft (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    call_name TEXT NOT NULL,
    first_flight DATE NOT NULL,
    status TEXT NOT NULL
);

-- CREATE TABLE aircraft_civ (
--     id SERIAL PRIMARY KEY,
--     name TEXT NOT NULL,
--     role TEXT NOT NULL,
--     call_name TEXT NOT NULL,
--     first_flight DATE NOT NULL,
--     status TEXT NOT NULL
-- );