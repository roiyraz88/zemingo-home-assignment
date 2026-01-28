import { Router } from "express";
import {
  getInventory,
  setInventory,
  resetInventory,
} from "../controllers/inventoryController";

const router = Router();

/**
 * @swagger
 * /inventory:
 *   get:
 *     summary: Get inventory
 *     responses:
 *       200:
 *         description: Inventory list
 */
router.get("/", getInventory);

/**
 * @swagger
 * /inventory:
 *   post:
 *     summary: Set inventory
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 quantity:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Updated inventory
 */
router.post("/", setInventory);

/**
 * @swagger
 * /inventory/reset:
 *   post:
 *     summary: Reset inventory
 *     responses:
 *       200:
 *         description: Empty inventory
 */
router.post("/reset", resetInventory);


export default router;
