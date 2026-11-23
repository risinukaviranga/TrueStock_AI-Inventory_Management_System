import Link from "next/link";
import { navigationItems } from "@/config/navigation";

export default function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950 md:block">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-blue-600">
          TrueStock AI
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Smart Inventory Platform
        </p>
      </div>

      <nav className="space-y-2">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-lg px-4 py-3 text-sm text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}