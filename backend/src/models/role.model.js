import mongoose from "mongoose";
import { Roles, Permissions } from "../enums/role.enum.js";
import { RolePermissions } from "../utils/role-permission.js";

const { Schema } = mongoose;

const roleSchema = new Schema(
  {
    name: {
      type: String,
      enum: Object.values(Roles),
      required: true,
    },
    permissions: {
      type: [String],
      enum: Object.values(Permissions),
      default() {
        return RolePermissions[this.name] || [];
      },
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
  },
  { timestamps: true }
);

roleSchema.index({ name: 1, workspaceId: 1 }, { unique: true });

export default mongoose.model("Role", roleSchema);