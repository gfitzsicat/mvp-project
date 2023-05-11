import pg from "pg";
import express from "express";

const server = express();
server.use(express.json());

const PORT = 4000;

//  Using PostgreSQL database and the pg.Pool class is used to manage a pool of client connections to the database.
const db = new pg.Pool({
    database: "Aircraft",
});

//          Getting all the aircrafts from the database using db.query
server.get("/aircraft", (req, res) => {
    db.query("SELECT * FROM aircraft")
    .then((result) => {
      res.send(result.rows);
    });
});

//          Getting a specific aircraft by ID from the database.
server.get("/aircraft/:id", (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        res.sendStatus(422);
        return;
    }

    db.query("SELECT * FROM aircraft WHERE id = $1", [id])
    .then((result) => {
        if(result.rows.length === 0) {
            res.sendStatus(404);
          } else {
          res.send(result.rows[0]);
          };
    });
});

//          Posting a new aircraft to the database.
server.post("/aircraft", (req, res) => {

    const { name, role, call_name, first_flight, status} = req.body;
    const aircraft = { name, role, call_name, first_flight, status};

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
server.delete("/aircraft/:id", (req, res) => {
    const id = Number(req.params.id);
    if(isNaN(id)) {
        res.sendStatus(422);
        return
    }

    db.query("DELETE FROM aircraft WHERE ID = $1 RETURNING *", [id])
    .then((result) => {
        if(result.rows.length === 0) {
            res.sendStatus(404);
        } else {
            res.send(result.rows[0]);
        }
    })
});

//          Patch /or Update info of the aircraft to the database
server.patch('/aircraft/:id', (req, res) => {
    const id = Number(req.params.id);
    const { name, role, call_name, first_flight, status } = req.body;
    
    // validation
    if(  Number.isNaN(id)|| ( !name && !role && !call_name && !first_flight && !status)) {
        res.sendStatus(422);
        return;
      }

      db.query(`UPDATE aircraft SET 
      name = COALESCE($1, name),
      role = COALESCE($2, role),
      call_name = COALESCE($3, call_name),
      first_flight = COALESCE($4, first_flight),
      status = COALESCE($5, status)
      WHERE id = $6 RETURNING *`, [name, role, call_name, first_flight, status, id])
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