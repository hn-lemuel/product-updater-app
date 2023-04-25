import mongoose from "mongoose";
import ProductHighlight from "../models/product.model.js";

export const createProductHighlight = async (req, res) => {
  try {
    const data = new ProductHighlight(req.body);
    const newData = await data.save();
    return res.status(200).json({ result: newData, message: "success!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProductHighlight = async (req, res) => {
  try {
    const params = req.query;
    const product = await ProductHighlight.find({
      product_id: params.id,
    });
    return res.status(200).json({
      message: "SUCCESS FETCH",
      data: product,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

export const updateProductHighlight = async (req, res) => {
  try {
    const data = req.body;
    const product = await ProductHighlight.findOneAndUpdate(
      {
        product_id: data.product_id,
      },
      {
        isHotItem: data.isHotItem,
        name: data.name,
      },
      { new: true }
    );
    return res.status(200).json({
      message: "Update complete",
      data: product,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

// get data
// no id create
// if yes update
