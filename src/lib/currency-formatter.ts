export const currencyFormatter = (value: number) => {
  return value.toLocaleString("es-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
};
