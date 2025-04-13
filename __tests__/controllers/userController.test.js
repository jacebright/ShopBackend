const request = require('supertest');
const app = require('../../server');
const mongodb = require('../../db/database');

// Setup mock to face the mongo calls.
jest.mock('../../db/database', () => ({
  getDatabase: jest.fn().mockReturnValue({
    db: jest.fn().mockReturnValue({
      collection: jest.fn().mockReturnValue({
        find: jest.fn(),
        findOne: jest.fn(),
        insertOne: jest.fn(),
        replaceOne: jest.fn(),
        deleteOne: jest.fn(),
      }),
    }),
  }),
}));

describe('User Controller', () => {
  describe('GET /users', () => {
    it('should return an array of users.', async () => {
      // Create mock items
      const mockUsers = [
        { _id: '1', userId: '1', products: [], cartTotal: 0 },
        { _id: '2', userId: '2', products: [], cartTotal: 0 },
      ];

      // Mock the find function
      const mockFind = mongodb.getDatabase().db().collection().find;
      mockFind.mockReturnValueOnce({
        toArray: () => Promise.resolve(mockUsers),
      });

      // Make the request
      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
      expect(response.type).toBe('applications/json');
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length > 1).toBeTruthy();
    });
  });
});
