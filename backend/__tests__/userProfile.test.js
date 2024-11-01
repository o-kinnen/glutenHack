const request = require('supertest');
const app = require('../app');
const pool = require('../utils/dbTest');

describe('Profile Page Integration Test', () => {

  afterAll(async () => {
    try {
      await pool.query('DELETE FROM public."users" WHERE email = $1', ['profileuser@example.com']);
    } catch (error) {
      console.error('Cleanup error:', error.message);
    }
    await pool.end();
  });

  beforeAll(async () => {
    const response = await request(app)
      .post('/users/signup')
      .send({
        username: 'profileuser',
        email: 'profileuser@example.com',
        password: 'TestPassword1!'
      });
    
    if (response.status !== 201) {
      throw new Error('Failed to create test user');
    }
  });

  let token;

  beforeEach(async () => {
    const response = await request(app)
      .post('/users/login')
      .send({
        email: 'profileuser@example.com',
        password: 'TestPassword1!'
      });
    
    if (response.status === 200) {
      token = response.headers['set-cookie'][0];
    } else {
      throw new Error('Failed to login test user');
    }
  });

  it('should fetch profile successfully with valid token', async () => {
    const response = await request(app)
      .get('/users/profile')
      .set('Cookie', [token]);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username', 'profileuser');
    expect(response.body).toHaveProperty('email', 'profileuser@example.com');
  });

  it('should return an error if the token is missing', async () => {
    const response = await request(app)
      .get('/users/profile');

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Accès refusé. Aucun token fourni.');
  });

  it('should logout successfully', async () => {
    const response = await request(app)
      .post('/users/logout')
      .set('Cookie', [token]);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Déconnexion réussie.');
  });

  it('should return an error when trying to logout without being authenticated', async () => {
    const response = await request(app)
      .post('/users/logout');

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Accès non autorisé.');
  });
});

