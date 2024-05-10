import supertest from 'supertest';
import { expect } from 'chai';
import app from '../index.js';

const requestWithSupertest = supertest(app);
 
describe('Testing GET /movies endpoint', function() {
    it('responds with a valid HTTP status code and number of movies',
      async function() {
        const DEFAULT_MOVIES_PER_PAGE =20;
        const response = await requestWithSupertest.get('/api/v1/movies');

        expect(response.status).to.equal(200);
        expect(response.body.movies.length).to.equal(DEFAULT_MOVIES_PER_PAGE);
      });
});

describe('Testing POST /reviews endpoint', function() {
  it('responds with a valid HTTP status code',
    async function() {
      const name = "Jack Brown";
      const response = await requestWithSupertest.post('/api/v1/movies/review')
      .send(
        { "movie_id": "573a1390f29313caabcd4135" ,
          "review": "This movie is not Ok by me!",
          "user_id": "1234",
          "name": name });

      expect(response.status).to.equal(200);
      expect(response.body.status).to.equal('success');
      //console.log(response.status);
    
      //Delete the review we just created
      const del_body = {
        "review_id": response.body.response.insertedId,
      }
      await requestWithSupertest.delete('/api/v1/movies/review').send(del_body);
    });
});

describe('Testing PUT /reviews endpoint', function() {
  it('Should fail to update using a different user id',
    async function() {
      const req_body = {
        "movie_id": "573a1390f29313caabcd4135",
        "review": "This is review for POST failure test",
        "user_id": "1234",
        "name": "Gabe Brown"

      }
      const response =  await requestWithSupertest.post('/api/v1/movies/review').send(req_body);

      // try to update the review with a different user ID (should fail)
      const update_body = {
        "review_id": response.body.response.insertedId,
        "review": "This is an update test with different user id",
        "user_id": "4321" //this should fail
      }

      const update_response = await requestWithSupertest.put('/api/v1/movies/review').send(update_body);
      
      expect(update_response.status).not.to.equal(200);
      expect(update_response.body.status).not.to.equal('success');

      //delete the review just posted

      const del_body = {
        "review_id": response.body.response.insertedId,
      }

      await requestWithSupertest.delete('/api/v1/movies/review').send(del_body);


    
    });

    it('Should success to update using the same user id',
    async function() {
      const req_body = {
        "movie_id": "573a1390f29313caabcd4135",
        "review": "This is review for POST failure test",
        "user_id": "1234",
        "name": "Gabe Brown"

      }
      const response =  await requestWithSupertest.post('/api/v1/movies/review').send(req_body);

      // try to update the review with the same user ID (should success)
      const update_body = {
        "review_id": response.body.response.insertedId,
        "review": "This is an update test with the same user id",
        "user_id": "1234" //this should success
      }

      const update_response = await requestWithSupertest.put('/api/v1/movies/review').send(update_body);
      
      expect(update_response.status).to.equal(200);
      expect(update_response.body.status).to.equal('success');

      //delete the review just posted

      const del_body = {
        "review_id": response.body.response.insertedId,
      }

      await requestWithSupertest.delete('/api/v1/movies/review').send(del_body);


    
    });

});

describe('Testing DELETE /reviews endpoint', function() {
  it('Should responds with a valid HTTP status code',
    async function() {
      const req_body = {
        "movie_id": "573a1390f29313caabcd4135",
        "review": "This is review for DELETE test",
        "user_id": "1234",
        "name": "Gabe Brown"

      }
      const response =  await requestWithSupertest.post('/api/v1/movies/review').send(req_body);
      
      //delete the review just posted

      const del_body = {
        "review_id": response.body.response.insertedId,
      }

      const del_response = await requestWithSupertest.delete('/api/v1/movies/review').send(del_body);


      expect(del_response.status).to.equal(200);
      expect(del_response.body.status).to.equal('success'); 
    
    });

});


describe('Testing GET /movies/id/:id endpoint', function() {
  it('Should responds with a valid HTTP status code and response body',
    async function() {
      // the moive 'Blacksmith Scene' has the below ID number
      const response =  await requestWithSupertest.get("/api/v1/movies/id/573a1390f29313caabcd4135");
      expect(response.status).to.equal(200);
      expect(response.body.title).to.equal('Blacksmith Scene');

    });
});

describe('Testing GET /movies/ratings endpoint', function() {
  it('Should responds with a valid HTTP status code and rating',
    async function() {
      const response =  await requestWithSupertest.get("/api/v1/movies/ratings");
      expect(response.status).to.equal(200);
      // there should be 21 ratings, and the first is 'AO'
      expect(response.body[0]).to.equal('AO');
      expect(response.body.length).to.equal(21);
    });
});


