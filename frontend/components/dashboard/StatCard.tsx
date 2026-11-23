
interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: string;
  accent: "blue" | "green" | "amber" | "violet";
}

const accentStyles = {
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
  green: "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  violet: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400",
};

export default function StatCard({
  title,
  value,
  description,
  icon,
  accent,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${accentStyles[accent]}`}
        >
          {icon}
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}
