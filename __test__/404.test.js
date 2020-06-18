'use strict';


const { server } = require('../src/server');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(server);

describe('testing the 404 error', () => {

  it('should respond 404 of an invalid route', () => {

    return mockRequest
      .get('/anything')
      .then(results => {
        expect(results.status).toBe(404);
      });
  });

});