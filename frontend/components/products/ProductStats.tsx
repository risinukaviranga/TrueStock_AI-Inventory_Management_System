
import { Product } from "@/types/product";

interface ProductStatsProps {
  products: Product[];
}

export default function ProductStats({
  products,
}: ProductStatsProps) {
  const totalProducts = products.length;

  const activeProducts = products.filter(
    (product) => product.status === "ACTIVE"
  ).length;

  const categories = new Set(
    products.map((product) => product.category)
  ).size;

  const lowStockProducts = products.filter(
    (product) => product.currentStock <= product.reorderLevel
  ).length;

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: "📦",
      color: "blue",
    },
    {
      title: "Active Products",
      value: activeProducts,
      icon: "✅",
      color: "green",
    },
    {
      title: "Categories",
      value: categories,
      icon: "🗂️",
      color: "violet",
    },
    {
      title: "Low Stock",
      value: lowStockProducts,
      icon: "⚠️",
      color: "amber",
    },
  ];

  const styles: Record<string, string> = {
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
    green: "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    violet: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  };

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {stat.title}
            </p>

            <span
              className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ${styles[stat.color]}`}
            >
              {stat.icon}
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">
            {stat.value}
          </h2>
        </div>
      ))}
    </div>
  );
}
