import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CONTEXT_MILESTONES, HOMER_SOURCES, SOURCE_BY_ID, type SourceKind } from "../data";

const KIND_LABELS: Record<SourceKind, string> = {
  primary: "原典",
  archaeology: "考古",
  geography: "地理",
  scholarship: "研究",
  art: "开放图像",
};

interface Props {
  open: boolean;
  onClose: () => void;
}

export function HomerSourcesDrawer({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="史实与来源">
          <motion.button
            type="button"
            aria-label="关闭来源面板"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#02070c]/72 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="relative flex h-full w-full max-w-[510px] flex-col border-l border-[#d8b46a]/25 bg-[#071018]/96 shadow-2xl"
          >
            <header className="flex items-start justify-between border-b border-[#d8b46a]/18 px-5 py-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#d8b46a]/65">Evidence & Sources</p>
                <h2 className="mt-1 font-display text-xl font-bold text-[#f4e2c0]">史实边界与来源台账</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-[#f4e2c0]/60 transition hover:border-[#d8b46a]/35 hover:text-[#f4e2c0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b46a]"
              >
                ×
              </button>
            </header>

            <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto px-5 py-5">
              <div className="rounded-xl border border-[#d87952]/25 bg-[#d87952]/7 p-4 text-[11px] leading-relaxed text-[#f4e5ca]/65">
                本图把史诗文本、古代传统定位、现代地理推测与考古材料分开呈现。地图上的虚线和神话锚点只服务于理解叙事，不代表学界已确认奥德修斯的真实航线。
              </div>

              <section className="mt-6">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d8b46a]">历史背景时间线</h3>
                <div className="relative mt-4 space-y-4 pl-5 before:absolute before:bottom-2 before:left-[5px] before:top-2 before:w-px before:bg-[#d8b46a]/22">
                  {CONTEXT_MILESTONES.map((milestone) => (
                    <div key={milestone.id} className="relative">
                      <span className="absolute -left-5 top-1 h-2.5 w-2.5 rotate-45 border border-[#d8b46a]/50 bg-[#071018]" />
                      <p className="text-[9px] font-semibold tracking-wider text-[#70c9c4]/70">{milestone.dateLabel}</p>
                      <h4 className="mt-0.5 font-display text-sm font-bold text-[#f3dfba]">{milestone.title}</h4>
                      <p className="mt-1 text-[10px] leading-relaxed text-[#f3e5ce]/52">{milestone.description}</p>
                      <p className="mt-1 text-[8px] text-[#f3e5ce]/28">
                        {milestone.sourceIds.map((id) => SOURCE_BY_ID.get(id)?.organization).filter(Boolean).join(" · ")}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-7 border-t border-white/8 pt-5">
                <div className="flex items-end justify-between">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d8b46a]">数据来源</h3>
                  <span className="text-[9px] text-[#f3e5ce]/28">{HOMER_SOURCES.length} 项</span>
                </div>
                <div className="mt-3 space-y-2">
                  {HOMER_SOURCES.map((source) => (
                    <a
                      key={source.id}
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group block rounded-xl border border-white/8 bg-white/[0.02] p-3 transition hover:border-[#d8b46a]/32 hover:bg-[#d8b46a]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b46a]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-[11px] font-medium text-[#f4e5ca]/78 group-hover:text-[#fff0d2]">{source.title}</h4>
                          <p className="mt-0.5 text-[9px] text-[#70c9c4]/55">{source.organization}</p>
                        </div>
                        <span className="shrink-0 rounded-full border border-white/10 px-2 py-0.5 text-[8px] text-[#f4e5ca]/38">
                          {KIND_LABELS[source.kind]}
                        </span>
                      </div>
                      <p className="mt-2 text-[9px] leading-relaxed text-[#f4e5ca]/38">{source.note}</p>
                    </a>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

