import { Router } from "express";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

const router = Router();

/**
 * @swagger
 * /product/all:
 *   get:
 *     summary: Get all products
 *     description: Returns a list of all products in the system
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 */
router.get("/all", getAllProducts);

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Add a new product
 *     description: Adds a new product to the system
 */
router.post("/", addProduct);

/**
 * @swagger
 * /product/{oldName}:
 *   put:
 *     summary: Update a product name
 *     description: Updates an existing product name
 *     parameters:
 *       - in: path
 *         name: oldName
 *         required: true
 *         schema:
 *           type: string
 *         example: milk
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *           example:
 *             name: almond milk
 *     responses:
 *       200:
 *         description: Updated list of products
 *       400:
 *         description: Bad request
 */
router.put("/:oldName", updateProduct);

/**
 * @swagger
 * /product/{name}:
 *   delete:
 *     summary: Delete a product
 *     description: Deletes a product from the system by name
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         example: milk
 *     responses:
 *       200:
 *         description: Updated list of products
 *       404:
 *         description: Product not found
 */
router.delete("/:name", deleteProduct);

export default router;
