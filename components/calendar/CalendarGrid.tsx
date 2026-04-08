import DateCell from "./DateCell";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type CalendarGridProps = {
  days: Date[];
  visibleMonth: Date;
  startDate: Date | null;
  endDate: Date | null;
  selectedDate: Date | null;
  onSelectDay: (day: Date) => void;
  holidays: Set<string>;
  accentClass: string;
};

export default function CalendarGrid({
  days,
  visibleMonth,
  startDate,
  endDate,
  selectedDate,
  onSelectDay,
  holidays,
  accentClass,
}: CalendarGridProps) {
  return (
    <div>
      <div className="mb-2 grid grid-cols-7 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {daysOfWeek.map((d) => (
          <div key={d} className="text-center">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {days.map((day: Date, i: number) => (
          <DateCell
            key={i}
            day={day}
            visibleMonth={visibleMonth}
            startDate={startDate}
            endDate={endDate}
            selectedDate={selectedDate}
            onSelectDay={onSelectDay}
            isHoliday={holidays.has(`${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`)}
            accentClass={accentClass}
          />
        ))}
      </div>
    </div>
  );
}
