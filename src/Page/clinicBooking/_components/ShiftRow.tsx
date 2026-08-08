import { useState } from "react";

const SHIFTS = ["Morning shift","Afternoon shift","Evening shift"];

export default function ShiftRow({
  label,
  shift,
  onChange,
  onRemove,
}: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4">
      <p className="text-xs text-gray-500 mb-1">{label}</p>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <button
            onClick={() => setOpen(!open)}
            className="w-full border px-4 py-2 rounded-lg text-sm"
          >
            {shift}
          </button>

          {open && (
            <div className="absolute w-full bg-white border rounded-lg shadow">
              {SHIFTS.map((s) => (
                <button
                  key={s}
                  onClick={() => { onChange(s); setOpen(false); }}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-sky-50"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <button onClick={onRemove}>✕</button>
      </div>
    </div>
  );
}