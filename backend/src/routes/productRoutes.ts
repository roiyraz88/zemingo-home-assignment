import { Router } from "express";
import { getAllProducts, addProduct } from "../controllers/productController";

const router = Router();

router.get("/all", getAllProducts);
router.put("/", addProduct);

export default router;
