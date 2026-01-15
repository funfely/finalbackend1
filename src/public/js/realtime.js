const socket = io();
console.log("🟢 Socket frontend conectado");

const addProduct = () => {
  const title = document.getElementById("title").value;
  const price = Number(document.getElementById("price").value);

  socket.emit("newProduct", {
    title,
    price,
    description: "Producto realtime",
    category: "realtime",
    stock: 10,
    status: true,
  });
};

const deleteProduct = (id) => {
  socket.emit("deleteProduct", id);
};

socket.on("updateProducts", (products) => {
  const list = document.getElementById("product-list");
  list.innerHTML = "";

  products.forEach((p) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${p.title} - $${p.price}
      <button onclick="deleteProduct('${p._id}')">Eliminar</button>
    `;
    list.appendChild(li);
  });
});


