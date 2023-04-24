import express from "express";
import createProductHighlight from "../controllers/product.controller";

const router = express.Router();

router.post("/api/products-highlight/create", createProductHighlight);

export default router;
