type NoteScope = "month" | "range" | "day";

type NotesSectionProps = {
  noteScope: NoteScope;
  onScopeChange: (scope: NoteScope) => void;
  note: string;
  setNote: (value: string) => void;
  canUseRange: boolean;
  canUseDay: boolean;
  monthLabel: string;
  rangeLabel: string;
  dayLabel: string;
};

const scopeButtonBase =
  "rounded-lg border px-3 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40";

export default function NotesSection({
  noteScope,
  onScopeChange,
  note,
  setNote,
  canUseRange,
  canUseDay,
  monthLabel,
  rangeLabel,
  dayLabel,
}: NotesSectionProps) {
  const activeLabel =
    noteScope === "month"
      ? monthLabel
      : noteScope === "range"
      ? rangeLabel
      : dayLabel;

  return (
    <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-3 sm:p-4">
      <div className="mb-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onScopeChange("month")}
          className={`${scopeButtonBase} ${
            noteScope === "month"
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
          }`}
        >
          Month memo
        </button>

        <button
          type="button"
          onClick={() => onScopeChange("range")}
          disabled={!canUseRange}
          className={`${scopeButtonBase} ${
            noteScope === "range"
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
          }`}
        >
          Range note
        </button>

        <button
          type="button"
          onClick={() => onScopeChange("day")}
          disabled={!canUseDay}
          className={`${scopeButtonBase} ${
            noteScope === "day"
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
          }`}
        >
          Day note
        </button>
      </div>

      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        Writing for: {activeLabel}
      </p>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your note..."
        className="min-h-28 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
      />

      <div className="mt-2 text-right text-xs text-slate-500">
        {note.length} characters
      </div>
    </div>
  );
}
