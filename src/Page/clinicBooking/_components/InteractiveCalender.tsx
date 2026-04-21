
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

export default function InteractiveCalendar({
  year,
  month,
  selectedDays,
  onToggleDay,
}: {
  year: number;
  month: number;
  selectedDays: number[];
  onToggleDay: (day: number) => void;
}) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="w-full max-w-xs">
      <p className="text-xs font-semibold text-gray-600 text-center mb-3">
        {MONTH_NAMES[month]} {year}
      </p>

      <div className="grid grid-cols-7 mb-1">
        {DAY_NAMES.map((d) => (
          <div key={d} className="text-center text-[11px] text-gray-400">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {cells.map((day, idx) => {
          if (!day) return <div key={idx} />;
          const isSelected = selectedDays.includes(day);

          return (
            <button
              key={idx}
              onClick={() => onToggleDay(day)}
              className={`h-8 w-8 mx-auto rounded-full text-xs ${
                isSelected ? "text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
              style={isSelected ? { background: "linear-gradient(135deg,#38bdf8,#0ea5e9)" } : {}}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}