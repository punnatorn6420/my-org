export default function LayoutBuilderPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold tracking-wide text-foreground/80">
          Content
        </p>
        <h1 className="mt-4 text-5xl font-extrabold tracking-tight">
          Layout Builder
        </h1>
      </div>

      <div className="rounded-2xl border border-dashed border-border bg-card p-8">
        <p className="text-lg text-muted-foreground">
          This area will be used to arrange homepage sections in order.
        </p>
      </div>

      <div className="space-y-4">
        {[
          'Header',
          'Hero Booking',
          'Quick Actions',
          'Promo Links',
          'Popular Destinations',
          'Footer',
        ].map((item, index) => (
          <div
            key={item}
            className="flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4"
          >
            <div>
              <p className="font-medium">
                {index + 1}. {item}
              </p>
              <p className="text-sm text-muted-foreground">
                Drag-and-drop placeholder
              </p>
            </div>
            <div className="rounded-md border border-border px-3 py-1 text-sm text-muted-foreground">
              Move
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
