import { Router } from "express";
import { getAllProducts, addProduct } from "../controllers/productController";

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
 *             example:
 *               - name: shampoo
 *               - name: milk
 *               - name: eggs
 */
router.get("/all", getAllProducts);

/**
 * @swagger
 * /product:
 *   put:
 *     summary: Add a new product
 *     description: Adds a new product to the system
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
 *             name: new product
 *     responses:
 *       200:
 *         description: Updated list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             examples:
 *               duplicate:
 *                 value:
 *                   error: product name already exists
 *               invalid:
 *                 value:
 *                   error: invalid product, name is missing
 */
router.put("/", addProduct);

export default router;
