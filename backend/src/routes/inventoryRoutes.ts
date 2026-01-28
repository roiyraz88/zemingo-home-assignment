import { Router } from "express";
import {
  getInventory,
  setInventory,
  resetInventory,
} from "../controllers/inventoryController";

const router = Router();

router.get("/", getInventory);
router.post("/", setInventory);
router.post("/reset", resetInventory);

export default router;
