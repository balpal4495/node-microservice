const request = require('supertest');
const { nanoid } = require('nanoid');
const app = require('./app');

jest.mock('nanoid');
describe(':app tests', () => {
  describe(':get', () => {
    it('Should add not get data for an id that does not exist', async (done) => {
      const expectedUserData = {
        _id: 'KFG-731',
        firstName: 'John',
        lastName: 'Doe',
        dob: '23/12/1989',
        address: {
          doorNumber: 1,
          line1: 'something road',
          line2: null,
          town: 'London',
          county: 'London',
          postCode: 'NE7 3BF',
        },
        contact: {
          country: 'GB',
          areaCode: '+44',
          number: '7121450602',
        },
      };

      const res = await request(app).get('/user/KFG-731');
      expect(res.statusCode).not.toEqual(200);
      done();
    });
    it('Should get data for an id that does exist', async (done) => {
      const anonymousId = 'KFG-734';
      const expectedUserData = {
        _id: anonymousId,
        firstName: 'John',
        lastName: 'Doe',
        dob: '23/12/1989',
        address: {
          doorNumber: 1,
          line1: 'something road',
          line2: null,
          town: 'London',
          county: 'London',
          postCode: 'NE7 3BF',
        },
        contact: {
          country: 'GB',
          areaCode: '+44',
          number: '7121450602',
        },
      };
      nanoid.mockImplementation(() => anonymousId);
      // set up
      await request(app)
        .post('/user')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          dob: '23/12/1989',
          address: {
            doorNumber: 1,
            line1: 'something road',
            line2: null,
            town: 'London',
            county: 'London',
            postCode: 'NE7 3BF',
          },
          contact: {
            country: 'GB',
            areaCode: '+44',
            number: '7121450602',
          },
        });

      const res = await request(app).get('/user/KFG-734');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(expectedUserData);
      done();
    });
  });

  describe(':create', () => {
    it('Should create a new user', async (done) => {
      const expectedUserData = {
        _id: 'KFG-2222',
        firstName: 'John',
        lastName: 'Doe',
        dob: '23/12/1989',
        address: {
          doorNumber: 1,
          line1: 'something road',
          line2: null,
          town: 'London',
          county: 'London',
          postCode: 'NE7 3BF',
        },
        contact: {
          country: 'GB',
          areaCode: '+44',
          number: '7121450622',
        },
      };

      const anonymousId = 'KFG-2222';
      nanoid.mockImplementation(() => anonymousId);

      const res = await request(app)
        .post('/user')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          dob: '23/12/1989',
          address: {
            doorNumber: 1,
            line1: 'something road',
            line2: null,
            town: 'London',
            county: 'London',
            postCode: 'NE7 3BF',
          },
          contact: {
            country: 'GB',
            areaCode: '+44',
            number: '7121450622',
          },
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(expectedUserData);

      done();
    });

    it(':Should not create a user if a matching mobile exists', async (done) => {

      const anonymousId = 'KFG-734';
      nanoid.mockImplementation(() => anonymousId);
      await request(app)
        .post('/user')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          dob: '23/12/1989',
          address: {
            doorNumber: 1,
            line1: 'something road',
            line2: null,
            town: 'London',
            county: 'London',
            postCode: 'NE7 3BF',
          },
          contact: {
            country: 'GB',
            areaCode: '+44',
            number: '7121450602',
          },
        });


        const anonymousId2 = 'KFG-735';
        nanoid.mockImplementation(() => anonymousId2);
  
        const res = await request(app)
          .post('/user')
          .send({
            firstName: 'John',
            lastName: 'Doe',
            dob: '23/12/1989',
            address: {
              doorNumber: 1,
              line1: 'something road',
              line2: null,
              town: 'London',
              county: 'London',
              postCode: 'NE7 3BF',
            },
            contact: {
              country: 'GB',
              areaCode: '+44',
              number: '7121450602',
            },
          });
  
        expect(res.statusCode).toEqual(400);
        done();

    })
  });

  describe(':update', () => {
    it('Should not update a user that does not exist', async (done) => {
      const anonymousId = 'KFG-734';
      nanoid.mockImplementation(() => anonymousId);
      // set up
      await request(app)
        .post('/user')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          dob: '23/12/1989',
          address: {
            doorNumber: 1,
            line1: 'something road',
            line2: null,
            town: 'London',
            county: 'London',
            postCode: 'NE7 3BF',
          },
          contact: {
            country: 'GB',
            areaCode: '+44',
            number: '7121450602',
          },
        });

      const res = await request(app)
        .put('/user/KFG-missing')
        .send({
          firstName: 'John',
          lastName: 'Doh',
          dob: '23/12/1989',
          address: {
            doorNumber: 1,
            line1: 'something road',
            line2: 'another new line',
            town: 'London',
            county: 'London',
            postCode: 'NE7 3BF',
          },
          contact: {
            country: 'GB',
            areaCode: '+44',
            number: '7121450603',
          },
        });

      expect(res.statusCode).toEqual(404);
      done();
    });

    it('Should not update a user if another mobile number already exists', async (done) => {
      const anonymousId = 'KFG-777';
      nanoid.mockImplementation(() => anonymousId);
      await request(app)
        .post('/user')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          dob: '23/12/1989',
          address: {
            doorNumber: 1,
            line1: 'something road',
            line2: null,
            town: 'London',
            county: 'London',
            postCode: 'NE7 3BF',
          },
          contact: {
            country: 'GB',
            areaCode: '+44',
            number: '7121450677',
          },
        });
      const anonymousId2 = 'KFG-735';
      nanoid.mockImplementation(() => anonymousId2);
      await request(app)
        .post('/user')
        .send({
          firstName: 'Jack',
          lastName: 'Doe',
          dob: '23/12/1989',
          address: {
            doorNumber: 1,
            line1: 'something road',
            line2: null,
            town: 'London',
            county: 'London',
            postCode: 'NE7 3BF',
          },
          contact: {
            country: 'GB',
            areaCode: '+44',
            number: '7121450622',
          },
        });

        const res = await request(app)
        .put('/user/KFG-734')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          dob: '23/12/1989',
          address: {
            doorNumber: 1,
            line1: 'new road',
            line2: 'another new line',
            town: 'London',
            county: 'London',
            postCode: 'NE7 3BF',
          },
          contact: {
            country: 'GB',
            areaCode: '+44',
            number: '7121450622',
          },
        });

      expect(res.statusCode).toEqual(400);

      done()
    });
    it('Should update an existing user', async (done) => {
      const anonymousId = 'KFG-778';
      const expectedUserData = {
        _id: anonymousId,
        firstName: 'John',
        lastName: 'Doe',
        dob: '23/12/1989',
        address: {
          doorNumber: 1,
          line1: 'new road',
          line2: 'another new line',
          town: 'London',
          county: 'London',
          postCode: 'NE7 3BF',
        },
        contact: {
          country: 'GB',
          areaCode: '+44',
          number: '7121450678',
        },
      };
      nanoid.mockImplementation(() => anonymousId);
      await request(app)
        .post('/user')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          dob: '23/12/1989',
          address: {
            doorNumber: 1,
            line1: 'something road',
            line2: null,
            town: 'London',
            county: 'London',
            postCode: 'NE7 3BF',
          },
          contact: {
            country: 'GB',
            areaCode: '+44',
            number: '7121450678',
          },
        });

      const res = await request(app)
        .put('/user/KFG-778')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          dob: '23/12/1989',
          address: {
            doorNumber: 1,
            line1: 'new road',
            line2: 'another new line',
            town: 'London',
            county: 'London',
            postCode: 'NE7 3BF',
          },
          contact: {
            country: 'GB',
            areaCode: '+44',
            number: '7121450678',
          },
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(expectedUserData);

      done();
    });
  });

  describe('remove', () => {
    it('Should return 404 if trying to remove a non existing user', async (done) => {
      const res = await request(app).delete('/user/KFG-missing');
      expect(res.statusCode).toEqual(404);
      done();
    });
    it('should remove a user from the db', async (done) => {
      // set up
      const anonymousId = 'KFG-734';
      nanoid.mockImplementation(() => anonymousId);
      await request(app)
        .post('/user')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          dob: '23/12/1989',
          address: {
            doorNumber: 1,
            line1: 'something road',
            line2: null,
            town: 'London',
            county: 'London',
            postCode: 'NE7 3BF',
          },
          contact: {
            country: 'GB',
            areaCode: '+44',
            number: '7121450602',
          },
        });

      const res = await request(app).delete('/user/KFG-734');

      const res2 = await request(app).get('/user/KFG-734');
      expect(res.statusCode).toEqual(200);
      expect(res2.statusCode).toEqual(404);
      done();
    });
  });
});
