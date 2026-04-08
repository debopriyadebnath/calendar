"use client";

import { format, isAfter, isBefore, isSameDay } from "date-fns";
import { motion } from "framer-motion";

type DateCellProps = {
  day: Date;
  visibleMonth: Date;
  startDate: Date | null;
  endDate: Date | null;
  selectedDate: Date | null;
  onSelectDay: (day: Date) => void;
  isHoliday: boolean;
  accentClass: string;
};

export default function DateCell({
  day,
  visibleMonth,
  startDate,
  endDate,
  selectedDate,
  onSelectDay,
  isHoliday,
  accentClass,
}: DateCellProps) {
  const today = new Date();

  const isStart = startDate && isSameDay(day, startDate);
  const isEnd = endDate && isSameDay(day, endDate);
  const isInRange =
    startDate &&
    endDate &&
    isAfter(day, startDate) &&
    isBefore(day, endDate);
  const isToday = isSameDay(day, today);
  const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
  const isCurrentMonth =
    day.getMonth() === visibleMonth.getMonth() &&
    day.getFullYear() === visibleMonth.getFullYear();
  const monthBadge = day.getDate() === 1 ? format(day, "MMM") : null;

  return (
    <motion.button
      type="button"
      onClick={() => onSelectDay(day)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`relative h-12 rounded-xl border text-sm font-medium transition-colors ${
        isStart || isEnd
          ? `${accentClass} text-white border-transparent shadow-md`
          : isInRange
          ? "bg-slate-200/70 text-slate-900 border-slate-300"
          : isCurrentMonth
          ? "bg-white text-slate-800 border-slate-200 hover:bg-slate-50"
          : "bg-slate-50 text-slate-400 border-slate-200/80 hover:bg-slate-100"
      }`}
      aria-label={format(day, "MMMM d, yyyy")}
    >
      <span className="absolute inset-0 flex items-center justify-center">
        {format(day, "d")}
      </span>

      {monthBadge && (
        <span className="absolute left-1.5 top-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
          {monthBadge}
        </span>
      )}

      {isHoliday && (
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
      )}

      {isToday && !(isStart || isEnd) && (
        <span className="absolute bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-slate-900" />
      )}

      {isSelected && !(isStart || isEnd) && (
        <span className="absolute inset-0 rounded-xl ring-2 ring-inset ring-slate-400" />
      )}
    </motion.button>
  );
}
