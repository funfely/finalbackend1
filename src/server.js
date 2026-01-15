import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app.js";
import ProductManagerMongo from "./dao/ProductManagerMongo.js";

const PORT = 8080;

// 👇 SERVIDOR HTTP REAL
const httpServer = createServer(app);

// 👇 SOCKET.IO MONTADO CORRECTAMENTE
const io = new Server(httpServer);

// DAO
const productManager = new ProductManagerMongo();

// SOCKETS
io.on("connection", (socket) => {
  console.log("🟢 SOCKET CONECTADO:", socket.id);

  socket.on("newProduct", async (product) => {
    console.log("➕ Producto recibido:", product);
    await productManager.addProduct(product);
    const result = await productManager.getProducts();
    io.emit("updateProducts", result.docs);
  });

  socket.on("deleteProduct", async (id) => {
    console.log("🗑️ Eliminar producto:", id);
    await productManager.deleteProduct(id);
    const result = await productManager.getProducts();
    io.emit("updateProducts", result.docs);
  });
});

// START
httpServer.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});
