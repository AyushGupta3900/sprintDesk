import mongoose from "mongoose";
import { randomUUID } from "crypto";

const { Schema } = mongoose;

function generateInviteCode() {
  return randomUUID().split("-")[0];
}

const workspaceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    inviteCode: {
      type: String,
      unique: true,
      default: generateInviteCode,
    },
  },
  { timestamps: true }
);

workspaceSchema.methods.resetInviteCode = function () {
  this.inviteCode = generateInviteCode();
};

export default mongoose.model("Workspace", workspaceSchema);
