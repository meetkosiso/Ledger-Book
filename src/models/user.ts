import { Schema, model } from "mongoose";
import { IUser } from "../interface/user";

const schema = new Schema<IUser>({
  name: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
});

export default model<IUser>("User", schema);
