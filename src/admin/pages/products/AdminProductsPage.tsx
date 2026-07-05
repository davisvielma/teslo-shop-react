import { AdminTitle } from "@/admin/components/AdminTitle";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currencyFormatter } from "@/lib/currency-formatter";
import { useProducts } from "@/shop/hooks/useProducts";
import { PencilIcon, PlusIcon } from "lucide-react";
import { Link } from "react-router";

export const AdminProductsPage = () => {
  const { data, isLoading } = useProducts();

  return (
    <>
      <div className="flex justify-between items-center">
        <AdminTitle
          title="Productos"
          subTitle="Aqui puedes administrar tus productos"
        />

        <div className="flex justify-end mb-10 gap-4">
          <Link to="/admin/products/new">
            <Button>
              <PlusIcon />
              Nuevo producto
            </Button>
          </Link>
        </div>
      </div>

      <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
        <TableHeader>
          <TableRow>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Inventario</TableHead>
            <TableHead>Tallas</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <TableRow
                  key={`skeleton-row-${index}`}
                  className="animate-pulse duration-75 transition-colors"
                >
                  {Array.from({ length: 7 }).map((_, index) => (
                    <TableCell
                      key={`skeleton-cell-${index}`}
                      className="h-28 bg-gray-300/30 "
                    />
                  ))}
                </TableRow>
              ))
            : data?.products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      alt={product.title}
                      src={product.images[0]}
                      className="object-cover rounded-md shadow-lg max-h-28 max-w-28"
                    />
                  </TableCell>
                  <TableCell>
                    <Link
                      className="hover:text-blue-500 underline underline-offset-2"
                      to={`/admin/products/${product.id}`}
                    >
                      {product.title}
                    </Link>
                  </TableCell>
                  <TableCell>{currencyFormatter(product.price)}</TableCell>
                  <TableCell>{product.gender}</TableCell>
                  <TableCell>{product.stock} stock</TableCell>
                  <TableCell>{product.sizes.join(", ")}</TableCell>
                  <TableCell>
                    <Link to={`/admin/products/${product.id}`}>
                      <div className="p-2 rounded-md hover:bg-blue-100 w-fit">
                        <PencilIcon className="text-blue-500 w-5 h-5 " />
                      </div>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>

      <CustomPagination totalPage={data?.pages || 0} />
    </>
  );
};
