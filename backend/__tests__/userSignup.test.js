const request = require('supertest');
const app = require('../app');
const pool = require('../utils/dbTest');

describe('User Signup Integration Test', () => {

  afterAll(async () => {
    await pool.end();
  });  

  it('should create a new user successfully', async () => {
    const response = await request(app)
      .post('/signup')
      .send({
        username: 'testuser',
        email: `testuser${Math.random()}@example.com`,
        password: 'TestPassword1!'
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Utilisateur enregistré avec succès');
  });

  it('should not allow creating a user with an existing email', async () => {
    await request(app).post('/signup').send({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'TestPassword1!',
    });

    const response = await request(app)
      .post('/signup')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'TestPassword1!'
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Ce compte existe déjà');
  }); 
});
