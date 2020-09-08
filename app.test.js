const request = require('supertest');
const { nanoid } = require('nanoid');
const app = require('./app');

jest.mock('nanoid');
describe(':app tests', () => {
  describe(':get', () => {
    it('Should add not get data for an id that does not exist', async (done) => {
      const res = await request(app).get('/user/KFG-734');
      expect(res.statusCode).not.toEqual(200);
      done();
    });
  });

  describe(':create', () => {
    it('Should create a new user', async (done) => {
      const expectedUserData = {
        _id: 'KFG-734',
        firstName: 'John',
        lastName: 'Doe',
        dob: '23/12/1989',
        address: {
          doorNumber: 1,
          line1: 'something road',
          line2: null,
          postCode: 'NE7 3BF',
        },
        contact: {
          country: 'GB',
          areaCode: '+44',
          number: '7121450602',
        },
      };

      const anonymousId = 'KFG-734';
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
            postCode: 'NE7 3BF',
          },
          contact: {
            country: 'GB',
            areaCode: '+44',
            number: '7121450602',
          },
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(expectedUserData);

      done();
    });
  });
});
