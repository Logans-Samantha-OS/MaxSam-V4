export default function Page() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">Command Center</h1>

      <div className="h-2 w-full rounded bg-gradient-to-r from-cyan-500 to-blue-500" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <section className="rounded-lg border border-zinc-800 p-4">
          <h2 className="mb-2 text-lg font-semibold">Real-time Operations</h2>
          <p className="text-sm text-zinc-400">0 running</p>
        </section>

        <section className="rounded-lg border border-zinc-800 p-4">
          <h2 className="mb-2 text-lg font-semibold">Recent Activity</h2>
          <ul className="text-sm text-zinc-300 list-disc pl-5 space-y-1">
            <li>New lead scored</li>
            <li>Contract signed</li>
            <li>SMS sent</li>
          </ul>
        </section>

        <section className="rounded-lg border border-zinc-800 p-4">
          <h2 className="mb-2 text-lg font-semibold">AI Agents</h2>
          <p className="text-sm text-zinc-400">Sam — Processing leads</p>
          <p className="text-sm text-zinc-400">Eleanor — Analyzing docs</p>
        </section>
      </div>
    </main>
  );
}
