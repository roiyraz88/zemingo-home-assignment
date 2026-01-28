import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes";
import inventoryRoutes from "./routes/inventoryRoutes";

const app = express();

app.use(express.json());

app.use("/products", productRoutes);
app.use("/inventory", inventoryRoutes);

app.use(cors());

export default app;
