export default function NotesSection() {
  return (
    <div className="mt-6">
      <label
        htmlFor="calendar-notes"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Notes
      </label>
      <textarea
        id="calendar-notes"
        rows={4}
        placeholder="Add your notes here..."
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}