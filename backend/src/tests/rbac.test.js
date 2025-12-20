import request from "supertest";
import app from "../app.js";
import Member from "../models/member.model.js";
import Role from "../models/role.model.js";
import { Roles } from "../enums/role.enum.js";

let ownerToken;
let memberToken;
let workspaceId;

beforeEach(async () => {
  // OWNER registration
  const ownerRes = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Owner",
      email: "owner@test.com",
      password: "password123",
    });

  ownerToken = ownerRes.body.token;

  // Create workspace
  const workspaceRes = await request(app)
    .post("/api/workspaces")
    .set("Authorization", `Bearer ${ownerToken}`)
    .send({
      name: "SprintDesk",
    });

  workspaceId = workspaceRes.body._id;

  // MEMBER registration
  const memberRes = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Member",
      email: "member@test.com",
      password: "password123",
    });

  memberToken = memberRes.body.token;

  // Add MEMBER to workspace manually (test-only)
  const memberRole = await Role.findOne({
    workspaceId,
    name: Roles.MEMBER,
  });

  await Member.create({
    userId: memberRes.body.user._id,
    workspaceId,
    role: memberRole._id,
  });
});

describe("RBAC Enforcement", () => {
  it("should allow OWNER to create project", async () => {
    const res = await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({
        name: "Owner Project",
      });

    expect(res.statusCode).toBe(201);
  });

  it("should block MEMBER from creating project", async () => {
    const res = await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${memberToken}`)
      .send({
        name: "Member Project",
      });

    expect(res.statusCode).toBe(403);
  });

  it("should allow MEMBER to view projects", async () => {
    // OWNER creates project
    await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({
        name: "Visible Project",
      });

    // MEMBER lists projects
    const res = await request(app)
      .get("/api/projects")
      .set("Authorization", `Bearer ${memberToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
