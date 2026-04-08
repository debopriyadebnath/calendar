"use client";

import { useEffect, useMemo, useState } from "react";
import { format, isBefore, isSameDay } from "date-fns";
import CalendarGrid from "./CalendarGrid";
import NotesSection from "./NotesSection";
import { generateCalendar } from "@/utils/calendar";
import { AnimatePresence, motion } from "framer-motion";

type NoteScope = "month" | "range" | "day";

type MonthTheme = {
  pageGradient: string;
  heroImage: string;
  heroTone: string;
  accent: string;
  accentSoft: string;
};

const monthThemes: MonthTheme[] = [
  {
    pageGradient: "from-amber-100 via-orange-100 to-rose-100",
    heroImage:
      "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1200&q=80",
    heroTone: "from-orange-950/80 via-orange-900/30 to-transparent",
    accent: "bg-orange-700",
    accentSoft: "bg-orange-100 text-orange-800",
  },
  {
    pageGradient: "from-rose-100 via-pink-100 to-fuchsia-100",
    heroImage:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    heroTone: "from-pink-950/80 via-pink-900/30 to-transparent",
    accent: "bg-pink-700",
    accentSoft: "bg-pink-100 text-pink-800",
  },
  {
    pageGradient: "from-cyan-100 via-sky-100 to-blue-100",
    heroImage:
      "https://images.unsplash.com/photo-1429087969512-1e85aab2683d?auto=format&fit=crop&w=1200&q=80",
    heroTone: "from-cyan-950/80 via-sky-900/30 to-transparent",
    accent: "bg-sky-700",
    accentSoft: "bg-sky-100 text-sky-800",
  },
  {
    pageGradient: "from-emerald-100 via-lime-100 to-green-100",
    heroImage:
      "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?auto=format&fit=crop&w=1200&q=80",
    heroTone: "from-emerald-950/80 via-emerald-900/30 to-transparent",
    accent: "bg-emerald-700",
    accentSoft: "bg-emerald-100 text-emerald-800",
  },
  {
    pageGradient: "from-yellow-100 via-amber-100 to-orange-100",
    heroImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    heroTone: "from-amber-950/80 via-amber-900/30 to-transparent",
    accent: "bg-amber-700",
    accentSoft: "bg-amber-100 text-amber-800",
  },
  {
    pageGradient: "from-cyan-100 via-teal-100 to-emerald-100",
    heroImage:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    heroTone: "from-teal-950/80 via-teal-900/30 to-transparent",
    accent: "bg-teal-700",
    accentSoft: "bg-teal-100 text-teal-800",
  },
  {
    pageGradient: "from-blue-100 via-indigo-100 to-violet-100",
    heroImage:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    heroTone: "from-indigo-950/80 via-indigo-900/30 to-transparent",
    accent: "bg-indigo-700",
    accentSoft: "bg-indigo-100 text-indigo-800",
  },
  {
    pageGradient: "from-orange-100 via-amber-100 to-yellow-100",
    heroImage:
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=80",
    heroTone: "from-orange-950/80 via-orange-900/30 to-transparent",
    accent: "bg-orange-700",
    accentSoft: "bg-orange-100 text-orange-800",
  },
  {
    pageGradient: "from-lime-100 via-green-100 to-emerald-100",
    heroImage:
      "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?auto=format&fit=crop&w=1200&q=80",
    heroTone: "from-lime-950/80 via-lime-900/30 to-transparent",
    accent: "bg-lime-700",
    accentSoft: "bg-lime-100 text-lime-800",
  },
  {
    pageGradient: "from-slate-100 via-stone-100 to-zinc-100",
    heroImage:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    heroTone: "from-slate-950/80 via-slate-900/30 to-transparent",
    accent: "bg-slate-700",
    accentSoft: "bg-slate-100 text-slate-800",
  },
  {
    pageGradient: "from-rose-100 via-red-100 to-orange-100",
    heroImage:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
    heroTone: "from-red-950/80 via-red-900/30 to-transparent",
    accent: "bg-red-700",
    accentSoft: "bg-red-100 text-red-800",
  },
  {
    pageGradient: "from-blue-100 via-cyan-100 to-slate-100",
    heroImage:
      "https://images.unsplash.com/photo-1414541944151-65dcdac5d327?auto=format&fit=crop&w=1200&q=80",
    heroTone: "from-sky-950/80 via-sky-900/30 to-transparent",
    accent: "bg-sky-700",
    accentSoft: "bg-sky-100 text-sky-800",
  },
];

const HOLIDAY_MM_DD = ["01-01", "02-14", "07-04", "10-31", "12-25", "12-31"];
const STORAGE_KEY = "wall-calendar-notes-v1";

function toIsoDate(date: Date) {
  return format(date, "yyyy-MM-dd");
}

function getHolidaySet(year: number) {
  const set = new Set<string>();
  for (const mmdd of HOLIDAY_MM_DD) {
    set.add(`${year}-${mmdd}`);
  }
  return set;
}

