'use client';

import * as React from 'react';
import { CalendarIcon, PlaneTakeoff } from 'lucide-react';

import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Calendar } from '../components/ui/calendar';
import { cn } from '../lib/utils';

const tripTypes = ['round-trip', 'one-way', 'multi-city'] as const;

type TripType = (typeof tripTypes)[number];

export function HeroBookingSection() {
  const [tripType, setTripType] = React.useState<TripType>('round-trip');
  const [travelDate, setTravelDate] = React.useState<Date | undefined>(new Date());

  return (
    <section className="bg-slate-100 pb-16">
      <div className="relative overflow-hidden bg-slate-900">
        <img
          src="https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1800&q=80"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#012f45]/85 via-[#023853]/80 to-[#03222c]/90" />

        <div className="relative mx-auto max-w-[1200px] px-4 pb-40 pt-16 text-white md:px-6">
          <p className="mb-3 text-sm font-semibold tracking-[0.35em] text-slate-200/85 uppercase">
            Premium Travel
          </p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Fly With Smiles Across Asia</h1>
          <p className="mt-3 max-w-xl text-sm text-slate-100/90 md:text-base">
            Experience premium service and comfort on every journey with thoughtfully curated routes and hospitality.
          </p>
        </div>
      </div>

      <div className="relative mx-auto -mt-28 max-w-[1200px] px-4 md:px-6">
        <Card className="rounded-2xl border border-slate-200 bg-white py-0 shadow-2xl shadow-slate-900/10">
          <CardHeader className="pb-2 pt-5">
            <CardTitle className="text-base font-semibold text-slate-900">Book your next flight</CardTitle>
            <CardDescription>Select your itinerary and travel details to get the best fares.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 pb-6">
            <Tabs value={tripType} onValueChange={(value: string) => setTripType(value as TripType)}>
              <TabsList className="bg-slate-100">
                <TabsTrigger value="round-trip">Round Trip</TabsTrigger>
                <TabsTrigger value="one-way">One Way</TabsTrigger>
                <TabsTrigger value="multi-city">Multi-city</TabsTrigger>
              </TabsList>
            </Tabs>

            <form className="grid gap-3 md:grid-cols-12" aria-label="Flight search form">
              <div className="space-y-1.5 md:col-span-3">
                <Label htmlFor="from">From</Label>
                <Input id="from" defaultValue="Bangkok (BKK)" />
              </div>
              <div className="space-y-1.5 md:col-span-3">
                <Label htmlFor="to">To</Label>
                <Input id="to" defaultValue="Chiang Mai (CNX)" />
              </div>
              <div className="space-y-1.5 md:col-span-3">
                <Label htmlFor="dates">Dates</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="dates"
                      variant="outline"
                      className={cn(
                        'h-8 w-full justify-start border-slate-200 bg-white text-left font-normal',
                        !travelDate && 'text-slate-400',
                      )}
                    >
                      <CalendarIcon className="mr-2 size-4" />
                      {travelDate ? travelDate.toLocaleDateString() : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={travelDate} onSelect={setTravelDate} />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label>Passengers</Label>
                <Select defaultValue="1-adult">
                  <SelectTrigger className="h-8 w-full border-slate-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-adult">1 Adult, Economy</SelectItem>
                    <SelectItem value="2-adult">2 Adults, Economy</SelectItem>
                    <SelectItem value="family">2 Adults, 1 Child</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end md:col-span-1">
                <Button className="h-8 w-full bg-yellow-400 font-semibold text-black hover:bg-yellow-300">
                  Search
                  <PlaneTakeoff className="size-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
