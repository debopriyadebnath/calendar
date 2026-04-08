"use client";

import { useState } from "react";

export default function DateCell({ day }: { day: number }) {
  const [selected, setSelected] = useState(false);

  return (
    <div
      onClick={() => setSelected(!selected)}
      className={`p-2 text-center rounded-lg cursor-pointer ${
        selected ? "bg-blue-500 text-white" : "hover:bg-blue-100"
      }`}
    >
      {day}
    </div>
  );
}
