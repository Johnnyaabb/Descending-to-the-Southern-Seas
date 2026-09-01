import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { EPISODE_BY_ID, episodesForEpic, phasesForEpic } from "../data";
import { useHomerStore } from "../useHomerStore";

export function HomerTimeline() {
  const epic = useHomerStore((state) => state.epic);
  const orderMode = useHomerStore((state) => state.orderMode);
  const book = useHomerStore((state) => state.book);
  const storyStep = useHomerStore((state) => state.storyStep);
  const selectedEpisodeId = useHomerStore((state) => state.selectedEpisodeId);
  const playing = useHomerStore((state) => state.playing);
  const setBook = useHomerStore((state) => state.setBook);
  const setStoryStep = useHomerStore((state) => state.setStoryStep);
  const selectEpisode = useHomerStore((state) => state.selectEpisode);
  const togglePlaying = useHomerStore((state) => state.togglePlaying);
  const setOrderMode = useHomerStore((state) => state.setOrderMode);
  const step = useHomerStore((state) => state.step);
  const reset = useHomerStore((state) => state.reset);

  const phases = phasesForEpic(epic);
  const storyEpisodes = useMemo(
    () => [...episodesForEpic(epic)].sort((a, b) => a.storyOrder - b.storyOrder),
    [epic],
  );
  const selectedEpisode = EPISODE_BY_ID.get(selectedEpisodeId);
  const max = orderMode === "reading" ? 24 : storyEpisodes.length;
  const value = orderMode === "reading" ? book : storyStep;
  const progress = max === 1 ? 0 : ((value - 1) / (max - 1)) * 100;

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => step(1), 1450);
    return () => window.clearInterval(id);
  }, [playing, step]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLButtonElement) return;
      if (event.code === "Space") {
        event.preventDefault();
        togglePlaying();
      } else if (event.code === "ArrowLeft") {
        step(-1);
      } else if (event.code === "ArrowRight") {
        step(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, togglePlaying]);

  const timelineEpisodes = orderMode === "reading" ? episodesForEpic(epic) : storyEpisodes;

  return (
    <footer className="homer-panel mx-2 mb-2 rounded-xl px-3 pb-2 pt-2 md:mx-3 md:px-4">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={togglePlaying}
          aria-label={playing ? "暂停叙事" : "播放叙事"}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#d8b46a]/45 bg-[#d8b46a]/10 text-[#f5e5c5] transition hover:scale-105 hover:bg-[#d8b46a]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b46a]"
        >
          {playing ? (
            <span className="flex gap-0.5"><i className="h-3 w-1 bg-current" /><i className="h-3 w-1 bg-current" /></span>
          ) : (
            <span className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-current" />
          )}
        </button>
        <button
          type="button"
          onClick={reset}
          aria-label="重置"
          title="重置"
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/10 text-xs text-[#f5e5c5]/55 transition hover:border-[#d8b46a]/35 hover:text-[#d8b46a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b46a]"
        >
          ↺
        </button>

        <div className="hidden rounded-full border border-white/10 bg-black/20 p-0.5 sm:flex">
          <button
            type="button"
            onClick={() => setOrderMode("reading")}
            className={`rounded-full px-2.5 py-1 text-[10px] transition ${orderMode === "reading" ? "bg-[#d8b46a]/18 text-[#f1cf86]" : "text-[#f2e5ce]/40 hover:text-[#f2e5ce]/70"}`}
          >
            阅读顺序
          </button>
          <button
            type="button"
            onClick={() => setOrderMode("story")}
            className={`rounded-full px-2.5 py-1 text-[10px] transition ${orderMode === "story" ? "bg-[#55c6c1]/18 text-[#7ed3cf]" : "text-[#f2e5ce]/40 hover:text-[#f2e5ce]/70"}`}
          >
            故事时序
          </button>
        </div>

        <div className="min-w-0 flex-1 text-center">
          <motion.div
            key={`${orderMode}-${value}`}
            initial={{ opacity: 0.45, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            className="truncate text-[11px] text-[#f2e5ce]/60"
          >
            <strong className="mr-2 font-display text-base text-[#f0cc82]">
              {orderMode === "reading" ? `第 ${book} 卷` : `旅程 ${storyStep} / ${storyEpisodes.length}`}
            </strong>
            <span className="hidden md:inline">{selectedEpisode?.title}</span>
          </motion.div>
        </div>

        <span className="hidden shrink-0 text-[9px] tracking-wider text-[#f2e5ce]/28 lg:inline">← → 切换 · 空格播放</span>
      </div>

      <div className="relative mt-2 h-9 px-1">
        <div className="absolute inset-x-1 top-3 flex h-2 overflow-hidden rounded-full border border-white/10 bg-black/35">
          {orderMode === "reading" ? (
            phases.map((phase) => (
              <button
                key={phase.id}
                type="button"
                onClick={() => setBook(phase.bookStart)}
                aria-label={`${phase.title}，第${phase.bookStart}至${phase.bookEnd}卷`}
                className="h-full flex-1 transition-opacity hover:opacity-100"
                style={{ background: phase.color, opacity: book >= phase.bookStart && book <= phase.bookEnd ? 0.9 : 0.28 }}
              />
            ))
          ) : (
            storyEpisodes.map((episode, index) => (
              <button
                key={episode.id}
                type="button"
                onClick={() => setStoryStep(index + 1)}
                aria-label={`故事第${index + 1}步，${episode.title}`}
                className="h-full flex-1 border-r border-black/20 last:border-r-0"
                style={{ background: episode.epic === "iliad" ? "#bb6548" : "#348f91", opacity: index + 1 <= storyStep ? 0.85 : 0.22 }}
              />
            ))
          )}
        </div>

        <div
          className="pointer-events-none absolute left-1 top-3 h-2 overflow-hidden rounded-full"
          style={{ width: `calc(${progress}% - ${progress > 0 ? 4 : 0}px)` }}
        >
          <div className="h-full w-full bg-gradient-to-r from-[#b95d43] via-[#d6b56e] to-[#f4dfb5] opacity-80" />
        </div>

        <input
          type="range"
          min={1}
          max={max}
          value={value}
          onChange={(event) =>
            orderMode === "reading" ? setBook(Number(event.target.value)) : setStoryStep(Number(event.target.value))
          }
          aria-label={orderMode === "reading" ? `当前第${book}卷` : `当前故事第${storyStep}步`}
          className="homer-slider absolute inset-x-0 top-0 h-8 w-full"
        />

        <div className="pointer-events-none absolute inset-x-1 top-3 z-[6] h-2">
          {timelineEpisodes.map((episode, index) => {
            const left = orderMode === "reading" ? ((episode.book - 1) / 23) * 100 : (index / Math.max(1, storyEpisodes.length - 1)) * 100;
            const selected = episode.id === selectedEpisodeId;
            return (
              <button
                key={episode.id}
                type="button"
                onClick={() => selectEpisode(episode.id)}
                title={`第${episode.book}卷 · ${episode.title}`}
                className={`pointer-events-auto absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border transition ${
                  selected
                    ? "z-10 scale-125 border-[#fff1cf] bg-[#d8b46a] shadow-[0_0_10px_rgba(216,180,106,0.8)]"
                    : "border-[#071018] bg-[#e5c57f]/70 hover:scale-125 hover:bg-[#fff0c9]"
                }`}
                style={{ left: `${left}%` }}
                aria-label={episode.title}
              />
            );
          })}
        </div>

        {orderMode === "reading" && (
          <div className="pointer-events-none absolute inset-x-1 bottom-0 hidden justify-between text-[8px] text-[#f2e5ce]/28 md:flex">
            <span>1</span><span>4</span><span>8</span><span>12</span><span>16</span><span>20</span><span>24</span>
          </div>
        )}
      </div>
    </footer>
  );
}
