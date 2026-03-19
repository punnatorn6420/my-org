export default function PublishPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold tracking-wide text-foreground/80">
          Publishing
        </p>
        <h1 className="mt-4 text-5xl font-extrabold tracking-tight">Publish</h1>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold">Current Status</h2>
        <p className="mt-2 text-muted-foreground">
          Draft homepage is ready for review. No real backend is connected yet.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold">Draft Snapshot</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Saved 5 minutes ago by Admin User
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold">Published Snapshot</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Last published yesterday at 16:40
          </p>
        </div>
      </div>
    </div>
  );
}
