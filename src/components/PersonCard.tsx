import { AnimatePresence, motion } from "framer-motion";
import { PEOPLE, type NotablePerson } from "../data/people";
import { useTimelineStore } from "../store/useTimelineStore";
import { ALL_PORTS } from "../data/ports";

const portById = new Map(ALL_PORTS.map((p) => [p.id, p]));

interface Props {
  onFocusPerson?: (person: NotablePerson) => void;
}

export function PersonCard({ onFocusPerson }: Props) {
  const year = useTimelineStore((s) => s.year);
  const selectedId = useTimelineStore((s) => s.selectedPersonId);
  const selectPerson = useTimelineStore((s) => s.selectPerson);

  // Sort chronologically by birth year so the timeline reads naturally
  const featured = [...PEOPLE].sort((a, b) => a.yearBorn - b.yearBorn);
  const aliveCount = featured.filter((p) => year >= p.yearBorn && year <= p.yearDied).length;

  return (
    <div className="panel mr-3 mt-3 flex min-h-[120px] w-[320px] flex-1 flex-col overflow-hidden rounded-xl px-4 py-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-[11px] uppercase tracking-widest text-oldgold/80">
          历史人物 · {featured.length} 人
        </div>
        <div className="text-[10px] text-emerald-300/70">
          {aliveCount > 0 ? `${aliveCount} 人在世` : "尚未出生"}
        </div>
      </div>

      <div className="scrollbar-thin space-y-2 overflow-y-auto pr-1">
        {featured.map((p) => {
          const dest = portById.get(p.destinationId);
          const isAlive = year >= p.yearBorn && year <= p.yearDied;
          const isExpanded = selectedId === p.id;

          return (
            <motion.button
              key={p.id}
              layout
              onClick={() => {
                selectPerson(isExpanded ? null : p.id);
                if (!isExpanded) onFocusPerson?.(p);
              }}
              className={`group w-full overflow-hidden rounded-lg border text-left transition ${
                isExpanded
                  ? "border-chaored/60 bg-chaored/10"
                  : "border-oldgold/20 bg-black/30 hover:border-oldgold/40 hover:bg-black/45"
              }`}
            >
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-chaored to-searoyal font-display text-base text-ricepaper">
                  {p.name[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="truncate font-display text-base text-ricepaper">
                      {p.name}
                    </span>
                    <span className="text-[10px] text-ricepaper/50">
                      {p.yearBorn}–{p.yearDied}
                    </span>
                  </div>
                  <div className="truncate text-[11px] text-oldgold">
                    {p.title}
                  </div>
                </div>
                <span
                  className={`text-[10px] ${
                    isAlive ? "text-emerald-300/80" : "text-ricepaper/35"
                  }`}
                  title={isAlive ? `${year} 年时在世` : `${year} 年时尚未出生或已离世`}
                >
                  {isAlive ? "● 在世" : "○"}
                </span>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-t border-oldgold/20 bg-black/40 px-3 pb-3 pt-2"
                  >
                    <div className="text-[12px] text-ricepaper/85">
                      <span className="text-oldgold">{p.intro}</span>
                    </div>
                    <div className="mt-2 text-[12.5px] leading-relaxed text-ricepaper/85">
                      {p.story}
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-[10.5px] text-oldgold/80">
                      <span className="chip">北上 {p.emigrateYear}</span>
                      {dest && (
                        <span className="chip">→ {dest.name}（{dest.country}）</span>
                      )}
                    </div>
                    <div className="mt-2 text-[10px] italic text-ricepaper/40">
                      来源：{p.source}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
