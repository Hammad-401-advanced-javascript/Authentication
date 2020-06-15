'use strict';

const {server} = require('../src/server');

const supergoose=require('@code-fellows/supergoose');

const mockRequest = supergoose(server);

describe('test the server',()=>{

  it('sign up',async()=>{
    let test={'username':'hammad','password':'12345'};
    mockRequest
      .post('/signup')
      .send(test)
      .then(result=>{
        expect(result.status).toBe(500);
      });
    
  });
});