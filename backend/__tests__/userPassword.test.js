const request = require('supertest');
const app = require('../app');
const pool = require('../utils/dbTest');

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue(true)
  })
}));

describe('Password Reset Integration Test', () => {

  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await pool.query('DELETE FROM public."users" WHERE email LIKE $1', ['testuser%@example.com']);
  });

  it('should send a reset password email if the user exists', async () => {
    await pool.query(
      'INSERT INTO public."users" (username, email, password) VALUES ($1, $2, $3)',
      ['testuser', 'testuser@example.com', 'TestPassword1!']
    );

    const response = await request(app)
      .post('/users/send-reset-link')
      .send({ email: 'testuser@example.com' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Email de réinitialisation envoyé.');
  });

  it('should return an error if the email does not exist', async () => {
    const response = await request(app)
      .post('/users/send-reset-link')
      .send({ email: 'nonexistent@example.com' });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Utilisateur non trouvé.');
  });

  it('should handle server errors gracefully', async () => {
    const mockSendMail = require('nodemailer').createTransport().sendMail;
    mockSendMail.mockRejectedValueOnce(new Error('Server error'));

    await pool.query(
      'INSERT INTO public."users" (username, email, password) VALUES ($1, $2, $3)',
      ['testuser', 'testuser@example.com', 'TestPassword1!']
    );

    const response = await request(app)
      .post('/users/send-reset-link')
      .send({ email: 'testuser@example.com' });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Erreur lors de la communication avec le serveur. Veuillez réessayer plus tard.');
  });
});
