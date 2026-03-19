export default function HomePage() {
  return (
    <div className="space-y-10 text-slate-800">
      <div>
        <p className="text-sm font-medium text-slate-700">Introduction</p>
        <h1 className="mt-3 text-6xl font-extrabold tracking-tight text-slate-900">
          Introduction
        </h1>
      </div>

      <section id="what-is-kirimase" className="space-y-6 border-t border-slate-200 pt-10">
        <h2 className="text-5xl font-semibold tracking-tight text-slate-900">
          What is Kirimase?
        </h2>

        <p className="text-[20px] leading-[1.65] text-slate-700">
          This CMS page is styled to match the Kirimase documentation layout:
          a simple left navigation, focused content column, and spacious
          typography for easy scanning.
        </p>

        <p className="text-[20px] leading-[1.65] text-slate-700">
          The interface emphasizes clear hierarchy and predictable structure so
          editors can move quickly between sections, commands, and package
          documentation while staying in one consistent shell.
        </p>

        <p className="text-[20px] leading-[1.65] text-slate-700">
          You can now continue by wiring each sidebar destination to your real
          CMS routes (layout builder, sections, publishing, settings) while
          retaining this docs-like visual system.
        </p>
      </section>
    </div>
  );
}
