import { Connection } from "typeorm";
import request from "supertest";
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcryptjs";
import creacteConnect from "../../../../database";
import { app } from "../../../../app";

let connection: Connection;
const idUser = uuidv4();

describe("User profile controller", () => {
  beforeAll(async () => {
    connection = await creacteConnect();
    await connection.runMigrations();

    const password = await hash("admin", 8);
    await connection.query(
      `INSERT INTO users (id, name, email, password, created_at, updated_at) values ('${idUser}', 'adm', '@admin', '${password}', 'now()', 'now()')`
    );
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to get a user profile by id", async () => {
    const responseAuthenticate = await request(app)
      .post("/api/v1/sessions")
      .send({
        email: "@admin",
        password: "admin",
      });

    const { token } = responseAuthenticate.body;

    const responseUserProfile = await request(app)
      .get("/api/v1/users")
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseUserProfile.status).toBe(200);
    expect(responseUserProfile.body).toHaveProperty("id");
  });
});
