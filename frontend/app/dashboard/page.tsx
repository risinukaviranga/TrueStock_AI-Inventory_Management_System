
import DashboardLayout from "@/components/layout/DashboardLayout";

import StatCard from "@/components/dashboard/StatCard";
import InventoryOverview from "@/components/dashboard/InventoryOverview";
import RecentActivity from "@/components/dashboard/RecentActivity";
import LowStockTable from "@/components/dashboard/LowStockTable";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Dashboard Heading */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Dashboard Overview
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Welcome to TrueStock AI. Here is an overview of your business inventory.
          </p>
        </div>

        {/* Statistics Cards */}
        <section>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

            <StatCard
              title="Total Products"
              value="1,250"
              description="Registered products"
              icon="📦"
              accent="blue"
            />

            <StatCard
              title="Total Stock"
              value="8,420"
              description="Units currently available"
              icon="🏬"
              accent="green"
            />

            <StatCard
              title="Low Stock Items"
              value="24"
              description="Products need attention"
              icon="⚠️"
              accent="amber"
            />

            <StatCard
              title="Total Suppliers"
              value="85"
              description="Registered suppliers"
              icon="🚚"
              accent="violet"
            />

          </div>
        </section>

        {/* Inventory Overview */}
        <InventoryOverview />

        {/* Recent Activity and Low Stock */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          <RecentActivity />

          <LowStockTable />

        </section>

        {/* Dashboard Footer */}
        <div className="border-t border-slate-200 pt-5 dark:border-slate-800">
          <p className="text-center text-xs text-slate-400">
            TrueStock AI — Smart Inventory Management System
          </p>
        </div>

      </div>
    </DashboardLayout>
  );
}
