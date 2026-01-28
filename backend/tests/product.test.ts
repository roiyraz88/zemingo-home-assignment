import request from "supertest";
import app from "../src/app";
import mongoose from "mongoose";
import { connectDB } from "../src/config/db";

beforeAll(async () => {
  await connectDB();
});

afterEach(async () => {
  await mongoose.connection.db!.dropDatabase();
});

beforeEach(async () => {
  await mongoose.connection.db!.dropDatabase();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Product API", () => {
  it("should add a product", async () => {
    const res = await request(app)
      .put("/product")
      .send({ name: "milk" });

    expect(res.status).toBe(200);
    expect(res.body.some((p: any) => p.name === "milk")).toBe(true);
  });

  it("should fail on duplicate product", async () => {
    await request(app).put("/product").send({ name: "milk" });

    const res = await request(app)
      .put("/product")
      .send({ name: "milk" });

    expect(res.status).toBe(400);
  });
});
