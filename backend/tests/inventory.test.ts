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

describe("Inventory API", () => {
  it("should set inventory", async () => {
    await request(app).put("/product").send({ name: "milk" });

    const res = await request(app)
      .post("/inventory")
      .send([{ name: "milk", quantity: 2 }]);

    expect(res.status).toBe(200);
    expect(res.body[0].quantity).toBe(2);
  });

  it("should reset inventory", async () => {
    const res = await request(app).post("/inventory/reset");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});
