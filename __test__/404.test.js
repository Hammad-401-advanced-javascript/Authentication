'use strict';

const {server} = require('../src/server');

const supergoose=require('@code-fellows/supergoose');

const mockRequest = supergoose(server);

describe('test 500',()=>{
  it('test the server res',()=>{
    return mockRequest.get('/bad')
      .then(results=>{
        expect(results.status).toBe(404);
      }).catch(console.error);
  });
});