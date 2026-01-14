import { Router } from "express";
import {
  renderProducts,
  renderProductDetail,
  renderRealtimeProducts
} from "../controllers/views.controller.js";

const router = Router();

// Listado de productos
router.get("/", renderProducts);

// Detalle de producto
router.get("/products/:pid", renderProductDetail);

// Realtime products
router.get("/realtimeproducts", renderRealtimeProducts);

export default router;
