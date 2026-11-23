
interface LowStockProduct {
  id: number;
  name: string;
  sku: string;
  available: number;
  reorderLevel: number;
  status: "Low Stock" | "Critical";
}

const products: LowStockProduct[] = [
  {
    id: 1,
    name: "Wireless Mouse",
    sku: "WM-001",
    available: 5,
    reorderLevel: 20,
    status: "Critical",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    sku: "MK-002",
    available: 12,
    reorderLevel: 25,
    status: "Low Stock",
  },
  {
    id: 3,
    name: "USB-C Cable",
    sku: "UC-003",
    available: 8,
    reorderLevel: 30,
    status: "Critical",
  },
  {
    id: 4,
    name: "Laptop Stand",
    sku: "LS-004",
    available: 18,
    reorderLevel: 25,
    status: "Low Stock",
  },
];

export default function LowStockTable() {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-3 p-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Low Stock Products
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Products that need stock replenishment
          </p>
        </div>

        <span className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 dark:bg-red-500/10 dark:text-red-400">
          {products.length} Products
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/70">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Product
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                SKU
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Available
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Reorder Level
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {products.map((product) => (
              <tr
                key={product.id}
                className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
              >
                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                  {product.name}
                </td>

                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                  {product.sku}
                </td>

                <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                  {product.available}
                </td>

                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                  {product.reorderLevel}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      product.status === "Critical"
                        ? "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
