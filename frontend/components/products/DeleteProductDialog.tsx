
import { Product } from "@/types/product";

interface DeleteProductDialogProps {
  product: Product;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteProductDialog({
  product,
  onConfirm,
  onCancel,
}: DeleteProductDialogProps) {
  return (
    <div className="space-y-5">
      <div className="rounded-lg bg-red-50 p-4 dark:bg-red-500/10">
        <p className="text-sm text-red-800 dark:text-red-300">
          You are about to remove the product below from this demonstration
          product list.
        </p>
      </div>

      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Product
        </p>

        <p className="mt-1 font-semibold text-slate-900 dark:text-white">
          {product.name}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          SKU: {product.sku}
        </p>
      </div>

      <div className="flex justify-end gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
        <button
          onClick={onCancel}
          className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium dark:border-slate-700"
        >
          Cancel
        </button>

        <button
          onClick={onConfirm}
          className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
        >
          Confirm Delete
        </button>
      </div>
    </div>
  );
}
