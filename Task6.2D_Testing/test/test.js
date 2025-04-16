/*
var expect = require("chai").expect;
var request = require("request");
const mongoose = require('mongoose');
const { User } = require('../models');



describe("Add Two Numbers", function() {
    var url = "http://localhost:3000/addTwoNumbers/3/5";
    it("returns status 200 to check if api works", function(done) {
            request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done()
        });
    });
    it("returns statusCode key in body to check if api give right result should be 200", function(done) {
            request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.statusCode).to.equal(200);
            done()
        });
    });
    it("returns the result as number", function(done) {
            request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.result).to.be.a('number');
            done()
        });
    });
    it("returns the result equal to 8", function(done) {
            request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.result).to.equal(8);
            done()
        });
    });
    it("returns the result not equal to 15", function(done) {
            request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.result).to.not.equal(15);
            done()
        });
    });
});
*/

/*describe('User Model Input Validation', function() {
  this.timeout(5000);
    before(function(done) {
        mongoose.connect('mongodb://localhost:27017/user_test_db', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(()=>{
        done();
      }).catch(err => {
        done(err);
      });
      //mongoose.connection.once('open', () => done());
    });
  
    after(function(done) {  // Change to regular function
      mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done());
      });
    });
  
    it('should not allow user without first name', (done) => {
      const user = new User({
        last_name: 'Doe',
        email: 'john@example.com',
        password: 'secret123'
      });
  
      user.validate((err) => {
        expect(err.errors.first_name).to.exist;
        done();
      });
    });

    it('should throw validation errors if all fields are missing', (done) => {
        const user = new User({}); // all fields are empty
      
        user.validate((err) => {
          expect(err.errors.first_name).to.exist;
          expect(err.errors.last_name).to.exist;
          expect(err.errors.email).to.exist;
          expect(err.errors.password).to.exist;
          done();
        });
      });
  
    it('should not allow invalid email format', (done) => {
      const user = new User({
        firstName: 'John',
        lastName: 'Doe',
        email: 'invalid-email',
        password: 'secret123'
      });
  
      user.validate((err) => {
        expect(err.errors.email).to.exist;
        done();
      });
    });
  
    it('should not allow password less than 6 characters', (done) => {
      const user = new User({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: '123'
      });
  
      user.validate((err) => {
        expect(err.errors.password).to.exist;
        done();
      });
    });
  
    it('should validate a correct user input', (done) => {
      const user = new User({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'secret123'
      });
  
      user.validate((err) => {
        expect(err).to.be.null;
        done();
      });
    });
  
  });*/

  const chai = require('chai');
  const expect = chai.expect;
  const request = require('supertest'); // Gantikan chai-http dengan supertest
  const express = require('express');
  const bodyParser = require('body-parser');
  const mongoose = require('mongoose');
  
  // Import route
  const projectRoute = require('../routes/projectRoute');
  const userRoute = require('../routes/userRoute');
  
  // Buat app express testing
  const app = express();
  app.use(bodyParser.json());
  app.use('/projects', projectRoute);
  app.use('/users', userRoute);
  
  describe('API Integration Tests (Supertest + Chai)', function () {
      this.timeout(10000); // 10 detik timeout
  
      before((done) => {
          mongoose.connect('mongodb://localhost:27017/test-db', {
              useNewUrlParser: true,
              useUnifiedTopology: true
          });
          mongoose.connection.once('open', () => {
              console.log('Connected to test database');
              done();
          });
      });
  
      describe('GET /projects', () => {
          it('should return status 200 and an array of projects', async () => {
              const res = await request(app).get('/projects');
              expect(res.status).to.equal(200);
              expect(res.body).to.be.an('object');
              expect(res.body.data).to.be.an('array');
          });
      });
  
      describe('POST /users', () => {
        it('should return status 200 and success message when valid user is submitted', async () => {
          const validUser = {
            first_name: "Budi",
            last_name: "Santoso",
            password: "rahasia123",
            email: "budi@example.com"
          };
      
          const res = await request(app).post('/users').send(validUser);
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.have.property('_id');
        });
      
        it('should return 400 if the email format is invalid', async () => {
          const invalidUser = {
            first_name: "John",
            last_name: "Doe",
            password: "password123",
            email: "invalid-email"
          };
      
          const res = await request(app).post('/users').send(invalidUser);
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Invalid email format');
        });
      
        it('should return 409 if the email is already registered', async () => {
          // Create a user first
          const existingUser = {
            first_name: "Jane",
            last_name: "Doe",
            password: "password123",
            email: "jane@example.com"
          };
      
          await request(app).post('/users').send(existingUser);
      
          // Try to register again with the same email
          const duplicateUser = {
            first_name: "John",
            last_name: "Doe",
            password: "password123",
            email: "jane@example.com"
          };
      
          const res = await request(app).post('/users').send(duplicateUser);
          expect(res.status).to.equal(409);
          expect(res.body.message).to.equal('Email already exists');
        });
      
        it('should return 409 if required fields are missing', async () => {
          const invalidUser = {
            first_name: "Incomplete"
          };
      
          const res = await request(app).post('/users').send(invalidUser);
          expect(res.status).to.equal(409);
          expect(res.body.message).to.equal('Missing required fields');
        });
      });
      

      describe('GET /users', () => {
        it('should return status 200 and an array of users', async () => {
          const res = await request(app).get('/users');
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
        });
      });
      
  
      after(async () => {
        try {
          await mongoose.connection.db.dropDatabase();
          await mongoose.disconnect();
          console.log('Test DB dropped and disconnected');
        } catch (err) {
          console.error('Error during after hook:', err.message);
        }
      });
  });
  