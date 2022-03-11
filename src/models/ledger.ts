import { Schema, model } from "mongoose";
import { ILedger } from "../interface/ledger";

const schema = new Schema<ILedger>({
  user: { type: String, required: true },
  token: { type: Number, required: true },
  usd: { type: Number, required: true },
  createdAt: { type: String, required: true },
});

export default model<ILedger>("Ledger", schema);
