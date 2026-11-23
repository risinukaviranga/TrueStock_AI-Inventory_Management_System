
import { Product } from "@/types/product";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onView: (product: Product) => void;
}

export default function ProductTable({
  products,
  onEdit,
  onDelete,
  onView,
}: ProductTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px] text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/70">
            <tr>
              {[
                "Product",
                "SKU",
                "Category",
                "Purchase Price",
                "Selling Price",
                "Stock",
                "Status",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/40"
              >
                <td className="px-5 py-4">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {product.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {product.description}
                  </p>
                </td>

                <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">
                  {product.sku}
                </td>

                <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">
                  {product.category}
                </td>

                <td className="px-5 py-4 text-sm text-slate-700 dark:text-slate-300">
                  Rs. {product.purchasePrice.toLocaleString()}
                </td>

                <td className="px-5 py-4 text-sm font-medium text-slate-900 dark:text-white">
                  Rs. {product.sellingPrice.toLocaleString()}
                </td>

                <td className="px-5 py-4">
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {product.currentStock} {product.unit}
                  </div>

                  <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Reorder: {product.reorderLevel}
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      product.status === "ACTIVE"
                        ? "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400"
                        : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onView(product)}
                      className="rounded-md px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10"
                    >
                      View
                    </button>

                    <button
                      onClick={() => onEdit(product)}
                      className="rounded-md px-2 py-1 text-xs font-medium text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-500/10"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(product)}
                      className="rounded-md px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-5 py-12 text-center text-sm text-slate-500 dark:text-slate-400"
                >
                  No products found. Try changing your search or filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
