import { PHASES, TIMELINE_MAX, TIMELINE_MIN } from "../data/phases";
import { useTimelineStore } from "../store/useTimelineStore";

const span = TIMELINE_MAX - TIMELINE_MIN;

export function PhaseRibbon() {
  const setYear = useTimelineStore((s) => s.setYear);
  const year = useTimelineStore((s) => s.year);

  return (
    <div className="relative h-7 w-full">
      <div className="flex h-3 w-full overflow-hidden rounded-full border border-oldgold/30">
        {PHASES.map((p) => {
          const w = ((p.endYear - p.startYear + 1) / (span + 1)) * 100;
          const active = year >= p.startYear && year <= p.endYear;
          return (
            <button
              key={p.id}
              onClick={() => setYear(p.startYear)}
              title={`${p.title}（${p.startYear}–${p.endYear}）`}
              style={{
                width: `${w}%`,
                background: p.color,
                opacity: active ? 1 : 0.42,
              }}
              className="h-full transition-opacity duration-300 hover:opacity-100"
            />
          );
        })}
      </div>
      <div className="mt-1 flex w-full text-[10px] text-ricepaper/70">
        {PHASES.map((p) => {
          const w = ((p.endYear - p.startYear + 1) / (span + 1)) * 100;
          const active = year >= p.startYear && year <= p.endYear;
          return (
            <div
              key={p.id}
              style={{ width: `${w}%` }}
              className={`px-1 text-center transition-colors ${active ? "text-oldgold" : ""}`}
            >
              <span className="hidden md:inline">{p.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
