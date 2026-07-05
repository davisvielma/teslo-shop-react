import { tesloApi } from "@/api/teslo-api";
import type { ProductsResponse } from "@/interfaces/products.response";

interface Options {
  offset?: number | string;
  limit?: number | string;
  gender?: string;
  sizes?: string;
  minPrice?: number;
  maxPrice?: number;
  query: string;
}

export const getProductsAction = async (options: Options) => {
  const { offset, limit, gender, sizes, maxPrice, minPrice, query } = options;

  const { data } = await tesloApi.get<ProductsResponse>("/products", {
    params: {
      limit,
      offset,
      gender,
      sizes,
      minPrice,
      maxPrice,
      q: query,
    },
  });

  const productsWithImageUrls = data.products.map((product) => ({
    ...product,
    images: product.images.map(
      (image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`,
    ),
  }));

  return { ...data, products: productsWithImageUrls };
};
