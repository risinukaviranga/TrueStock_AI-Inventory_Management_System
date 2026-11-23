import type { InventoryItem } from "@/types/inventory";

interface InventoryStatsProps {
  items: InventoryItem[];
}

export default function InventoryStats({
  items,
}: InventoryStatsProps) {
  const totalProducts = items.length;

  const totalUnits = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const lowStock = items.filter(
    (item) => item.quantity > 0 && item.quantity < item.reorderLevel
  ).length;

  const outOfStock = items.filter(
    (item) => item.quantity === 0
  ).length;

  const healthyStock = items.filter(
    (item) => item.quantity >= item.reorderLevel
  ).length;

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      description: "Products tracked in inventory",
    },
    {
      title: "Total Stock Units",
      value: totalUnits.toLocaleString(),
      description: "Combined available quantity",
    },
    {
      title: "Healthy Stock",
      value: healthyStock,
      description: "At or above reorder level",
    },
    {
      title: "Low Stock",
      value: lowStock,
      description: "Below reorder level",
    },
    {
      title: "Out of Stock",
      value: outOfStock,
      description: "Products with zero stock",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {stat.title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {stat.value}
          </h2>

          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {stat.description}
          </p>
        </div>
      ))}
    </div>
  );
}