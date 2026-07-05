import { Navigate, useNavigate, useParams } from "react-router";

import { useProductByIdSlug } from "@/shop/hooks/useProductByIdSlug";
import { CustmFullScreenLoading } from "@/components/custom/CustmFullScreenLoading";
import { ProductForm } from "./ui/ProductForm";
import type { Product } from "@/interfaces/product.interface";
import { toast } from "sonner";

export const AdminProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isError,
    mutation,
  } = useProductByIdSlug(id || "");

  const handleSubmit = async (
    productLike: Partial<Product> & { files?: File[] },
  ) => {
    await mutation.mutateAsync(productLike, {
      onSuccess: (data) => {
        const message = `Producto ${id === "new" ? "creado" : "actualizado"} correctamente`;
        toast.success(message, { position: "top-right" });
        navigate(`/admin/products/${data.id}`);
        productLike.files = [];
      },
      onError: (error) => {
        console.log(error);
        const message = `Error al ${id === "new" ? "crear" : "actualizar"} producto`;
        toast.error(message, { position: "top-right" });
      },
    });
  };

  const productTitle = id === "new" ? "Nuevo producto" : "Editar producto";
  const productSubtitle =
    id === "new"
      ? "Aquí puedes crear un nuevo producto."
      : "Aquí puedes editar el producto.";

  if (isError) {
    return <Navigate to="/admin/products" />;
  }

  if (isLoading) {
    return <CustmFullScreenLoading />;
  }

  if (!product) {
    return <Navigate to="/admin/products" />;
  }

  return (
    <ProductForm
      title={productTitle}
      subTitle={productSubtitle}
      product={product}
      onSubmit={handleSubmit}
      isPosting={mutation.isPending}
    />
  );
};
