import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

export async function databaseConnection(url: string) {
  await mongoose.connect(url);
}

export async function connectTestDatabase() {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { dbName: "test" });
}

export async function disconnectTestDatabase() {
  await mongoose.disconnect();
}
