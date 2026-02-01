import request from "supertest";
import app from "../src/app";
import mongoose from "mongoose";
import { connectDB } from "../src/config/db";

beforeAll(async () => {
  await connectDB();
});

beforeEach(async () => {
  await mongoose.connection.db!.dropDatabase();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Inventory API", () => {
  describe("POST /inventory", () => {
    it("should set inventory successfully", async () => {
      await request(app).put("/product").send({ name: "milk" });

      const res = await request(app)
        .post("/inventory")
        .send([{ name: "milk", quantity: 2 }]);

      expect(res.status).toBe(200);
      expect(res.body).toEqual([
        expect.objectContaining({ name: "milk", quantity: 2 }),
      ]);
    });

    it("should fail when body is not an array", async () => {
      const res = await request(app)
        .post("/inventory")
        .send({ name: "milk", quantity: 2 });

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/missing attribute/i);
    });

    it("should fail when name is missing", async () => {
      const res = await request(app)
        .post("/inventory")
        .send([{ quantity: 2 }]);

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/missing attribute/i);
    });

    it("should fail when quantity is missing", async () => {
      const res = await request(app)
        .post("/inventory")
        .send([{ name: "milk" }]);

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/missing attribute/i);
    });

    it("should fail when product does not exist", async () => {
      const res = await request(app)
        .post("/inventory")
        .send([{ name: "bread", quantity: 1 }]);

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/products list/i);
    });
  });

  describe("GET /inventory", () => {
    it("should return inventory", async () => {
      await request(app).put("/product").send({ name: "milk" });

      await request(app)
        .post("/inventory")
        .send([{ name: "milk", quantity: 3 }]);

      const res = await request(app).get("/inventory");

      expect(res.status).toBe(200);
      expect(res.body[0].name).toBe("milk");
      expect(res.body[0].quantity).toBe(3);
    });
  });

  describe("POST /inventory/reset", () => {
    it("should reset inventory", async () => {
      const res = await request(app).post("/inventory/reset");

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });
});
