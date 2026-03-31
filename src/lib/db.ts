import mongoose from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var _mongooseConnection: Promise<typeof mongoose> | undefined;
}

export default async function connectToDB(): Promise<void> {
  if (mongoose.connection.readyState >= 1) return;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI environment variable is not set");

  if (!global._mongooseConnection) {
    global._mongooseConnection = mongoose.connect(uri);
  }

  await global._mongooseConnection;
}
