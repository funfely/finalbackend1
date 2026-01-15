import app from "./app.js";
import { Server } from "socket.io";
import ProductManagerMongo from "./dao/ProductManagerMongo.js";

const PORT = 8080;

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

const io = new Server(httpServer);
const productManager = new ProductManagerMongo();

io.on("connection", async (socket) => {
  console.log("Cliente conectado");

  // Enviar productos al conectar
  const products = await productManager.getProducts();
  socket.emit("updateProducts", products.docs);

  // AGREGAR producto
  socket.on("newProduct", async (product) => {
    await productManager.addProduct(product);
    const updatedProducts = await productManager.getProducts();
    io.emit("updateProducts", updatedProducts.docs);
  });

  // ELIMINAR producto
  socket.on("deleteProduct", async (id) => {
    await productManager.deleteProduct(id);
    const updatedProducts = await productManager.getProducts();
    io.emit("updateProducts", updatedProducts.docs);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});