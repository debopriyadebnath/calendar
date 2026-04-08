import DateCell from "./DateCell";

export default function CalendarGrid() {
  return (
    <div className="grid grid-cols-7 gap-2">
      {[...Array(31)].map((_, i) => (
        <DateCell key={i} day={i + 1} />
      ))}
    </div>
  );
}
