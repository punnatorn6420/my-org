import { Apple, Play } from 'lucide-react';

import { Button } from '../components/ui/button';

export function TravelSimpleSection() {
  return (
    <section className="bg-[#101114] py-16 text-white">
      <div className="mx-auto flex max-w-[780px] flex-col items-center px-4 text-center md:px-6">
        <h2 className="text-4xl font-semibold tracking-tight">
          Travel Made Simple
        </h2>
        <p className="mt-3 text-sm text-slate-300 md:text-base">
          Download the Nok Air mobile app for seamless booking, digital boarding
          passes, and exclusive app-only rewards.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="outline"
            className="h-10 border-white/20 bg-white text-black hover:bg-white/90"
          >
            <Apple className="size-4" />
            App Store
          </Button>
          <Button
            variant="outline"
            className="h-10 border-white/30 bg-transparent text-white hover:bg-white/10"
          >
            <Play className="size-4" />
            Google Play
          </Button>
        </div>
      </div>
    </section>
  );
}
