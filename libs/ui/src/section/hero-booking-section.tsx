'use client';

import * as React from 'react';
import type { HeroBookingSectionProps } from './content-models';
import { defaultSectionProps } from './content-models';
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

function normalizeHeroProps(input?: Partial<HeroBookingSectionProps>): HeroBookingSectionProps {
  const defaults = defaultSectionProps['hero-booking-section'];

  const safeTabLabels =
    input?.tabLabels && input.tabLabels.length > 0 ? input.tabLabels : defaults.tabLabels;

  const safePassengerOptions =
    input?.searchFields?.passengerOptions && input.searchFields.passengerOptions.length > 0
      ? input.searchFields.passengerOptions
      : defaults.searchFields.passengerOptions;

  return {
    eyebrowText: input?.eyebrowText ?? defaults.eyebrowText,
    title: input?.title ?? defaults.title,
    subtitle: input?.subtitle ?? defaults.subtitle,
    heroImageUrl: input?.heroImageUrl ?? defaults.heroImageUrl,
    bookingTitle: input?.bookingTitle ?? defaults.bookingTitle,
    bookingDescription: input?.bookingDescription ?? defaults.bookingDescription,
    tabLabels: safeTabLabels,
    searchFields: {
      fromLabel: input?.searchFields?.fromLabel ?? defaults.searchFields.fromLabel,
      fromDefault: input?.searchFields?.fromDefault ?? defaults.searchFields.fromDefault,
      toLabel: input?.searchFields?.toLabel ?? defaults.searchFields.toLabel,
      toDefault: input?.searchFields?.toDefault ?? defaults.searchFields.toDefault,
      dateLabel: input?.searchFields?.dateLabel ?? defaults.searchFields.dateLabel,
      datePlaceholder:
        input?.searchFields?.datePlaceholder ?? defaults.searchFields.datePlaceholder,
      passengerLabel:
        input?.searchFields?.passengerLabel ?? defaults.searchFields.passengerLabel,
      passengerOptions: safePassengerOptions,
      searchButtonText:
        input?.searchFields?.searchButtonText ?? defaults.searchFields.searchButtonText,
    },
  };
}

export function HeroBookingSection(
  inputProps: HeroBookingSectionProps = defaultSectionProps['hero-booking-section'],
) {
  const props = normalizeHeroProps(inputProps);
  const [tripType, setTripType] = React.useState<string>(props.tabLabels[0]?.value ?? 'round-trip');
  const [travelDate, setTravelDate] = React.useState<Date | undefined>(new Date());

  return (
    <section className="bg-slate-100 pb-16">
      <div className="relative overflow-hidden bg-slate-900">
        <img
          src={props.heroImageUrl}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#012f45]/85 via-[#023853]/80 to-[#03222c]/90" />

        <div className="relative mx-auto max-w-[1200px] px-4 pb-40 pt-16 text-white md:px-6">
          <p className="mb-3 text-sm font-semibold tracking-[0.35em] text-slate-200/85 uppercase">
            {props.eyebrowText}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{props.title}</h1>
          <p className="mt-3 max-w-xl text-sm text-slate-100/90 md:text-base">{props.subtitle}</p>
        </div>
      </div>

      <div className="relative mx-auto -mt-28 max-w-[1200px] px-4 md:px-6">
        <Card className="rounded-2xl border border-slate-200 bg-white py-0 shadow-2xl shadow-slate-900/10">
          <CardHeader className="pb-2 pt-5">
            <CardTitle className="text-base font-semibold text-slate-900">{props.bookingTitle}</CardTitle>
            <CardDescription>{props.bookingDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 pb-6">
            <Tabs value={tripType} onValueChange={(value: string) => setTripType(value)}>
              <TabsList className="bg-slate-100">
                {props.tabLabels.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <form className="grid gap-3 md:grid-cols-12" aria-label="Flight search form">
              <div className="space-y-1.5 md:col-span-3">
                <Label htmlFor="from">{props.searchFields.fromLabel}</Label>
                <Input id="from" defaultValue={props.searchFields.fromDefault} />
              </div>
              <div className="space-y-1.5 md:col-span-3">
                <Label htmlFor="to">{props.searchFields.toLabel}</Label>
                <Input id="to" defaultValue={props.searchFields.toDefault} />
              </div>
              <div className="space-y-1.5 md:col-span-3">
                <Label htmlFor="dates">{props.searchFields.dateLabel}</Label>
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
                      {travelDate
                        ? travelDate.toLocaleDateString()
                        : props.searchFields.datePlaceholder}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={travelDate} onSelect={setTravelDate} />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label>{props.searchFields.passengerLabel}</Label>
                <Select defaultValue={props.searchFields.passengerOptions[0]?.value}>
                  <SelectTrigger className="h-8 w-full border-slate-200">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {props.searchFields.passengerOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end md:col-span-1">
                <Button className="h-8 w-full bg-yellow-400 font-semibold text-black hover:bg-yellow-300">
                  {props.searchFields.searchButtonText}
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
