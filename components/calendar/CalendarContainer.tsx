"use client";

import CalendarGrid from "./CalendarGrid";
import NotesSection from "./NotesSection";

export default function CalendarContainer() {
  return (
    <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-2xl overflow-hidden max-w-4xl w-full">
      
      {/* Image Section */}
      <div className="md:w-1/2 h-60 md:h-auto">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
          alt="calendar"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Calendar Section */}
      <div className="p-6 md:w-1/2">
        <h2 className="text-xl font-bold mb-4">January 2026</h2>

        <CalendarGrid />

        <NotesSection />
      </div>
    </div>
  );
}
