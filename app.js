const { nanoid } = require('nanoid');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const mockDb = {};
app.get('/user/:id', (req, res) => {
  const user = mockDb[req.params.id];
  if (user) {
    res.status(200).send(user);
  }
  res.status(404).send({});
});

app.post('/user', (req, res) => {
  const _id = nanoid(7); // currently using nanoid, but would use a seperate service for generating these ids
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

app.put('/user/:id', (req, res) => {
  const user = mockDb[req.params.id];

  if (!user) {
    res.status(404).send({});
  }
  const { firstName, lastName, dob, address, contact } = req.body;
  const { _id } = user;

  const userUpdates = {
    _id,
    firstName,
    lastName,
    dob,
    address,
    contact,
  };

  mockDb[_id] = userUpdates;

  res.status(200).send(mockDb[_id]);
});

app.delete('/user/:id', (req, res) => {
  const user = mockDb[req.params.id];
  if (!user) {
    res.status(404).send({});
  }
  delete mockDb[req.params.id];
  res.status(200).send('OK');
});

module.exports = app;
