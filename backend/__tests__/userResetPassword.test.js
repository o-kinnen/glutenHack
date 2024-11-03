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
    // Insère un utilisateur de test dans la base de données
    await pool.query(
      'INSERT INTO public."users" (username, email, password) VALUES ($1, $2, $3)',
      ['testuser', 'testuser@example.com', await bcrypt.hash('OldPassword1!', 10)]
    );

    // Générez un token pour cet utilisateur (simulateur)
    const response = await request(app)
      .post('/users/send-reset-link')
      .send({ email: 'testuser@example.com' });

    // Simulez que vous recevez le token du lien
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
/*
  it('should successfully update the password if the token is valid', async () => {
    const response = await request(app)
      .post('/users/reset-password')
      .send({
        token: token,
        newPassword: 'NewPassword1!',
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Mot de passe réinitialisé avec succès.');

    const userResult = await pool.query('SELECT * FROM public."users" WHERE email = $1', [
      'testuser@example.com'
    ]);
    const isPasswordUpdated = await bcrypt.compare('NewPassword1!', userResult.rows[0].password);
    expect(isPasswordUpdated).toBe(true);
  });
*/
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
/*
  it('should handle server errors gracefully', async () => {
    const mockSendMail = require('nodemailer').createTransport().sendMail;
    mockSendMail.mockRejectedValueOnce(new Error('Server error'));

    const response = await request(app)
      .post('/users/reset-password')
      .send({
        token: token,
        newPassword: 'NewPasswordWithError1!',
      });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Erreur lors de la communication avec le serveur. Veuillez réessayer plus tard.');
  });
*/
});
