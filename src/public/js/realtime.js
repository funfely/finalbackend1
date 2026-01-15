const socket = io();

// Agregar producto
const addProduct = () => {
  const title = document.getElementById("title").value;
  const price = Number(document.getElementById("price").value);

  if (!title || !price) return;

  socket.emit("newProduct", {
    title,
    price,
    description: "Producto realtime",
    category: "realtime",
    stock: 10,
    status: true
  });

  document.getElementById("title").value = "";
  document.getElementById("price").value = "";
};

// Eliminar producto
const deleteProduct = (id) => {
  socket.emit("deleteProduct", id);
};

// Recibir lista actualizada
socket.on("updateProducts", (products) => {
  const list = document.getElementById("product-list");
  list.innerHTML = "";

  products.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${p.title} - $${p.price}
      <button onclick="deleteProduct('${p._id}')">Eliminar</button>
    `;
    list.appendChild(li);
  });
});


