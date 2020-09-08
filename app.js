const { nanoid } = require('nanoid');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const mockDb = {};
app.get('/user/:id', (req, res) => {
  res.status(404).send({});
});

app.post('/user', (req, res) => {
  const _id = nanoid(7);
  const { firstName, lastName, dob, address, contact } = req.body;

  const user = {
    _id,
    firstName,
    lastName,
    dob,
    address,
    contact,
  };

  mockDb[_id] = user;

  res.status(200).send(user);
});

module.exports = app;
