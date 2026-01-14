const socket = io();

// Agregar producto
const addProduct = () => {
  const title = document.getElementById("title").value;
  const price = Number(document.getElementById("price").value);

  const product = {
    title,
    price,
    description: "Producto realtime",
    category: "realtime",
    stock: 10,
    status: true
  };

  socket.emit("addProduct", product);
};

// Eliminar producto
const deleteProduct = (id) => {
  socket.emit("deleteProduct", id);
};

// Actualizar lista
socket.on("productsUpdated", () => {
  location.reload();
});

