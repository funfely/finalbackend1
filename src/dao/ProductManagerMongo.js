import { ProductModel } from "../models/product.model.js";

export default class ProductManagerMongo {

  async getProducts(filter, options) {
    return await ProductModel.paginate(filter, options);
  }

}
