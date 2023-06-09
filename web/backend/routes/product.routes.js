import express from "express";
import {
  getProductHighlight,
  createProductHighlight,
  updateProductHighlight,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/get", getProductHighlight);
router.post("/create", createProductHighlight);
router.put("/update", updateProductHighlight);

export default router;
