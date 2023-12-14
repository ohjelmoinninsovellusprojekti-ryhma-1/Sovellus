/*
const http = require('http');
const { expect } = require('chai');
const app = require('./server.js');
//const supertest = require('supertest');


  it('rekisteröinti', (done) => {
    const registerData = JSON.stringify({
      name: 'John',
      lname: 'Doe',
      password: 'examplePassword',
      email: 'john.doe@example.com',
      username: 'johndoe',
      pronouns: 'he/him',
    });
  
    const options = {
      hostname: 'localhost',
      port: 5000, 
      path: '/api/register',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': registerData.length,
      },
    };
  
    const req = http.request(options, (res) => {
      let data = '';
  
      res.on('data', (chunk) => {
        data += chunk;
      });
  
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('Registration Response:', data); 
          expect(JSON.parse(data)).to.have.property('success').to.equal(true);
          expect(res.statusCode).to.equal(200); 
        } else {
          console.error('Error registering:', data); 
          done(new Error(`Unexpected status code: ${res.statusCode}`));
          return;
        }
  
        done();
      });
    });
  
    req.on('error', (error) => {
      done(error);
    });
  
    req.write(registerData);
    req.end();
  });

  describe('poista käyttäjä', () => {
    it('poista käyttäjä', (done) => {
      const userId = '37';
  
      const options = {
        hostname: 'localhost',
        port: 5000,
        path: `/api/user/${userId}`,
        method: 'DELETE',
      };
  
      const req = http.request(options, (res) => {
        let data = '';
  
        res.on('data', (chunk) => {
          data += chunk;
        });
  
        res.on('end', () => {
          console.log('Delete User Response:', data); 
  
          try {
            expect(res.statusCode).to.equal(200);
            const responseJson = data ? JSON.parse(data) : null;
  
            if (!responseJson) {
              throw new Error('Response data is null or undefined');
            }
  
            expect(responseJson).to.have.property('message').to.equal('Account and data deleted successfully');
            expect(responseJson).to.not.have.property('deletedUser');
            done();
          } catch (error) {
            done(error);
          }
        });
      });
  
      req.on('error', (error) => {
        done(error);
      });
  
      req.end();
    });
  
    it('should handle user not found', (done) => {
      const nonExistentUserId = 'nonExistentUserId';
  
      const options = {
        hostname: 'localhost',
        port: 5000,
        path: `/api/user/${nonExistentUserId}`,
        method: 'DELETE',
      };
  
      const req = http.request(options, (res) => {
        let data = '';
  
        res.on('data', (chunk) => {
          data += chunk;
        });
  
        res.on('end', () => {
          console.log('Delete User Response:', data); 
  
          try {
            expect(res.statusCode).to.equal(500);
            const responseJson = data ? JSON.parse(data) : null;
  
            if (!responseJson) {
              throw new Error('Response data is null or undefined');
            }
  
            expect(responseJson).to.have.property('error').to.equal('Internal Server Error');
            done();
          } catch (error) {
            done(error);
          }
        });
      });
  
      req.on('error', (error) => {
        done(error);
      });
  
      req.end();
    });
  });
  describe('login', () => {
    it('should log in user successfully', (done) => {
      const loginData = JSON.stringify({
        username: 'exampleUsername',
        password: 'examplePassword',
      });
  
      const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': loginData.length,
        },
      };
  
      const req = http.request(options, (res) => {
        let data = '';
  
        res.on('data', (chunk) => {
          data += chunk;
        });
  
        res.on('end', () => {
          if (res.statusCode === 200) {
            console.log('Login Response:', data);
            expect(JSON.parse(data)).to.have.property('success').to.equal(true);
            expect(res.statusCode).to.equal(200);
          } else {
            console.error('Error logging in:', data);
            done(new Error(`Unexpected status code: ${res.statusCode}`));
            return;
          }
  
          done();
        });
      });
  
      req.on('error', (error) => {
        done(error);
      });
  
      req.write(loginData);
      req.end();
    });
  
    it('should handle user not found during login', (done) => {
      const loginData = JSON.stringify({
        username: 'nonExistentUser',
        password: 'examplePassword',
      });
  
      const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': loginData.length,
        },
      };
  
      const req = http.request(options, (res) => {
        let data = '';
  
        res.on('data', (chunk) => {
          data += chunk;
        });
  
        res.on('end', () => {
          console.log('Login Response:', data);
  
          try {
            expect(res.statusCode).to.equal(404);
            const responseJson = data ? JSON.parse(data) : null;
  
            if (!responseJson) {
              throw new Error('Response data is null or undefined');
            }
  
            expect(responseJson).to.have.property('error').to.equal('User not found');
            done();
          } catch (error) {
            done(error);
          }
        });
      });
  
      req.on('error', (error) => {
        done(error);
      });
  
      req.write(loginData);
      req.end();
    });
  
    it('should handle invalid password during login', (done) => {
      const loginData = JSON.stringify({
        username: 'exampleUsername',
        password: 'incorrectPassword',
      });
  
      const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': loginData.length,
        },
      };
  
      const req = http.request(options, (res) => {
        let data = '';
  
        res.on('data', (chunk) => {
          data += chunk;
        });
  
        res.on('end', () => {
          console.log('Login Response:', data);
  
          try {
            expect(res.statusCode).to.equal(401);
            const responseJson = data ? JSON.parse(data) : null;
  
            if (!responseJson) {
              throw new Error('Response data is null or undefined');
            }
  
            expect(responseJson).to.have.property('error').to.equal('Invalid password');
            done();
          } catch (error) {
            done(error);
          }
        });
      });
  
      req.on('error', (error) => {
        done(error);
      });
  
      req.write(loginData);
      req.end();
    });
  
   
  });
  */