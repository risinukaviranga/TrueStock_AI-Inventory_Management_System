
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="max-w-2xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
          Smart Inventory Management
        </p>

        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          TrueStock <span className="text-blue-400">AI</span>
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-300">
          Manage inventory, monitor sales, understand your business
          and make smarter decisions with AI-powered insights.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500">
            Get Started
          </button>

          <button className="rounded-lg border border-slate-600 px-6 py-3 font-semibold hover:bg-slate-800">
            Learn More
          </button>
        </div>

        <p className="mt-12 text-sm text-slate-500">
          © 2026 TrueStock AI. All rights reserved.
        </p>
      </div>
    </main>
  );
}

