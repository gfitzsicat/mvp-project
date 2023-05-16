DROP TABLE IF EXISTS aircraft;
-- DROP TABLE IF EXISTS aircraft_civ;


CREATE TABLE aircraft (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    call_name TEXT NOT NULL,
    first_flight DATE NOT NULL,
    status TEXT NOT NULL,
    image VARCHAR
);

-- CREATE TABLE aircraft_civ (
--     id SERIAL PRIMARY KEY,
--     name TEXT NOT NULL,
--     role TEXT NOT NULL,s
--     call_name TEXT NOT NULL,
--     first_flight DATE NOT NULL,
--     status TEXT NOT NULL
-- );

-- /acPhoto/F-16


INSERT INTO aircraft (name, role, call_name, first_flight, status, image) 
VALUES ('F-16', 'Multirole Fighter', 'Viper', '2 February 1974', 'Active', '/acPhoto/F-16.jpeg');
INSERT INTO aircraft (name, role, call_name, first_flight, status, image) 
VALUES ('F-15', 'Air Superiority Fighter', 'Eagle', '27 July 1972', 'Active', '/acPhoto/F-15.jpeg');
INSERT INTO aircraft (name, role, call_name, first_flight, status, image) 
VALUES ('F/A-18', 'Carrier-based Multirole Fighter', 'Super Hornet', '29 November 1995', 'Active', '/acPhoto/F-18.jpeg');
INSERT INTO aircraft (name, role, call_name, first_flight, status, image) 
VALUES ('B-2', 'Stealth Strategic Bomber', 'Spirit', '17 July 1989', 'Active', '/acPhoto/B-2.jpeg');
INSERT INTO aircraft (name, role, call_name, first_flight, status, image) 
VALUES ('AH-64', 'Attack Helicopter', 'Apache', '30 September 1975', 'Active', '/acPhoto/AH-64.jpeg');
INSERT INTO aircraft (name, role, call_name, first_flight, status, image) 
VALUES ('C-17', 'Strategic Airlifter', 'Globemaster III', '15 September 1991', 'Active', '/acPhoto/C-17.jpeg');
INSERT INTO aircraft (name, role, call_name, first_flight, status, image) 
VALUES ('P-8', 'Maritime Patrol Aircraft', 'Poseidon', '25 April 2009', 'Active', '/acPhoto/P-8.jpeg');
INSERT INTO aircraft (name, role, call_name, first_flight, status, image) 
VALUES ('E-3', 'Airborne Warning and Control System (AWACS) Aircraft', 'Sentry', '6 November 1975', 'Active', '/acPhoto/E-3.jpeg');
INSERT INTO aircraft (name, role, call_name, first_flight, status, image) 
VALUES ('UH-60', 'Utility Helicopter', 'Black Hawk', '17 October 1974', 'Active', '/acPhoto/UH-60.jpeg');
INSERT INTO aircraft (name, role, call_name, first_flight, status, image) 
VALUES ('C-5M', 'Strategic Airlifter', 'Super Galaxy', '30 June 1968', 'Active', '/acPhoto/C-5M.jpeg');
INSERT INTO aircraft (name, role, call_name, first_flight, status, image) 
VALUES ('V-22', 'Tiltrotor Military Aircraft', 'Osprey', '19 March 1989', 'Active', '/acPhoto/V-22.jpeg');
INSERT INTO aircraft (name, role, call_name, first_flight, status, image) 
VALUES ('MQ-9', 'Unmanned Combat Aerial Vehicle (UCAV)', 'Reaper', '2 February 2001', 'Active', '/acPhoto/MQ-9.jpeg');
INSERT INTO aircraft (name, role, call_name, first_flight, status, image) 
VALUES ('KC-135', 'Aerial Refueling Aircraft', 'Stratotanker', '31 August 1956', 'Active', '/acPhoto/KC-135.jpeg');
INSERT INTO aircraft (name, role, call_name, first_flight, status, image) 
VALUES ('F-35B', 'Vertical Takeoff and Landing (VTOL) Fighter', 'Lightning II', '31 August 2006', 'Active', '/acPhoto/F-35B.jpeg');
INSERT INTO aircraft (name, role, call_name, first_flight, status, image) 
VALUES ('F-14', 'Carrier-based Interceptor/Fighter', 'Tomcat', '21 December 1970', 'Retired', '/acPhoto/F-14.jpeg');



-- INSERT INTO aircraft_civ (name, role, call_name, first_flight, status)
-- VALUES
-- ('Airbus A380', 'Wide-body airliner', 'Superjumbo', 'April 27, 2005', 'Active'),
-- ('Boeing 737', 'Narrow-body airliner', '737', 'April 9, 1967', 'Active'),
-- ('Embraer E190', 'Regional jet', 'E190', 'March 12, 2004', 'Active'),
-- ('Cessna Citation X', 'Business jet', 'Citation X', 'December 21, 1993', 'Active'),
-- ('Beechcraft King Air 350', 'Twin-engine turboprop', 'King Air 350', 'October 27, 1988', 'Active'),
-- ('Airbus A330', 'Wide-body airliner', 'A330', 'November 2, 1992', 'Active'),
-- ('Bombardier Global 7500', 'Business jet', 'Global 7500', 'November 4, 2016', 'Active'),
-- ('Embraer Phenom 300', 'Business jet', 'Phenom 300', 'April 29, 2008', 'Active'),
-- ('Daher TBM 930', 'Single-engine turboprop', 'TBM 930', 'July 1, 2014', 'Active'),
-- ('Pilatus PC-12', 'Single-engine turboprop', 'PC-12', 'May 31, 1991', 'Active');
-- ('Boeing 747', 'Wide-body airliner', 'Jumbo Jet', 'February 9, 1969', 'Active'),
-- ('Airbus A320', 'Narrow-body airliner', 'A320', 'February 22, 1987', 'Active'),
-- ('Bombardier Challenger 350', 'Business jet', 'Challenger 350', 'March 22, 2013', 'Active'),
-- ('Cessna 172', 'General aviation', 'Skyhawk', 'June 12, 1955', 'Active'),
-- ('Gulfstream G650', 'Business jet', 'G650', 'November 25, 2009', 'Active');