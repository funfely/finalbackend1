import ProductManagerMongo from "../dao/ProductManagerMongo.js";

const productManager = new ProductManagerMongo();

export const getProducts = async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.json({ status: "success", payload: products });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
