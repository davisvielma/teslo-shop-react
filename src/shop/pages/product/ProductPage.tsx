import { CustomJumbotron } from "@/shop/components/CustomJumbotron";
import { useProductByIdSlug } from "@/shop/hooks/useProductByIdSlug";
import { Navigate, useParams } from "react-router";
import { Badge } from "@/components/ui/badge";
import { CustmFullScreenLoading } from "@/components/custom/CustmFullScreenLoading";

export const ProductPage = () => {
  const { idSlug } = useParams();

  const { data: product, isLoading } = useProductByIdSlug(idSlug || "");

  if (isLoading) {
    return <CustmFullScreenLoading />;
  }

  if (!product) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <CustomJumbotron title={product.title} subTitle={product.description} />

      <div className="flex flex-col md:flex-row gap-2 justify-center items-center md:items-start p-4 md:p-8">
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-full w-full object-cover p-2 rounded-md shadow-2xl max-w-md"
        />

        <div className="flex flex-col p-2 gap-2">
          <h2 className="text-2xl font-semibold">Genero: {product.gender}</h2>
          <p className="text-lg text-muted-foreground">
            En existencia: {product.stock} | Tallas: {product.sizes.join(", ")}
          </p>
          <div className="flex items-center gap-1">
            <p>Tags:</p>
            {product.tags.map((tag) => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
          </div>
          <p className="text-lg font-bold mb-4">Precio: ${product.price}</p>
        </div>
      </div>
    </>
  );
};
