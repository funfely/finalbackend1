import { CartModel } from "../models/cart.model.js";

export default class CartManagerMongo {

  async getCartById(cid) {
    return await CartModel.findById(cid).populate("products.product");
  }

  async updateCart(cid, products) {
    return await CartModel.updateOne(
      { _id: cid },
      { $set: { products } }
    );
  }

  async deleteProduct(cid, pid) {
    return await CartModel.updateOne(
      { _id: cid },
      { $pull: { products: { product: pid } } }
    );
  }

  async updateQuantity(cid, pid, quantity) {
    return await CartModel.updateOne(
      { _id: cid, "products.product": pid },
      { $set: { "products.$.quantity": quantity } }
    );
  }

  async emptyCart(cid) {
    return await CartModel.updateOne(
      { _id: cid },
      { $set: { products: [] } }
    );
  }
}
