import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { PHASES, TIMELINE_MAX, TIMELINE_MIN } from "../data/phases";
import { EVENTS } from "../data/events";
import { useTimelineStore, type PlaySpeed } from "../store/useTimelineStore";

const SPEEDS: PlaySpeed[] = [1, 2, 5];
const SPAN = TIMELINE_MAX - TIMELINE_MIN;

const yearToPct = (y: number) => ((y - TIMELINE_MIN) / SPAN) * 100;

export function TimeSlider() {
  const year = useTimelineStore((s) => s.year);
  const setYear = useTimelineStore((s) => s.setYear);
  const playing = useTimelineStore((s) => s.playing);
  const togglePlay = useTimelineStore((s) => s.togglePlay);
  const speed = useTimelineStore((s) => s.speed);
  const setSpeed = useTimelineStore((s) => s.setSpeed);
  const step = useTimelineStore((s) => s.step);
  const selectEvent = useTimelineStore((s) => s.selectEvent);
  const reset = useTimelineStore((s) => s.reset);

  useEffect(() => {
    if (!playing) return;
    const interval = Math.max(40, 140 / speed);
    const id = window.setInterval(() => {
      step(1);
    }, interval);
    return () => window.clearInterval(id);
  }, [playing, speed, step]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.code === "ArrowLeft") {
        step(-1);
      } else if (e.code === "ArrowRight") {
        step(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [togglePlay, step]);

  const progress = yearToPct(year);
  const currentPhase = useMemo(
    () => PHASES.find((p) => year >= p.startYear && year <= p.endYear) ?? PHASES[0],
    [year],
  );

  // Decade ticks: minor every 10 years, major every 50 years.
  const ticks = useMemo(() => {
    const arr: { year: number; major: boolean }[] = [];
    const start = Math.ceil(TIMELINE_MIN / 10) * 10;
    for (let y = start; y <= TIMELINE_MAX; y += 10) {
      arr.push({ year: y, major: y % 50 === 0 });
    }
    return arr;
  }, []);

  return (
    <div className="panel mx-3 mb-1 mt-0.5 rounded-xl px-3 pb-0.5 pt-1">
      {/* Controls row */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={togglePlay}
          aria-label={playing ? "暂停" : "播放"}
          className="group relative flex h-7 w-7 items-center justify-center rounded-full border border-chaored/60 bg-chaored/20 text-ricepaper shadow-[0_0_10px_rgba(178,34,34,0.35)] transition hover:scale-110 hover:bg-chaored/60"
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 5l12 7-12 7V5z" />
            </svg>
          )}
        </button>

        <button
          onClick={reset}
          aria-label="重置"
          className="flex h-6 w-6 items-center justify-center rounded-full border border-oldgold/40 bg-black/40 text-ricepaper/85 transition hover:bg-black/70 hover:text-oldgold"
          title="重置到 1684 年"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 5V2L7 6l5 4V7a5 5 0 11-5 5H5a7 7 0 107-7z" />
          </svg>
        </button>

        <div className="ml-1 hidden items-center gap-0.5 rounded-full border border-oldgold/25 bg-black/35 p-0.5 md:flex">
          {SPEEDS.map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`rounded-full px-2 py-0.5 text-[11px] leading-tight transition ${
                s === speed
                  ? "bg-chaored text-ricepaper shadow-[0_0_8px_rgba(178,34,34,0.6)]"
                  : "text-ricepaper/65 hover:text-ricepaper"
              }`}
            >
              {s}×
            </button>
          ))}
        </div>

        {/* Current phase chip */}
        <div className="ml-1 hidden items-center gap-2 rounded-full border border-oldgold/25 bg-black/35 px-2.5 py-px md:flex">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: currentPhase.color, boxShadow: `0 0 8px ${currentPhase.color}` }}
          />
          <span className="text-[11px] leading-tight text-ricepaper/85">{currentPhase.title}</span>
          <span className="text-[10px] leading-tight text-ricepaper/40">
            {currentPhase.startYear}–{currentPhase.endYear}
          </span>
        </div>

        <div className="flex-1" />

        {/* Year display */}
        <motion.div
          key={year}
          initial={{ scale: 0.95, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.18 }}
          className="flex items-baseline gap-1"
        >
          <span
            className="font-display text-xl font-bold leading-none tracking-wider text-oldgold drop-shadow-[0_0_10px_rgba(232,122,30,0.45)]"
          >
            {year}
          </span>
          <span className="text-[11px] leading-none text-ricepaper/60">年</span>
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="relative mt-0.5 px-2 pb-1.5 pt-3">
        {/* Floating year flag */}
        <motion.div
          className="pointer-events-none absolute top-0 z-20 -translate-x-1/2"
          style={{ left: `calc(${progress}% + 12px)` }}
          animate={{ left: `calc(${progress}% + 12px)` }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
        >
          <div className="cs-year-flag relative -translate-y-0.5 rounded border border-oldgold/60 bg-black/90 px-1.5 py-px font-display text-[10px] font-semibold tracking-wider text-oldgold">
            {year}
            <span
              className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-[5px] border-t-[5px] border-x-transparent"
              style={{ borderTopColor: "rgba(200, 169, 81, 0.6)" }}
            />
          </div>
        </motion.div>

        {/* Track: phase color band + tick marks + active overlay */}
        <div className="relative h-6">
          {/* Phase color background */}
          <div className="absolute inset-x-0 top-1/2 flex h-2.5 -translate-y-1/2 overflow-hidden rounded-full border border-oldgold/40 shadow-inner shadow-black/60">
            {PHASES.map((p) => {
              const w = ((p.endYear - p.startYear + 1) / (SPAN + 1)) * 100;
              const active = year >= p.startYear && year <= p.endYear;
              return (
                <button
                  key={p.id}
                  onClick={() => setYear(p.startYear)}
                  title={`${p.title}（${p.startYear}–${p.endYear}）`}
                  style={{
                    width: `${w}%`,
                    background: `linear-gradient(180deg, ${p.color} 0%, ${p.color}aa 100%)`,
                    opacity: active ? 1 : 0.35,
                  }}
                  className="h-full transition-opacity duration-300 hover:opacity-100"
                />
              );
            })}
          </div>

          {/* Tick marks */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 h-2.5 -translate-y-1/2">
            {ticks.map((t) => {
              const left = yearToPct(t.year);
              return (
                <span
                  key={t.year}
                  className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 ${
                    t.major ? "h-4 w-px bg-ricepaper/55" : "h-2 w-px bg-ricepaper/22"
                  }`}
                  style={{ left: `${left}%` }}
                />
              );
            })}
          </div>

          {/* Active progress overlay with sheen */}
          <div
            className="pointer-events-none absolute top-1/2 left-0 h-2.5 -translate-y-1/2 overflow-hidden rounded-full"
            style={{ width: `${progress}%` }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(178,34,34,0.85) 0%, rgba(232,122,30,0.85) 60%, rgba(245,230,200,0.95) 100%)",
                boxShadow: "0 0 18px rgba(232,122,30,0.55)",
              }}
            />
            <div className="cs-track-active absolute inset-0" />
          </div>

          {/* Major year labels */}
          <div className="pointer-events-none absolute inset-x-0 -bottom-4 h-3">
            {ticks
              .filter((t) => t.major)
              .map((t) => (
                <span
                  key={t.year}
                  className="absolute -translate-x-1/2 font-display text-[10px] text-ricepaper/55"
                  style={{ left: `${yearToPct(t.year)}%` }}
                >
                  {t.year}
                </span>
              ))}
          </div>

          {/* The actual range input on top */}
          <input
            type="range"
            min={TIMELINE_MIN}
            max={TIMELINE_MAX}
            step={1}
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="cs-slider absolute inset-x-0 top-1/2 -translate-y-1/2"
            aria-label={String(year)}
          />

          {/* Event markers — centered on the phase bar */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-[5] h-2.5 -translate-y-1/2">
            {EVENTS.map((ev) => {
              const left = yearToPct(ev.year);
              const phase =
                PHASES.find((p) => ev.year >= p.startYear && ev.year <= p.endYear) ?? PHASES[0];
              const passed = year >= ev.year;
              return (
                <button
                  key={ev.id}
                  onClick={() => {
                    setYear(ev.year);
                    selectEvent(ev.id);
                  }}
                  style={{ left: `${left}%` }}
                  className="group pointer-events-auto absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                  title={`${ev.year} · ${ev.title}`}
                >
                  <span
                    className="relative block h-2.5 w-2.5 rounded-full border transition-transform group-hover:scale-150"
                    style={{
                      background: passed ? phase.color : "rgba(245, 230, 200, 0.12)",
                      borderColor: passed ? "rgba(245, 230, 200, 0.9)" : "rgba(245, 230, 200, 0.45)",
                      boxShadow: passed
                        ? `0 0 8px ${phase.color}, 0 0 14px ${phase.color}55`
                        : "none",
                    }}
                  />
                  <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 -translate-x-1/2 whitespace-nowrap rounded border border-oldgold/40 bg-black/95 px-2 py-1 font-display text-[10px] text-oldgold opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    {ev.year} · {ev.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Phase labels under the bar */}
        <div className="mt-1.5 flex w-full text-[10px] leading-tight">
          {PHASES.map((p) => {
            const w = ((p.endYear - p.startYear + 1) / (SPAN + 1)) * 100;
            const active = year >= p.startYear && year <= p.endYear;
            return (
              <button
                key={p.id}
                onClick={() => setYear(p.startYear)}
                style={{ width: `${w}%` }}
                className={`group truncate px-1 text-center transition-colors ${
                  active ? "text-oldgold" : "text-ricepaper/45 hover:text-ricepaper/80"
                }`}
              >
                <span className="hidden md:inline">{p.title}</span>
                <span className="md:hidden">{p.title.slice(0, 4)}</span>
              </button>
            );
          })}
        </div>

        {/* Endpoint labels */}
        <div className="mt-px flex justify-between text-[10px] leading-tight text-ricepaper/45">
          <span>{TIMELINE_MIN} 康熙</span>
          <span>{TIMELINE_MAX} 民国终结</span>
        </div>
      </div>
    </div>
  );
}
