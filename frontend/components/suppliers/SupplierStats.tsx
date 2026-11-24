interface SupplierStatsProps {
  suppliers: {
    status: "ACTIVE" | "INACTIVE";
  }[];
}

export default function SupplierStats({
  suppliers,
}: SupplierStatsProps) {
  const total = suppliers.length;

  const active = suppliers.filter(
    (supplier) => supplier.status === "ACTIVE"
  ).length;

  const inactive = total - active;

  const stats = [
    { title: "Total Suppliers", value: total },
    { title: "Active Suppliers", value: active },
    { title: "Inactive Suppliers", value: inactive },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
        </div>
      ))}
    </div>
  );
}