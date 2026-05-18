import { AnimatePresence, motion } from "framer-motion";
import { getPhaseByYear } from "../data/phases";
import { useTimelineStore } from "../store/useTimelineStore";
import { EVENTS } from "../data/events";

export function NarrativePanel() {
  const year = useTimelineStore((s) => s.year);
  const selectEvent = useTimelineStore((s) => s.selectEvent);
  const phase = getPhaseByYear(year);

  const eventsInPhase = EVENTS.filter(
    (e) => e.year >= phase.startYear && e.year <= phase.endYear
  );

  return (
    <div className="panel flex h-full max-h-full min-h-0 w-[330px] max-w-full flex-col overflow-hidden rounded-xl">
      {/* Phase header */}
      <div
        className="shrink-0 px-5 py-4"
        style={{
          background: `linear-gradient(135deg, ${phase.color}aa 0%, ${phase.color}33 100%)`,
        }}
      >
        <div className="text-[10px] uppercase tracking-widest text-ricepaper/70">
          阶段 · {phase.startYear}–{phase.endYear}
        </div>
        <AnimatePresence mode="wait">
          <motion.h2
            key={phase.id}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="font-display text-3xl font-bold text-ricepaper"
          >
            {phase.title}
          </motion.h2>
        </AnimatePresence>
        <div className="mt-1 text-sm text-oldgold">{phase.subtitle}</div>
      </div>

      <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto px-5 py-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={phase.id + "-text"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[13.5px] leading-relaxed text-ricepaper/90"
          >
            {phase.narrative}
          </motion.p>
        </AnimatePresence>

        <div className="mt-4">
          <div className="mb-2 text-[11px] uppercase tracking-widest text-oldgold/80">
            阶段要点
          </div>
          <ul className="space-y-1.5 text-[12.5px] text-ricepaper/85">
            {phase.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-chaored" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {eventsInPhase.length > 0 && (
          <div className="mt-5 border-t border-oldgold/20 pt-4">
            <div className="mb-2 text-[11px] uppercase tracking-widest text-oldgold/80">
              本阶段关键事件
            </div>
            <ul className="space-y-1.5">
              {eventsInPhase.map((e) => (
                <li key={e.id}>
                  <button
                    onClick={() => {
                      selectEvent(e.id);
                      useTimelineStore.getState().setYear(e.year);
                    }}
                    className="group flex w-full items-start gap-2 rounded px-1 py-1 text-left text-[12.5px] text-ricepaper/85 transition hover:bg-chaored/15 hover:text-ricepaper"
                  >
                    <span className="mt-0.5 inline-block w-12 flex-shrink-0 font-display text-oldgold">
                      {e.year}
                    </span>
                    <span className="flex-1">
                      <span className="font-medium">{e.title}</span>
                      <span className="ml-1 text-[10.5px] text-ricepaper/55 group-hover:text-ricepaper/80">
                        {e.summary}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-5 border-t border-oldgold/20 pt-3 text-[10px] italic text-ricepaper/40">
          史料来源：{phase.source}
        </div>
      </div>
    </div>
  );
}
