import { Router } from "express";
import CartManagerMongo from "../dao/CartManagerMongo.js";

const router = Router();
const cartManager = new CartManagerMongo();

router.get("/:cid", async (req, res) => {
  const cart = await cartManager.getCartById(req.params.cid);
  res.json({ status: "success", payload: cart });
});

router.put("/:cid", async (req, res) => {
  await cartManager.updateCart(req.params.cid, req.body.products);
  res.json({ status: "success" });
});

router.put("/:cid/products/:pid", async (req, res) => {
  await cartManager.updateQuantity(
    req.params.cid,
    req.params.pid,
    req.body.quantity
  );
  res.json({ status: "success" });
});

router.delete("/:cid/products/:pid", async (req, res) => {
  await cartManager.deleteProduct(req.params.cid, req.params.pid);
  res.json({ status: "success" });
});

router.delete("/:cid", async (req, res) => {
  await cartManager.emptyCart(req.params.cid);
  res.json({ status: "success" });
});

export default router;
