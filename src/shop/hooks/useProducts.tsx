import { useQuery } from "@tanstack/react-query";
import { getProductsAction } from "../actions/get-products.action";
import { useParams, useSearchParams } from "react-router";

const splitPrice = (price?: string) => {
  if (!price || price === "any")
    return {
      minPrice: undefined,
      maxPrice: undefined,
    };

  const minPriceSlice = +price.split("-")[0] || +price.split("+")[0] || 0;
  const minPrice = isNaN(minPriceSlice) ? undefined : minPriceSlice;

  const maxPriceSlice = +price.split("-")[1];
  const maxPrice = isNaN(maxPriceSlice) ? undefined : maxPriceSlice;

  return {
    minPrice,
    maxPrice,
  };
};

export const useProducts = () => {
  const [searchParams] = useSearchParams();
  const { gender } = useParams();

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 9;
  const sizes = searchParams.get("sizes") || undefined;
  const price = searchParams.get("price") || undefined;
  const query = searchParams.get("query") || "";

  const { maxPrice, minPrice } = splitPrice(price);

  const offset = (Number(page) - 1) * Number(limit);

  return useQuery({
    queryKey: ["products", { offset, limit, gender, sizes, price, query }],
    queryFn: () =>
      getProductsAction({
        limit: isNaN(+limit) ? 9 : limit,
        offset: isNaN(+offset) ? 9 : offset,
        gender,
        sizes,
        minPrice,
        maxPrice,
        query,
      }),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};