export default function CalendarContainer() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const days = generateCalendar(currentDate);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [noteScope, setNoteScope] = useState<NoteScope>("month");
  const [notesByKey, setNotesByKey] = useState<Record<string, string>>(() => {
    if (typeof window === "undefined") {
      return {};
    }

    const savedNotes = window.localStorage.getItem(STORAGE_KEY);
    if (!savedNotes) {
      return {};
    }

    try {
      return JSON.parse(savedNotes);
    } catch {
      return {};
    }
  });

  const theme = monthThemes[currentDate.getMonth()];
  const monthKey = format(currentDate, "yyyy-MM");
  const rangeKey =
    startDate && endDate
      ? `range:${toIsoDate(startDate)}__${toIsoDate(endDate)}`
      : null;
  const dayKey = selectedDate ? `day:${toIsoDate(selectedDate)}` : null;
  const effectiveNoteScope: NoteScope =
    noteScope === "range" && !rangeKey
      ? "month"
      : noteScope === "day" && !dayKey
      ? "month"
      : noteScope;
  const holidaySet = useMemo(
    () => getHolidaySet(currentDate.getFullYear()),
    [currentDate],
  );

  const activeNoteKey =
    effectiveNoteScope === "month"
      ? `month:${monthKey}`
      : effectiveNoteScope === "range"
      ? rangeKey
      : dayKey;

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notesByKey));
  }, [notesByKey]);

  const handlePrevMonth = () => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() - 1);
    setCurrentDate(d);
    setStartDate(null);
    setEndDate(null);
    setSelectedDate(null);
    setNoteScope("month");
  };

  const handleNextMonth = () => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() + 1);
    setCurrentDate(d);
    setStartDate(null);
    setEndDate(null);
    setSelectedDate(null);
    setNoteScope("month");
  };

  const handleSelectDay = (day: Date) => {
    setSelectedDate(day);

    if (!startDate || endDate) {
      setStartDate(day);
      setEndDate(null);
      return;
    }

    if (isBefore(day, startDate) && !isSameDay(day, startDate)) {
      setEndDate(startDate);
      setStartDate(day);
      return;
    }

    setEndDate(day);
  };

  const setActiveNote = (value: string) => {
    if (!activeNoteKey) {
      return;
    }

    setNotesByKey((previous) => ({
      ...previous,
      [activeNoteKey]: value,
    }));
  };

  const activeNote = activeNoteKey ? notesByKey[activeNoteKey] ?? "" : "";

  const rangeLabel =
    startDate && endDate
      ? `${format(startDate, "MMM d")} - ${format(endDate, "MMM d")}`
      : "Pick start and end dates";

  const dayLabel = selectedDate
    ? format(selectedDate, "MMMM d, yyyy")
    : "Tap a day to attach a note";

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${theme.pageGradient} px-4 py-5 md:px-8 md:py-8`}
    >
      <div className="mx-auto w-full max-w-6xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={monthKey}
            initial={{ opacity: 0, rotateX: 8, y: 16 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, rotateX: -8, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="overflow-hidden rounded-[26px] border border-stone-300/80 bg-stone-100 shadow-[0_20px_60px_-24px_rgba(30,41,59,0.55)]"
          >
            <div className="grid md:grid-cols-[1.05fr_1fr]">
              <div className="relative min-h-72 md:min-h-[720px]">
                <img
                  src={theme.heroImage}
                  alt={`${format(currentDate, "MMMM")} hero scene`}
                  className="h-full w-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${theme.heroTone}`} />
                <div className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold tracking-[0.22em] text-slate-700 shadow-sm backdrop-blur sm:left-6 sm:top-6">
                  WALL CALENDAR
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <p className="mb-2 text-xs uppercase tracking-[0.28em] text-white/80">
                    Monthly panel
                  </p>
                  <h2 className="text-3xl font-semibold text-white drop-shadow-sm sm:text-4xl">
                    {format(currentDate, "MMMM yyyy")}
                  </h2>
                </div>
                <div className="absolute -top-3 left-[20%] h-7 w-7 rounded-full border border-stone-300 bg-stone-50 shadow-md" />
                <div className="absolute -top-3 right-[20%] h-7 w-7 rounded-full border border-stone-300 bg-stone-50 shadow-md" />
              </div>

              <div className="bg-white p-4 text-slate-900 sm:p-6 md:p-7">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <button
                    onClick={handlePrevMonth}
                    className="rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-base font-semibold text-slate-900 transition hover:bg-slate-200"
                    aria-label="Previous month"
                  >
                    ←
                  </button>

                  <div className="text-center">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                      Now viewing
                    </p>
                    <h3 className="text-lg font-semibold tracking-wide sm:text-xl">
                      {format(currentDate, "MMMM yyyy")}
                    </h3>
                  </div>

                  <button
                    onClick={handleNextMonth}
                    className="rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-base font-semibold text-slate-900 transition hover:bg-slate-200"
                    aria-label="Next month"
                  >
                    →
                  </button>
                </div>

                <div className="mb-4 grid gap-2 sm:grid-cols-2">
                  <div className={`rounded-xl px-3 py-2 text-sm font-medium ${theme.accentSoft}`}>
                    Range: {rangeLabel}
                  </div>
                  <div className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700">
                    Active day: {dayLabel}
                  </div>
                </div>

                <CalendarGrid
                  days={days}
                  visibleMonth={currentDate}
                  startDate={startDate}
                  endDate={endDate}
                  selectedDate={selectedDate}
                  onSelectDay={handleSelectDay}
                  holidays={holidaySet}
                  accentClass={theme.accent}
                />

                <NotesSection
                  noteScope={effectiveNoteScope}
                  onScopeChange={setNoteScope}
                  note={activeNote}
                  setNote={setActiveNote}
                  canUseRange={Boolean(rangeKey)}
                  canUseDay={Boolean(dayKey)}
                  monthLabel={format(currentDate, "MMMM yyyy")}
                  rangeLabel={rangeLabel}
                  dayLabel={dayLabel}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
