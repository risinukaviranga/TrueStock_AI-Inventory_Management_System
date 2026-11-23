export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-slate-800 dark:bg-slate-950">
      <div>
        <h2 className="font-semibold text-slate-900 dark:text-white">
          Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Administrator
        </span>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
          A
        </div>
      </div>
    </header>
  );
}