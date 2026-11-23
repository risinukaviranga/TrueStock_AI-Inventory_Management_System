
import { Product } from "@/types/product";

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetails({
  product,
  onClose,
}: ProductDetailsProps) {
  const details = [
    ["Product ID", product.id],
    ["Product Name", product.name],
    ["SKU", product.sku],
    ["Category", product.category],
    ["Description", product.description || "No description"],
    ["Purchase Price", `LKR ${product.purchasePrice.toLocaleString()}`],
    ["Selling Price", `LKR ${product.sellingPrice.toLocaleString()}`],
    ["Current Stock", `${product.currentStock} ${product.unit}`],
    ["Reorder Level", `${product.reorderLevel} ${product.unit}`],
    ["Status", product.status],
    ["Created At", product.createdAt],
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {details.map(([label, value]) => (
          <div
            key={label}
            className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800"
          >
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {label}
            </p>

            <p className="mt-2 break-words text-sm font-semibold text-slate-900 dark:text-white">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-end border-t border-slate-200 pt-4 dark:border-slate-800">
        <button
          onClick={onClose}
          className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white dark:bg-white dark:text-slate-900"
        >
          Close
        </button>
      </div>
    </div>
  );
}
