import mongoose from "mongoose";
import ProductHighlight from "../models/product.model.js";

const createProductHighlight = async (req, res) => {
  try {
    const data = new ProductHighlight(req.body);
    const newData = await data.save();
    return res.status(200).json({ result: newData, message: "success!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default createProductHighlight;
