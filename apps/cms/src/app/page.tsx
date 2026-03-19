export default function HomePage() {
  return (
    <div className="space-y-10">
      <div>
        <p className="text-sm font-semibold tracking-wide text-foreground/80">
          Introduction
        </p>
        <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl">
          Introduction
        </h1>
      </div>

      <section id="what-is-this-cms" className="space-y-5 border-t pt-10">
        <h2 className="text-3xl font-bold tracking-tight">What is this CMS?</h2>
        <p className="text-lg leading-9 text-muted-foreground">
          This CMS is a mockup content management interface inspired by the
          documentation experience of Kirimase. It focuses on a clean docs-like
          layout with a structured sidebar, large readable content area, and a
          contextual page outline.
        </p>
        <p className="text-lg leading-9 text-muted-foreground">
          Instead of being a developer documentation website, this version is
          adapted for managing sections, arranging layouts, previewing pages,
          and preparing content for publishing.
        </p>
      </section>

      <section id="why-this-layout" className="space-y-5 border-t pt-10">
        <h2 className="text-3xl font-bold tracking-tight">Why this layout?</h2>
        <p className="text-lg leading-9 text-muted-foreground">
          The layout is intentionally familiar, lightweight, and highly
          readable. It works well for admin users because navigation is always
          visible, the content area stays focused, and the right rail can guide
          users through long forms or structured configuration pages.
        </p>
      </section>

      <section id="core-modules" className="space-y-5 border-t pt-10">
        <h2 className="text-3xl font-bold tracking-tight">Core modules</h2>
        <ul className="space-y-3 text-lg leading-9 text-muted-foreground">
          <li>Sections management</li>
          <li>Layout builder</li>
          <li>Draft and publish flow</li>
          <li>Theme and SEO settings</li>
        </ul>
      </section>

      <section id="next-steps" className="space-y-5 border-t pt-10">
        <h2 className="text-3xl font-bold tracking-tight">Next steps</h2>
        <p className="text-lg leading-9 text-muted-foreground">
          Next, we can turn this shell into a real CMS by adding editable cards,
          section forms, layout ordering, preview mode, and publishing actions
          backed by mock JSON or a real API.
        </p>
      </section>
    </div>
  );
}
