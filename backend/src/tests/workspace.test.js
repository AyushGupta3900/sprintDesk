import request from "supertest";
import app from "../app.js";

let token;

beforeEach(async () => {
  const res = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Ayush",
      email: "ayush@test.com",
      password: "password123",
    });

  token = res.body.token;
});

describe("Workspace API", () => {
  it("should create a workspace for authenticated user", async () => {
    const res = await request(app)
      .post("/api/workspaces")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "SprintDesk",
        description: "Primary workspace",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("SprintDesk");
    expect(res.body.owner).toBeDefined();
  });

  it("should not allow workspace creation without auth", async () => {
    const res = await request(app)
      .post("/api/workspaces")
      .send({
        name: "Unauthorized Workspace",
      });

    expect(res.statusCode).toBe(401);
  });
});
