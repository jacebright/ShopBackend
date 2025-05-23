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

describe('Order Controller', () => {
  describe('GET /order', () => {
    it('should return an array of orders', async () => {
      // Create mock items
      const mockOrders = [
        { _id: '1', userId: '1', products: [], cartTotal: 0 },
        { _id: '2', userId: '2', products: [], cartTotal: 0 },
      ];

      // Mock the find function
      const mockFind = mongodb.getDatabase().db().collection().find;
      mockFind.mockReturnValueOnce({
        toArray: () => Promise.resolve(mockOrders),
      });

      // Make the request
      const response = await request(app).get('/order');

      expect(response.status).toBe(200);
      expect(response.type).toBe('applications/json');
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length > 1).toBeTruthy();
    });
  });

    describe('GET /order/:id', () => {
      it('should return a single object', async () => {
        // Create mock object
        const mockOrder = {
          test: 'test',
        };

        // Mock FindeOne function.
        const mockFindOne = mongodb.getDatabase().db().collection().findOne;
        mockFindOne.mockReturnValueOnce(Promise.resolve(mockOrder));

        const response = await request(app).get(
          '/order/67f98ae1c8d60bfdac7e8c45'
        );

        expect(response.status).toBe(200);
        expect(response.type).toBe('applications/json');
        expect(Array.isArray(response.body)).toBeFalsy();
      });
    });
});
