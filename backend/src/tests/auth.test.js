import request from "supertest";
import app from "../app.js";

describe("Auth API", () => {
  it("should register a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Ayush",
        email: "ayush@test.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.email).toBe("ayush@test.com");
  });

  it("should login a user", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Ayush",
        email: "ayush@test.com",
        password: "password123",
      });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "ayush@test.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
