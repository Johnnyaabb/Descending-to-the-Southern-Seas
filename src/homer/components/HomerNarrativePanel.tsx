import { motion } from "framer-motion";
import {
  HOMER_EPISODES,
  SOURCE_BY_ID,
  phaseForBook,
} from "../data";
import { useHomerStore } from "../useHomerStore";

export function HomerNarrativePanel() {
  const epic = useHomerStore((state) => state.epic);
  const book = useHomerStore((state) => state.book);
  const selectedEpisodeId = useHomerStore((state) => state.selectedEpisodeId);
  const selectEpisode = useHomerStore((state) => state.selectEpisode);
  const phase = phaseForBook(epic, book);
  const phaseEpisodes = HOMER_EPISODES.filter(
    (episode) =>
      episode.epic === epic && episode.book >= phase.bookStart && episode.book <= phase.bookEnd,
  ).sort((a, b) => a.book - b.book);

  const sourceNames = phase.sourceIds
    .map((sourceId) => SOURCE_BY_ID.get(sourceId)?.organization)
    .filter(Boolean)
    .join(" · ");

  return (
    <motion.aside
      key={phase.id}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.34 }}
      className="homer-panel flex max-h-full w-[min(338px,calc(100vw-24px))] flex-col overflow-hidden"
    >
      <div className="border-b border-[#d8b46a]/18 px-4 pb-3 pt-4">
        <div className="flex items-center justify-between gap-3">
          <span
            className="rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: phase.color, borderColor: `${phase.color}66`, background: `${phase.color}16` }}
          >
            第 {phase.bookStart}—{phase.bookEnd} 卷
          </span>
          <span className="text-[10px] tracking-wider text-[#f4e4c5]/38">叙事单元 {Math.ceil(phase.bookStart / 4)} / 6</span>
        </div>
        <h2 className="mt-3 font-display text-[22px] font-bold tracking-[0.12em] text-[#f3dfb9]">
          {phase.title}
        </h2>
        <p className="mt-1 text-xs tracking-wide text-[#d9b875]">{phase.subtitle}</p>
      </div>

      <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <p className="text-[13px] leading-[1.85] text-[#f2e5ce]/82">{phase.narrative}</p>

        <div className="mt-4 grid gap-1.5">
          {phase.highlights.map((highlight) => (
            <div key={highlight} className="flex gap-2 text-[11px] leading-relaxed text-[#f4e6ca]/62">
              <span className="mt-[7px] h-1 w-1 shrink-0 rotate-45 bg-[#d8b46a]/70" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 border-t border-[#d8b46a]/16 pt-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d8b46a]">代表事件</h3>
            <span className="text-[10px] text-[#f4e6ca]/35">点击定位卷次</span>
          </div>
          <div className="space-y-1.5">
            {phaseEpisodes.map((episode) => {
              const selected = episode.id === selectedEpisodeId;
              return (
                <button
                  key={episode.id}
                  type="button"
                  onClick={() => selectEpisode(episode.id)}
                  className={`group flex w-full items-start gap-2 rounded-lg border px-2.5 py-2 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b46a] ${
                    selected
                      ? "border-[#d8b46a]/48 bg-[#d8b46a]/12"
                      : "border-transparent hover:border-[#d8b46a]/20 hover:bg-white/[0.035]"
                  }`}
                >
                  <span className={`mt-0.5 shrink-0 font-display text-xs font-semibold ${selected ? "text-[#efc976]" : "text-[#d8b46a]/65"}`}>
                    {episode.book}
                  </span>
                  <span className="min-w-0">
                    <span className={`block text-[12px] font-medium ${selected ? "text-[#fff0d2]" : "text-[#f2e5ce]/78"}`}>
                      {episode.title}
                    </span>
                    <span className="mt-0.5 block text-[9px] tracking-wide text-[#f2e5ce]/32">{episode.lines}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 border-t border-[#d8b46a]/14 pt-3 text-[9px] leading-relaxed text-[#f2e5ce]/32">
          本单元来源：{sourceNames}
        </div>
      </div>
    </motion.aside>
  );
}

