
const stockData = [
  {
    label: "Healthy Stock",
    percentage: 60,
    color: "bg-blue-500",
    quantity: "5,052 units",
  },
  {
    label: "Low Stock",
    percentage: 25,
    color: "bg-amber-500",
    quantity: "2,105 units",
  },
  {
    label: "Critical Stock",
    percentage: 15,
    color: "bg-red-500",
    quantity: "1,263 units",
  },
];

export default function InventoryOverview() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Inventory Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Current stock distribution across your inventory
          </p>
        </div>

        <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
          Sample Data
        </span>
      </div>

      <div className="mb-6 flex h-4 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        {stockData.map((item) => (
          <div
            key={item.label}
            className={`${item.color} h-full transition-all`}
            style={{ width: `${item.percentage}%` }}
            title={`${item.label}: ${item.percentage}%`}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stockData.map((item) => (
          <div key={item.label}>
            <div className="flex items-center gap-2">
              <span
                className={`h-3 w-3 rounded-full ${item.color}`}
              />

              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {item.label}
              </p>
            </div>

            <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              {item.percentage}%
            </h3>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {item.quantity}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
