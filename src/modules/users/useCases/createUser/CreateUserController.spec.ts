
import request from "supertest";
import { app } from "../../../../app";
import { Connection } from "typeorm";
import createConnection from "../../../../database";

let connection: Connection;

describe("Create user controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();


  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new user", async () => {
    const response = await request(app).post("/api/v1/users").send({
      name: "User",
      email: "email@user.com",
      password: "123",
    });

    expect(response.status).toBe(201);
  });
});
