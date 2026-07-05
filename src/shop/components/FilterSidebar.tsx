import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "react-router";

type Price = "any" | "0-50" | "50-100" | "100-200" | "200+";
type Size = "xs" | "s" | "m" | "l" | "xl" | "xxl";
type Sizes = { id: Size; label: string }[];

const sizes: Sizes = [
  { id: "xs", label: "XS" },
  { id: "s", label: "S" },
  { id: "m", label: "M" },
  { id: "l", label: "L" },
  { id: "xl", label: "XL" },
  { id: "xxl", label: "XXL" },
];

export const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSizes = searchParams.get("sizes")?.split(",") || [];
  const currentPrice = searchParams.get("price") || "any";

  const handleSizeChange = (size: Size) => {
    const newSizes = currentSizes.includes(size)
      ? currentSizes.filter((s) => s !== size)
      : [...currentSizes, size];

    const newParams = new URLSearchParams(searchParams);

    if (newSizes.length === 0) {
      newParams.delete("sizes");
    } else {
      newParams.set("sizes", newSizes.join(","));
    }

    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const handlePriceChange = (price: Price) => {
    const newParams = new URLSearchParams(searchParams);

    if (price === "any") {
      newParams.delete("price");
    } else {
      newParams.set("price", price);
    }

    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  return (
    <div className="w-64 space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-4">Filtros</h3>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h4 className="font-medium">Tallas</h4>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <Button
              key={size.id}
              variant={`${currentSizes.includes(size.id) ? "default" : "outline"}`}
              size="sm"
              className="h-8"
              onClick={() => handleSizeChange(size.id)}
            >
              {size.label}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-4">
        <h4 className="font-medium">Precio</h4>
        <RadioGroup
          value={currentPrice}
          className="space-y-3"
          onValueChange={(value) => handlePriceChange(value as Price)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="any" id="priceAny" />
            <Label htmlFor="priceAny" className="text-sm cursor-pointer">
              Cualquier precio
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0-50" id="price1" />
            <Label htmlFor="price1" className="text-sm cursor-pointer">
              $0 - $50
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="50-100" id="price2" />
            <Label htmlFor="price2" className="text-sm cursor-pointer">
              $50 - $100
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="100-200" id="price3" />
            <Label htmlFor="price3" className="text-sm cursor-pointer">
              $100 - $200
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="200+" id="price4" />
            <Label htmlFor="price4" className="text-sm cursor-pointer">
              $200+
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
