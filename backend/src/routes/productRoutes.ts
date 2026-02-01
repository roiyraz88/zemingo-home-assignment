import { Router } from "express";
import {
  getAllProducts,
  upsertProduct,
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
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 */
router.get("/all", getAllProducts);

/**
 * @swagger
 * /product:
 *   put:
 *     summary: Create or update a product
 *     description: |
 *       If _id is provided → updates the product name.  
 *       If _id is missing → creates a new product.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               name:
 *                 type: string
 *             required:
 *               - name
 *           examples:
 *             create:
 *               summary: Create product
 *               value:
 *                 name: milk
 *             update:
 *               summary: Update product
 *               value:
 *                 _id: 64f123abc123
 *                 name: almond milk
 *     responses:
 *       200:
 *         description: Updated list of products
 *       400:
 *         description: Bad request
 */
router.put("/", upsertProduct);

/**
 * @swagger
 * /product/{name}:
 *   delete:
 *     summary: Delete a product
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
 *       400:
 *         description: Product not found
 */
router.delete("/:name", deleteProduct);

export default router;
