import app from '../app';
import request from 'supertest';
import { connectDB, disconnectDB } from '../dbConfig';

// describe("Test app.ts", () => {
//   test("Catch-all route", async () => {
//     const res = await request(app).get("/");
//     expect(res.body).toEqual({ message: "Allo! Catch-all route." });
//   });
// });
const credentials = {
  email: 'dani2@gmail.com',
  password: 'lopez2',
};

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await disconnectDB();
});

describe('Server.ts tests', () => {
  test('Math test', () => {
    expect(2 + 2).toBe(4);
  });

  test('Login test', async () => {
    try {
      const response = await request(app).post('/login').send(credentials);
      expect(response.status).toBe(200);
      // Puedes agregar más expectativas según sea necesario
    } catch (error) {
      // Maneja el error aquí según tus necesidades
      console.error(error);
      throw error; // Asegúrate de lanzar el error para que Jest lo detecte como una falla
    }
  }, 10000);
});
