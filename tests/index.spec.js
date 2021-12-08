const request = require("supertest");
const Server = require("../models/server");

const server = new Server();
 
describe("POST / uploads ", () => {
  test("should respond with a 400 if do not send a request body ", async () => {
    const response = await request(server.app).post("/api/uploads").send({});
    expect(response.statusCode).toBe(400);
  });

});
