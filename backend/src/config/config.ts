import dotenv from "dotenv";
dotenv.config();
const isTest = process.env.NODE_ENV === "test";
const mongoUri = isTest ? process.env.MONGO_URI_TEST : process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error("Missing MongoDB connection string in environment variables");
}
export const config = {
  port: process.env.PORT || 3000,
  mongoUri,
  nodeEnv: process.env.NODE_ENV || "development",
};
