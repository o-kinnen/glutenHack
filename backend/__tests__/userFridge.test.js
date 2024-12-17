const request = require('supertest');
const app = require('../app');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

jest.mock('../models/userModel');
jest.mock('jsonwebtoken');

describe('User Controller Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    jwt.verify.mockImplementation(() => ({ user_id: 1 }));
  });

  describe('GET /users/restrictions', () => {
    it('should return restrictions for the authenticated user', async () => {
      const restrictions = ['Nuts', 'Gluten'];
      User.getRestrictionsByUserId.mockResolvedValue(restrictions);

      const response = await request(app)
        .get('/users/restrictions')
        .set('Cookie', 'token=valid.token');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ restrictions });
    });

    it('should handle errors when retrieving restrictions', async () => {
      User.getRestrictionsByUserId.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/users/restrictions')
        .set('Cookie', 'token=valid.token');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: 'Erreur lors de la récupération des restrictions alimentaires.',
      });
    });
  });

  describe('POST /users/fridge/add', () => {
    it('should add food to the fridge for the authenticated user', async () => {
      User.addFoodToFridge.mockResolvedValue();

      const response = await request(app)
        .post('/users/fridge/add')
        .set('Cookie', 'token=valid.token')
        .send({ foodName: 'Carrot', quantity: '2kg' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Aliment ajouté au réfrigérateur avec succès.',
      });
    });

    it('should return 404 if food is not found', async () => {
      User.addFoodToFridge.mockRejectedValue(new Error('Aliment non trouvé.'));

      const response = await request(app)
        .post('/users/fridge/add')
        .set('Cookie', 'token=valid.token')
        .send({ foodName: 'UnknownFood', quantity: '1kg' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: 'Aliment non trouvé.',
      });
    });

    it('should handle errors when adding food to the fridge', async () => {
      User.addFoodToFridge.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .post('/users/fridge/add')
        .set('Cookie', 'token=valid.token')
        .send({ foodName: 'Carrot', quantity: '2kg' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: 'Erreur lors de l\'ajout de l\'aliment.',
      });
    });
  });

  describe('GET /users/fridge', () => {
    it('should return fridge contents for the authenticated user', async () => {
      const fridgeContents = [{ food_name: 'Carrot', quantity: '2kg' }];
      User.getFridgeContents.mockResolvedValue(fridgeContents);

      const response = await request(app)
        .get('/users/fridge')
        .set('Cookie', 'token=valid.token');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(fridgeContents);
    });

    it('should handle errors when retrieving fridge contents', async () => {
      User.getFridgeContents.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/users/fridge')
        .set('Cookie', 'token=valid.token');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: 'Erreur lors de la récupération des aliments du réfrigérateur.',
      });
    });
  });

  describe('DELETE /users/fridge/delete', () => {
    it('should remove food from the fridge for the authenticated user', async () => {
      User.removeFoodFromFridge.mockResolvedValue();

      const response = await request(app)
        .delete('/users/fridge/delete')
        .set('Cookie', 'token=valid.token')
        .query({ foodName: 'Carrot' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Aliment supprimé du réfrigérateur avec succès.',
      });
    });

    it('should return 404 if food is not found', async () => {
      User.removeFoodFromFridge.mockRejectedValue(new Error('Aliment non trouvé.'));

      const response = await request(app)
        .delete('/users/fridge/delete')
        .set('Cookie', 'token=valid.token')
        .query({ foodName: 'UnknownFood' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: 'Aliment non trouvé.',
      });
    });

    it('should handle errors when removing food from the fridge', async () => {
      User.removeFoodFromFridge.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .delete('/users/fridge/delete')
        .set('Cookie', 'token=valid.token')
        .query({ foodName: 'Carrot' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: 'Erreur lors de la suppression de l\'aliment.',
      });
    });
  });

  describe('PUT /users/fridge/update', () => {
    it('should update food quantity in the fridge for the authenticated user', async () => {
      User.updateFoodQuantity.mockResolvedValue();

      const response = await request(app)
        .put('/users/fridge/update')
        .set('Cookie', 'token=valid.token')
        .send({ foodName: 'Carrot', quantity: 3, unit: 'kg' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Quantité de l\'aliment mise à jour avec succès.',
      });
    });

    it('should handle errors when updating food quantity', async () => {
      User.updateFoodQuantity.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .put('/users/fridge/update')
        .set('Cookie', 'token=valid.token')
        .send({ foodName: 'Carrot', quantity: 3, unit: 'kg' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: 'Erreur lors de la mise à jour de la quantité de l\'aliment.',
      });
    });
  });
});

