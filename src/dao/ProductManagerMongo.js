import ProductModel from "../models/product.model.js";

export default class ProductManagerMongo {

  async getProducts(filter = {}, options = {}) {
    return await ProductModel.paginate(filter, options);
  }

  async addProduct(product) {
    return await ProductModel.create(product);
  }

  async deleteProduct(id) {
    return await ProductModel.findByIdAndDelete(id);
  }

  async getProductById(id) {
    return await ProductModel.findById(id).lean();
  }
}
