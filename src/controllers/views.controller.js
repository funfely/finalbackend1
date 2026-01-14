import ProductManagerMongo from "../dao/ProductManagerMongo.js";

const productManager = new ProductManagerMongo();

/**
 * Listado de productos
 */
export const renderProducts = async (req, res) => {
  try {
    const result = await productManager.getProducts();

    res.render("products", {
      products: result.docs.map(p => p.toObject())
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error cargando productos");
  }
};

/**
 * Detalle de producto
 */
export const renderProductDetail = async (req, res) => {
  try {
    const { pid } = req.params;

    const product = await productManager.getProductById(pid);

    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }

    res.render("productDetail", {
      product: product.toObject()
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error cargando producto");
  }
};

/**
 * Vista realtime products
 */
export const renderRealtimeProducts = async (req, res) => {
  try {
    const result = await productManager.getProducts();

    res.render("realtimeproducts", {
      products: result.docs.map(p => p.toObject())
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error cargando productos en tiempo real");
  }
};

