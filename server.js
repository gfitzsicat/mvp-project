import pg from "pg";
import express from "express";
import dotenv from 'dotenv';



dotenv.config();

const server = express();
server.use(express.json());

const PORT = 4000;


//  Using PostgreSQL database and the pg.Pool class is used to manage a pool of client connections to the database.
const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});

server.use(express.static("public"));

//          Getting all the aircrafts from the database using db.query
server.get("/api/aircraft", (_, res) => {
    db.query("SELECT * FROM aircraft")
    .then((result) => {
      res.send(result.rows);
    });
});

//          Getting a specific aircraft by name from the database.
server.get("/api/aircraft/:name", (req, res) => {
    const name = req.params.name;
    if(!name) {
        res.sendStatus(422);
        return;
    }

    db.query("SELECT * FROM aircraft WHERE name = $1", [name])
    .then((result) => {
        if(result.rows.length === 0) {
            res.sendStatus(404);
          } else {
          res.send(result.rows[0]);
          };
    });
});

//          Posting a new aircraft to the database.
server.post("/api/aircraft/post", (req, res) => {

    const { name, role, call_name, first_flight, status} = req.body;
    // const aircraft = { name, role, call_name, first_flight, status};

    //  validation   (!name = undefined === name = undefined )
    if( !name ||
        !role ||
        !call_name ||
        !first_flight ||
        !status
      ) {
        res.sendStatus(422);
        return;
    }

    db.query("INSERT INTO aircraft (name, role, call_name, first_flight, status) VALUES ($1, $2, $3, $4, $5) RETURNING *", 
    [name, role, call_name, first_flight, status])
    .then((result) => {
        res.status(201).send(result.rows[0]);
     });
});

//          Deleting aircraft by specific ID from the database.
server.delete("/api/aircraft/delete/:name", (req, res) => {
    const name = req.params.name;
    if(!name) {
        res.sendStatus(422);
        return;
    }

    db.query("DELETE FROM aircraft WHERE name = $1 RETURNING *", [name])
    .then((result) => {
        if(result.rows.length === 0) {
            res.sendStatus(404);
        } else {
            res.send(result.rows[0]);
        }
    })
});





// //          Patch /or Update info of the aircraft to the database
// server.patch('/api/aircraft/patch', (req, res) => {
//     const { name, role, call_name, first_flight, status } = req.body;
    
//     // validation
//     if( !name && !role && !call_name && !first_flight && !status) {
//         res.sendStatus(422);
//         return;
//       }

//       db.query(`UPDATE aircraft SET 
//       name = COALESCE($1, name),
//       role = COALESCE($2, role),
//       call_name = COALESCE($3, call_name),
//       first_flight = COALESCE($4, first_flight),
//       status = COALESCE($5, status)
//       WHERE id = $6 RETURNING *`, [name, role, call_name, first_flight, status, id])
//       .then((result) => {
//         if (result.rows.length === 0) {
//             res.sendStatus(404);
//         } else {
//             res.send(result.rows[0]);
//         }
//       });
// });


server.patch('/api/aircraft/patch/:name', (req, res) => {
    // Retrieve request body and name from req.params
    const { name, role, call_name, first_flight, status } = req.body;
    const aircraftName = req.params.name;

    // Validation
    if (!name && !role && !call_name && !first_flight && !status) {
        res.sendStatus(422);
        return;
    }

    // Perform the database update based on aircraftName
    db.query(`UPDATE aircraft SET 
        name = COALESCE($1, name),
        role = COALESCE($2, role),
        call_name = COALESCE($3, call_name),
        first_flight = COALESCE($4, first_flight),
        status = COALESCE($5, status)
        WHERE name = $6 RETURNING *`,
        [name, role, call_name, first_flight, status, aircraftName])
        .then((result) => {
            if (result.rows.length === 0) {
                res.sendStatus(404);
            } else {
                res.send(result.rows[0]);
            }
        });
});


//          Listening to Port
server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});




// `UPDATE aircraft SET 
//       name = CASE WHEN $1 IS NULL THEN name ELSE $1 END,
//       role = CASE WHEN $2 IS NULL THEN role ELSE $2 END,
//       call_name = CASE WHEN $3 IS NULL THEN call_name ELSE $3 END
//       first_flight = CASE WHEN $4 IS NULL THEN first_flight ELSE $4 END),
//       status = CASE WHEN $5 IS NULL THEN status ELSE $5 END
//       WHERE id = $6 RETURNING *`