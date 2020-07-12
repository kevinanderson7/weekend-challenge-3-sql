const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "todo";`;

  pool
    .query(queryText)
    .then((dbResponse) => {
      res.send(dbResponse.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  const todoData = req.body;
  const queryText = `INSERT INTO "todo" ("task" )
                        VALUES ($1 );`;

  pool
    .query(queryText, [todoData.task])
    .then((dbResponse) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// router.put('/taskStatus', (req, res) => {
//     const taskStatus = req.params.task_status;
//     const taskStatusData = req.body;

//     const queryText = `UPDATE "todo" SET "task_status" = $1 WHERE "id" = $2;`;

//     pool.query(queryText, [
//       taskStatusData.task_status,
//       id
//     ])
//     .then((dbResponse) => {
//       res.sendStatus(200);
//     })
//     .catch((error) => {
//       console.log('error on put route', error);
//       res.sendStatus(500);
//     });
//   });

module.exports = router;
