const request = require('supertest');
const app = require('../app');
const pool = require('../utils/dbTest');

describe('User Login Integration Test', () => {
  afterAll(async () => {
    try {
      await pool.query('DELETE FROM public."users" WHERE email = $1', ['testuser@example.com']);
    } catch (error) {
      console.error('Cleanup error:', error.message);
    }
    await pool.end();
  });

  beforeAll(async () => {
    const response = await request(app)
      .post('/users/signup')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'TestPassword1!'
      });
    if (response.status !== 201) {
      throw new Error('Failed to create test user');
    }
  });

  it('should login successfully with correct credentials', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({
        email: 'testuser@example.com',
        password: 'TestPassword1!'
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Connexion réussie.');
  });

  it('should not login with incorrect password', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({
        email: 'testuser@example.com',
        password: 'WrongPassword1!'
      });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Mot de passe incorrect.');
  });

  it('should not login if the account does not exist', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({
        email: 'nonexistentuser@example.com',
        password: 'TestPassword1!'
      });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Compte non trouvé.');
  });
});