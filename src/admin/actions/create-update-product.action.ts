import { tesloApi } from "@/api/teslo-api";
import type { Product } from "@/interfaces/product.interface";
import { sleep } from "@/lib/sleep";

export const createUpdateProductAction = async (
  productLike: Partial<Product> & { files?: File[] },
): Promise<Product> => {
  await sleep(1500);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, user, images = [], files = [], ...productRest } = productLike;

  if (files.length > 0) {
    const newImageNames = await uploadFiles(files);
    images.push(...newImageNames);
  }

  const imagesToSaved = images.map((image) => {
    if (image.includes("http")) return image.split("/").pop() || "";

    return image;
  });

  productRest.stock = isNaN(productRest.stock || 0)
    ? 0
    : Number(productRest.stock);
  productRest.price = isNaN(productRest.price || 0)
    ? 0
    : Number(productRest.price);

  const { data } = await tesloApi<Product>({
    url: id === "new" ? "/products" : `/products/${id}`,
    method: id === "new" ? "POST" : "PATCH",
    data: { ...productRest, images: imagesToSaved },
  });

  const imagesUrl = data.images.map((image) => {
    if (image.includes("http")) return image;

    return `${import.meta.env.VITE_API_URL}/files/product/${image}`;
  });

  return { ...data, images: imagesUrl };
};

export interface FileUploadResponse {
  secureUrl: string;
  fileName: string;
}

const uploadFiles = async (files: File[]) => {
  const uploadPromises = files.map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await tesloApi.post<FileUploadResponse>(
      "/files/product",
      formData,
    );

    return data.fileName;
  });

  const uploadedFilesNames = await Promise.all(uploadPromises);
  return uploadedFilesNames;
};
