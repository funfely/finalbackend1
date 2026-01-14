import { ProductModel } from "../models/product.model.js";

export default class ProductManagerMongo {

  async getProducts(filter = {}, options = {}) {
    return await ProductModel.paginate(filter, options);
  }

  async getProductById(id) {
    return await ProductModel.findById(id);
  }

  async createProduct(productData) {
    return await ProductModel.create(productData);
  }

  async deleteProduct(id) {
    return await ProductModel.findByIdAndDelete(id);
  }

}
