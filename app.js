const { nanoid } = require('nanoid');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const mockDb = {};
app.get('/user/:id', (req, res) => {
  // res.send(commentsByPostId[req.params.id] || []);
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
  res.status(200).send({
    _id: 'KFG-734',
    firstName: 'John',
    lastName: 'Doe',
    dob: '23/12/1989',
    address: {
      doorNumber: 1,
      line1: 'new road',
      line2: null,
      postCode: 'NE7 3BF',
    },
    contact: {
      country: 'GB',
      areaCode: '+44',
      number: '7121450602',
    },
  })
})

module.exports = app;
