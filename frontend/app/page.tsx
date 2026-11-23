import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";

export default function Home() {
  return (
    <DashboardLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Welcome to TrueStock AI
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Your intelligent inventory management platform.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Products"
            value="1,250"
            description="Sample dashboard data"
          />

          <StatCard
            title="Total Stock"
            value="8,420"
            description="Sample dashboard data"
          />

          <StatCard
            title="Low Stock Items"
            value="24"
            description="Sample dashboard data"
          />

          <StatCard
            title="Total Suppliers"
            value="85"
            description="Sample dashboard data"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
