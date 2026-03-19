export default function SectionsPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold tracking-wide text-foreground/80">
          Content
        </p>
        <h1 className="mt-4 text-5xl font-extrabold tracking-tight">
          Sections
        </h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          'Hero Booking',
          'Promo Links',
          'Popular Destinations',
          'Flight Deals',
          'Why Fly',
          'Travel Simple',
        ].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold">{item}</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Manage the content, labels, images, and configuration for this
              reusable homepage section.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
