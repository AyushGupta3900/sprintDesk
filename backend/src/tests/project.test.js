import request from "supertest";
import app from "../app.js";

let token;
let workspaceId;

beforeEach(async () => {
  // Register user
  const registerRes = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Ayush",
      email: "ayush@test.com",
      password: "password123",
    });

  token = registerRes.body.token;

  // Create workspace
  const workspaceRes = await request(app)
    .post("/api/workspaces")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "SprintDesk",
    });

  workspaceId = workspaceRes.body._id;
});

describe("Project API", () => {
  it("should create a project for workspace owner", async () => {
    const res = await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Backend Revamp",
        description: "Core backend work",
        emoji: "🚀",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Backend Revamp");
    expect(res.body.workspace).toBe(workspaceId);
  });

  it("should list projects for workspace", async () => {
    await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Project One",
      });

    const res = await request(app)
      .get("/api/projects")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });

  it("should block project creation without auth", async () => {
    const res = await request(app)
      .post("/api/projects")
      .send({
        name: "Unauthorized Project",
      });

    expect(res.statusCode).toBe(401);
  });
});
