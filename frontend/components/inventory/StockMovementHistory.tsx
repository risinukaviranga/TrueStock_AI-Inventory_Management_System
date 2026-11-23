import type { StockMovement } from "@/types/inventory";

interface StockMovementHistoryProps {
  movements: StockMovement[];
}

export default function StockMovementHistory({
  movements,
}: StockMovementHistoryProps) {
  const sortedMovements = [...movements].sort(
    (a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (sortedMovements.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No stock movements have been recorded yet.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <table className="w-full min-w-[750px] text-left text-sm">
        <thead className="bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          <tr>
            <th className="px-5 py-4">Reference</th>
            <th className="px-5 py-4">Product</th>
            <th className="px-5 py-4">Type</th>
            <th className="px-5 py-4">Quantity</th>
            <th className="px-5 py-4">Reason</th>
            <th className="px-5 py-4">Date</th>
          </tr>
        </thead>

        <tbody>
          {sortedMovements.map((movement) => (
            <tr
              key={movement.id}
              className="border-t border-gray-100 dark:border-gray-800"
            >
              <td className="px-5 py-4 font-medium">
                {movement.id}
              </td>

              <td className="px-5 py-4">
                <p className="font-medium text-gray-900 dark:text-white">
                  {movement.productName}
                </p>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {movement.sku}
                </p>
              </td>

              <td className="px-5 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    movement.type === "IN"
                      ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                      : "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300"
                  }`}
                >
                  {movement.type === "IN" ? "Stock In" : "Stock Out"}
                </span>
              </td>

              <td className="px-5 py-4 font-semibold">
                {movement.type === "IN" ? "+" : "-"}
                {movement.quantity}
              </td>

              <td className="px-5 py-4 text-gray-500 dark:text-gray-400">
                {movement.reason}
              </td>

              <td className="px-5 py-4 text-gray-500 dark:text-gray-400">
                {new Date(movement.date).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}