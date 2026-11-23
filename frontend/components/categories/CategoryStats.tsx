interface CategoryStatsProps {
  total: number;
  active: number;
  inactive: number;
}

export default function CategoryStats({
  total,
  active,
  inactive,
}: CategoryStatsProps) {
  const stats = [
    {
      title: "Total Categories",
      value: total,
      description: "All registered categories",
    },
    {
      title: "Active Categories",
      value: active,
      description: "Available for products",
    },
    {
      title: "Inactive Categories",
      value: inactive,
      description: "Currently disabled",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
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