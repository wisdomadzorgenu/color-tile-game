import express from 'express'
import request from "supertest";
import {assert } from "chai";
import 'mocha';

import ServerConfig from "../config/serverConfig";
import defaultRoute from "../routes/default-route";

const app = express();

//SET SERVER CONFIGUATION && DEFINE ALL ROUTES
app.use(ServerConfig());
app.use(defaultRoute());

//Routes TESTS
describe('Routes Test Suite',function(){
   it('responds with status 200',function(){
      return request(app).get("/").expect(200);
   });

   it('responds with status 404 when route is not found',function(){
      return request(app).get("/no-found").expect(404);
   });

   it('expect a solution given a valid data',function(){
      return request(app)
         .post("/get_solution")
         .send({
            colorSet: ['Red','Blue'],
            problemSet:[
               [{color:"Blue"},{color:"Red"}],
               [{color:"Blue"},{color:"Red"}]
            ]
         })
         .set('Accept', 'application/json')
         .expect(200)
         .expect(function(response){
            return assert.hasAnyKeys(response.body,['solution']);
         })
   });
});
