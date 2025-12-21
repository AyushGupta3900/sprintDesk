import request from "supertest";
import app from "../app.js";

describe("Auth API", () => {
  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({
          name: "Ayush",
          email: "ayush@test.com",
          password: "password123",
        });

      expect(res.statusCode).toBe(201);

      // token exists
      expect(res.body).toHaveProperty("token");
      expect(typeof res.body.token).toBe("string");

      // user exists
      expect(res.body).toHaveProperty("user");
      expect(res.body.user.email).toBe("ayush@test.com");

      // password should NOT be returned
      expect(res.body.user.password).toBeUndefined();
    });

    it("should not allow duplicate email registration", async () => {
      await request(app)
        .post("/api/auth/register")
        .send({
          name: "Ayush",
          email: "ayush@test.com",
          password: "password123",
        });

      const res = await request(app)
        .post("/api/auth/register")
        .send({
          name: "Ayush",
          email: "ayush@test.com",
          password: "password123",
        });

      expect(res.statusCode).toBe(409);
      expect(res.body.message).toBe("Email already registered");
    });
  });

  describe("POST /api/auth/login", () => {
    beforeEach(async () => {
      await request(app)
        .post("/api/auth/register")
        .send({
          name: "Ayush",
          email: "ayush@test.com",
          password: "password123",
        });
    });

    it("should login an existing user", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: "ayush@test.com",
          password: "password123",
        });

      expect(res.statusCode).toBe(200);

      expect(res.body).toHaveProperty("token");
      expect(typeof res.body.token).toBe("string");

      expect(res.body).toHaveProperty("user");
      expect(res.body.user.email).toBe("ayush@test.com");
    });

    it("should reject invalid password", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: "ayush@test.com",
          password: "wrongpassword",
        });

      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe("Invalid email or password");
    });

    it("should reject non-existent user", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: "nouser@test.com",
          password: "password123",
        });

      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe("Invalid email or password");
    });
  });

  describe("GET /api/auth/me", () => {
    it("should return authenticated user", async () => {
      const registerRes = await request(app)
        .post("/api/auth/register")
        .send({
          name: "Ayush",
          email: "ayush@test.com",
          password: "password123",
        });

      const token = registerRes.body.token;

      const res = await request(app)
        .get("/api/auth/me")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.user.email).toBe("ayush@test.com");
    });

    it("should block unauthenticated access", async () => {
      const res = await request(app).get("/api/auth/me");

      expect(res.statusCode).toBe(401);
    });
  });
});
