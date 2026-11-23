import type { InventoryItem } from "@/types/inventory";

interface InventoryTableProps {
  items: InventoryItem[];
  onStockMovement: (item: InventoryItem) => void;
}

function getStockStatus(item: InventoryItem) {
  if (item.quantity === 0) {
    return "OUT_OF_STOCK";
  }

  if (item.quantity < item.reorderLevel) {
    return "LOW_STOCK";
  }

  return "HEALTHY";
}

const statusStyles = {
  HEALTHY:
    "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  LOW_STOCK:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  OUT_OF_STOCK:
    "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
};

const statusLabels = {
  HEALTHY: "Healthy",
  LOW_STOCK: "Low Stock",
  OUT_OF_STOCK: "Out of Stock",
};

export default function InventoryTable({
  items,
  onStockMovement,
}: InventoryTableProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center dark:border-gray-800 dark:bg-gray-900">
        <p className="font-medium text-gray-900 dark:text-white">
          No inventory records found
        </p>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Change your filters and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <table className="w-full min-w-[850px] text-left text-sm">
        <thead className="bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          <tr>
            <th className="px-5 py-4">Product</th>
            <th className="px-5 py-4">SKU</th>
            <th className="px-5 py-4">Category</th>
            <th className="px-5 py-4">Available Stock</th>
            <th className="px-5 py-4">Reorder Level</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Action</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => {
            const status = getStockStatus(item);

            return (
              <tr
                key={item.id}
                className="border-t border-gray-100 dark:border-gray-800"
              >
                <td className="px-5 py-4 font-medium text-gray-900 dark:text-white">
                  {item.productName}
                </td>

                <td className="px-5 py-4 text-gray-500 dark:text-gray-400">
                  {item.sku}
                </td>

                <td className="px-5 py-4">
                  {item.category}
                </td>

                <td className="px-5 py-4 font-semibold">
                  {item.quantity} {item.unit}
                </td>

                <td className="px-5 py-4">
                  {item.reorderLevel} {item.unit}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
                  >
                    {statusLabels[status]}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <button
                    onClick={() => onStockMovement(item)}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Update Stock
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}