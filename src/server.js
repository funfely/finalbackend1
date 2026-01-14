import app from "./app.js";
import { Server } from "socket.io";
import ProductManagerMongo from "./dao/ProductManagerMongo.js";

const PORT = 8080;

// Levantamos servidor HTTP
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

// Socket.io
const io = new Server(httpServer);

// DAO
const productManager = new ProductManagerMongo();

// Conexión de sockets
io.on("connection", async (socket) => {
  console.log("Cliente conectado");

  // Enviar productos actuales al conectar
  const products = await productManager.getProducts();
  socket.emit("updateProducts", products.docs);

  // Agregar producto
  socket.on("newProduct", async (product) => {
    await productManager.addProduct(product);
    const updatedProducts = await productManager.getProducts();
    io.emit("updateProducts", updatedProducts.docs);
  });

  // Eliminar producto
  socket.on("deleteProduct", async (id) => {
    await productManager.deleteProduct(id);
    const updatedProducts = await productManager.getProducts();
    io.emit("updateProducts", updatedProducts.docs);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

export default io;

