import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductByIdSlugAction } from "../actions/get-product-by-idSlug.action";
import { createUpdateProductAction } from "@/admin/actions/create-update-product.action";

export const useProductByIdSlug = (idSlug: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["product", { idSlug }],
    queryFn: () => getProductByIdSlugAction(idSlug || ""),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const mutation = useMutation({
    mutationFn: createUpdateProductAction,
    onSuccess: (product) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({
        queryKey: ["product", { idSlug: product.id }],
      });
      queryClient.setQueryData(["product", { idSlug: product.id }], product);
    },
  });

  return { ...query, mutation };
};
