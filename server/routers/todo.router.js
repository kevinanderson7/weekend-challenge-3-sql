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

router.put('/:id', (req, res) => {
  const id = req.params.id;
  console.log(req.body);

  let taskStatusData = req.body;
  console.log('put req.body: ', taskStatusData.newTaskStatus);
  taskStatusData = taskStatusData.newTaskStatus;

  const queryText = `UPDATE "todo" SET "task_status" = $1 WHERE "id" = $2;`;

  pool
    .query(queryText, [taskStatusData, id])
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error on put route', error);
      res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const queryText = `DELETE FROM "todo" WHERE "id" = $1;`;

  pool
    .query(queryText, [id])
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error on delete', error);
      res.sendStatus(500);
    });
});

module.exports = router;
