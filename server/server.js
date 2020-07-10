const express = require('express');
const bodyParser = require('body-parser');
const todoRouter = require('./routers/todo.router');

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('server/public'));

app.use('/todo', todoRouter);

app.listen(PORT, () => {
  console.log('up and running on port', PORT);
});
