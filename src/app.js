import express from "express";
import handlebars from "express-handlebars";
import "./config/db.js";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";

const app = express();

/* ======================
   MIDDLEWARES
====================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ======================
   HANDLEBARS
====================== */
app.engine(
  "handlebars",
  handlebars.engine()
);
app.set("view engine", "handlebars");
app.set("views", "./src/views");

/* ======================
   ROUTES
====================== */
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

export default app;

