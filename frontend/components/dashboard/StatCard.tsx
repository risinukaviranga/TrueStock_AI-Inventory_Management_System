import Card from "@/components/ui/Card";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
}

export default function StatCard({
  title,
  value,
  description,
}: StatCardProps) {
  return (
    <Card>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
        {value}
      </h2>

      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </Card>
  );
}