'use strict';

const { server } = require('../src/server');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(server);

describe('testing the server', () => {

  it('should respond properly /', () => {
    return mockRequest
      .get('/')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('should respond properly /users', () => {
    return mockRequest
      .get('/users')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('POST  /signup ', async () => {
    let test = { 'username': 'hammad', 'password': '1234' };
    mockRequest
      .post('/signup')
      .send(test)
      .then(data => {
        expect(data.status).toBe(200);
      });
  });


  it('POST  /signin ', async () => {
    mockRequest
      .post('/signin')
      .set('Authorization', 'Basic $2a$05$QxBx7Jx4GxmnowTy7eTxiOX9dFzxK/V4LxwoeuwyxJFuH7ww9JW5a')
      .then(data => {
        expect(data.status).toBe(200);
      });
  });



});