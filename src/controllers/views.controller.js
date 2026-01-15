import ProductManagerMongo from "../dao/ProductManagerMongo.js";

const productManager = new ProductManagerMongo();

// Listado
export const renderProducts = async (req, res) => {
  try {
const result = await productManager.getProducts();
const products = result.docs.map(p => p.toObject());
res.render("products", { products });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error cargando productos");
  }
};

// Detalle
export const renderProductDetail = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);

    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }

    res.render("productDetail", { product });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error cargando producto");
  }
};

// Realtime
export const renderRealtimeProducts = async (req, res) => {
  try {
    const result = await productManager.getProducts();
    res.render("realtimeproducts", { products: result.docs });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error realtime");
  }
};

