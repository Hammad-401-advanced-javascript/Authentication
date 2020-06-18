'use strict';


const { server } = require('../src/server');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(server);

describe('testing 500 error', () => {

  it('should respond 500 of an failuer', () => {

    return mockRequest
      .post('/add')
      .send('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTRiNzYzOGFjYWFlN2FkZmJmODZlMSIsImNhcGFiaXRpZXMiOlsicmVhZCJdLCJpYXQiOjE1OTIwNDc0NTl9.lv846IKRiM3gWUIwn_B7luRiJzqjpu4Af_3Q4XxhW3c')
      .then(results => {
        expect(results.status).toBe(404);
      });
  });
});