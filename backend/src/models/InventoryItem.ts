import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "quantity must be an integer",
    },
  },
});

export const InventoryItem = mongoose.model("InventoryItem", inventorySchema);
