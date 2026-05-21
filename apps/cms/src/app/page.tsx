export default function HomePage() {
  return (
    <div className="space-y-11 text-slate-800">
      <div>
        <p className="text-[14px] font-semibold tracking-tight text-slate-800">
          Introduction
        </p>
        <h1 className="mt-4 text-6xl font-extrabold tracking-tight text-[#0f172a] lg:text-7xl">
          Introduction
        </h1>
      </div>

      <section
        id="what-is-kirimase"
        className="space-y-7 border-t border-slate-200 pt-10"
      >
        <h2 className="text-5xl font-semibold tracking-tight text-[#0f172a] lg:text-6xl">
          What is Kirimase?
        </h2>

        <p className="text-[19px] leading-[1.75] text-slate-700">
          Kirimase is a command-line helper that speeds up full-stack app setup.
          It gives you a cleaner path for scaffolding architecture and package
          choices so you can focus on actual product features sooner.
        </p>

        <p className="text-[19px] leading-[1.75] text-slate-700">
          In practice, teams can quickly configure key building blocks like ORM,
          auth, payments, and component systems in a modular way without being
          locked into one rigid template.
        </p>

        <p className="text-[19px] leading-[1.75] text-slate-700">
          This CMS version keeps that same reading and navigation experience,
          while letting you connect each section to your own editor flows,
          content modules, and publish pipeline.
        </p>
      </section>
    </div>
  );
}
