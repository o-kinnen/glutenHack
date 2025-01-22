const request = require('supertest');
const app = require('../app');
const pool = require('../utils/db');

describe('Tests d\'intégration des controllers', () => {
  let createdUserEmail = 'testuser1@example.com';
  let token = '';

  afterAll(async () => {
    await pool.query('DELETE FROM users WHERE email = $1', [createdUserEmail]);
    await pool.end();
  });

  describe('GET /users', () => {
    it('Devrait retourner la liste des utilisateurs', async () => {
      const response = await request(app).get('/users');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /users/signup', () => {
    it('Devrait créer un nouvel utilisateur', async () => {
      const newUser = {
        username: 'testuser',
        email: createdUserEmail,
        password: 'password123',
      };
      const response = await request(app)
        .post('/users/signup')
        .send(newUser);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('message', 'Utilisateur enregistré avec succès.');
    });

    it('Devrait retourner une erreur si l\'email existe déjà', async () => {
      const existingUser = {
        username: 'testuser2',
        email: createdUserEmail,
        password: 'password123',
      };
      const response = await request(app)
        .post('/users/signup')
        .send(existingUser);

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('message', 'Ce compte existe déjà.');
    });
  });

  describe('POST /users/login', () => {
    it('Devrait connecter un utilisateur avec des informations valides', async () => {
      const credentials = {
        email: createdUserEmail,
        password: 'password123',
      };
      const response = await request(app)
        .post('/users/login')
        .send(credentials);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'Connexion réussie.');
      expect(response.body.user).toHaveProperty('email', credentials.email);
      token = response.body.token;
    });

    it('Devrait retourner une erreur pour un mot de passe incorrect', async () => {
      const credentials = {
        email: createdUserEmail,
        password: 'wrongpassword',
      };
      const response = await request(app)
        .post('/users/login')
        .send(credentials);

      expect(response.statusCode).toBe(401);
      expect(response.body).toHaveProperty('message', 'Mot de passe incorrect.');
    });
  });

    it('Devrait retourner une erreur si non authentifié', async () => {
      const response = await request(app).get('/users/profile');
      expect(response.statusCode).toBe(401);
      expect(response.body).toHaveProperty('message', 'Accès refusé. Aucun token fourni.');
  });
});
