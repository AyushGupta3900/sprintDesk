import request from "supertest";
import app from "../app.js";
import Role from "../models/role.model.js";
import Member from "../models/member.model.js";
import { Roles } from "../enums/role.enum.js";

let ownerToken;
let memberToken;
let workspaceId;
let projectId;
let memberUserId;

beforeEach(async () => {
  // OWNER register
  const ownerRes = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Owner",
      email: "owner@test.com",
      password: "password123",
    });

  ownerToken = ownerRes.body.token;

  // Workspace
  const workspaceRes = await request(app)
    .post("/api/workspaces")
    .set("Authorization", `Bearer ${ownerToken}`)
    .send({ name: "SprintDesk" });

  workspaceId = workspaceRes.body._id;

  // Project
  const projectRes = await request(app)
    .post("/api/projects")
    .set("Authorization", `Bearer ${ownerToken}`)
    .send({ name: "Backend" });

  projectId = projectRes.body._id;

  // MEMBER register
  const memberRes = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Member",
      email: "member@test.com",
      password: "password123",
    });

  memberToken = memberRes.body.token;
  memberUserId = memberRes.body.user._id;

  // Add MEMBER to workspace
  const memberRole = await Role.findOne({
    workspaceId,
    name: Roles.MEMBER,
  });

  await Member.create({
    userId: memberUserId,
    workspaceId,
    role: memberRole._id,
  });
});

describe("Task API", () => {
  it("should allow OWNER to create a task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({
        title: "Implement JWT",
        projectId,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Implement JWT");
  });

  it("should allow MEMBER to create a task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${memberToken}`)
      .send({
        title: "Write tests",
        projectId,
      });

    expect(res.statusCode).toBe(201);
  });

  it("should allow MEMBER to view tasks", async () => {
    // OWNER creates task
    await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({
        title: "Deploy backend",
        projectId,
      });

    // MEMBER lists tasks
    const res = await request(app)
      .get(`/api/tasks/${projectId}`)
      .set("Authorization", `Bearer ${memberToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should block unauthenticated task creation", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({
        title: "Unauthorized",
        projectId,
      });

    expect(res.statusCode).toBe(401);
  });
});
