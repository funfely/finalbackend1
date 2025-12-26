import { Router } from "express";
import ProductManagerMongo from "../dao/ProductManagerMongo.js";

const router = Router();
const productManager = new ProductManagerMongo();

router.get("/", async (req, res) => {
  try {
    let { limit = 10, page = 1, sort, query } = req.query;

    limit = parseInt(limit);
    page = parseInt(page);

    const filter = {};
    if (query) {
      if (query === "true" || query === "false") {
        filter.status = query === "true";
      } else {
        filter.category = query;
      }
    }

    const sortOption = {};
    if (sort) {
      sortOption.price = sort === "asc" ? 1 : -1;
    }

    const result = await productManager.getProducts(filter, {
      limit,
      page,
      sort: sortOption,
      lean: true
    });

    res.json({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage
        ? `/api/products?page=${result.prevPage}`
        : null,
      nextLink: result.hasNextPage
        ? `/api/products?page=${result.nextPage}`
        : null
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: error.message });
  }
});

export default router;

