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

describe("Product API", () => {
  describe("POST /api/product (add product)", () => {
    it("should add a product successfully", async () => {
      const res = await request(app)
        .post("/api/product")
        .send({ name: "milk" });

      expect(res.status).toBe(200);
      expect(res.body.some((p: any) => p.name === "milk")).toBe(true);
    });

    it("should fail when product name is missing", async () => {
      const res = await request(app).post("/api/product").send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/name/i);
    });

    it("should fail on duplicate product", async () => {
      await request(app).post("/api/product").send({ name: "milk" });

      const res = await request(app).post("/api/product").send({ name: "milk" });

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/exists/i);
    });
  });

  describe("GET /api/product/all", () => {
    it("should return all products", async () => {
      await request(app).post("/api/product").send({ name: "milk" });
      await request(app).post("/api/product").send({ name: "bread" });

      const res = await request(app).get("/api/product/all");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.map((p: any) => p.name)).toEqual(
        expect.arrayContaining(["milk", "bread"])
      );
    });
  });

  describe("PUT /api/product/:oldName (update product)", () => {
    it("should update product name", async () => {
      await request(app).post("/api/product").send({ name: "milk" });

      const res = await request(app)
        .put("/api/product/milk")
        .send({ name: "chocolate" });

      expect(res.status).toBe(200);
      expect(res.body.some((p: any) => p.name === "chocolate")).toBe(true);
    });

    it("should fail when updating non-existing product", async () => {
      const res = await request(app)
        .put("/api/product/milk")
        .send({ name: "apple" });

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/not found/i);
    });

    it("should fail when updating to an existing name", async () => {
      await request(app).post("/api/product").send({ name: "milk" });
      await request(app).post("/api/product").send({ name: "bread" });

      const res = await request(app)
        .put("/api/product/milk")
        .send({ name: "bread" });

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/exists/i);
    });

    it("should fail when new name is missing", async () => {
      await request(app).post("/api/product").send({ name: "milk" });

      const res = await request(app)
        .put("/api/product/milk")
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/name/i);
    });
  });

  describe("DELETE /api/product/:name", () => {
    it("should delete product", async () => {
      await request(app).post("/api/product").send({ name: "milk" });

      const res = await request(app).delete("/api/product/milk");

      expect(res.status).toBe(200);
      expect(res.body.some((p: any) => p.name === "milk")).toBe(false);
    });

    it("should fail when deleting non-existing product", async () => {
      const res = await request(app).delete("/api/product/milk");

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/not found/i);
    });
  });
});
