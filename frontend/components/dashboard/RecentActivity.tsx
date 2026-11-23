
const activities = [
  {
    id: 1,
    product: "Wireless Mouse",
    action: "Stock added",
    quantity: "+50 units",
    date: "Today, 10:30 AM",
    type: "added",
  },
  {
    id: 2,
    product: "Mechanical Keyboard",
    action: "Stock sold",
    quantity: "-12 units",
    date: "Today, 09:15 AM",
    type: "sold",
  },
  {
    id: 3,
    product: "USB-C Cable",
    action: "Stock adjusted",
    quantity: "-3 units",
    date: "Yesterday, 04:20 PM",
    type: "adjusted",
  },
  {
    id: 4,
    product: "Laptop Stand",
    action: "Stock added",
    quantity: "+25 units",
    date: "Yesterday, 11:00 AM",
    type: "added",
  },
];

const activityStyles = {
  added: "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
  sold: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
  adjusted: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
};

export default function RecentActivity() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Recent Stock Activity
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Latest inventory movements
        </p>
      </div>

      <div className="space-y-5">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 last:border-0 last:pb-0 dark:border-slate-800"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-lg dark:bg-slate-800">
                {activity.type === "added"
                  ? "↗"
                  : activity.type === "sold"
                    ? "↘"
                    : "↔"}
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {activity.product}
                </p>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {activity.action} · {activity.date}
                </p>
              </div>
            </div>

            <span
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${activityStyles[activity.type as keyof typeof activityStyles]}`}
            >
              {activity.quantity}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
