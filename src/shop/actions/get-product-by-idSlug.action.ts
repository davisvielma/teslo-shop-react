import { tesloApi } from "@/api/teslo-api";
import type { Product } from "@/interfaces/product.interface";

export const getProductByIdSlugAction = async (idSlug: string) => {
  if (idSlug === "new") {
    return {
      id: "new",
      title: "",
      description: "",
      gender: "men",
      images: [],
      price: 0,
      sizes: [],
      slug: "",
      stock: 0,
      tags: [],
    } as unknown as Product;
  }

  const { data } = await tesloApi.get<Product>(`/products/${idSlug}`);

  const images = data.images.map((image) => {
    if (image.includes("http")) return image;

    return `${import.meta.env.VITE_API_URL}/files/product/${image}`;
  });

  return { ...data, images };
};
