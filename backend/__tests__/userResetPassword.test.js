const request = require('supertest');
const app = require('../app');
const pool = require('../utils/dbTest');
const bcrypt = require('bcrypt');

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue(true)
  })
}));

describe('Password Update Integration Test', () => {

  let token;

  beforeAll(async () => {
    await pool.query(
      'INSERT INTO public."users" (username, email, password) VALUES ($1, $2, $3)',
      ['testuser', 'testuser@example.com', await bcrypt.hash('OldPassword1!', 10)]
    );

    const response = await request(app)
      .post('/users/send-reset-link')
      .send({ email: 'testuser@example.com' });

    token = response.body.token;
  });

  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await pool.query('UPDATE public."users" SET password = $1 WHERE email = $2', [
      await bcrypt.hash('OldPassword1!', 10),
      'testuser@example.com',
    ]);
  });

  it('should return an error if the token is invalid or expired', async () => {
    const response = await request(app)
      .post('/users/reset-password')
      .send({
        token: 'invalid-token',
        newPassword: 'AnotherNewPassword1!',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Token invalide.');
  });
});
