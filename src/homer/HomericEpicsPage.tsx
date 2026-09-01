import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { phaseForBook } from "./data";
import { HomerContextPanel } from "./components/HomerContextPanel";
import { HomerMap } from "./components/HomerMap";
import { HomerMapStyleSwitcher } from "./components/HomerMapStyleSwitcher";
import { HomerNarrativePanel } from "./components/HomerNarrativePanel";
import { HomerSourcesDrawer } from "./components/HomerSourcesDrawer";
import { HomerTimeline } from "./components/HomerTimeline";
import { useHomerStore } from "./useHomerStore";

const HomerMobilePage = lazy(() =>
  import("./HomerMobilePage").then((module) => ({ default: module.HomerMobilePage })),
);

function useMobileLayout() {
  const [mobile, setMobile] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches,
  );

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return mobile;
}

export function HomericEpicsPage() {
  const mobileLayout = useMobileLayout();
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [mapStyleId, setMapStyleId] = useState(() => (mobileLayout ? "satellite" : "ocean"));
  const [mapLabelsVisible, setMapLabelsVisible] = useState(true);
  const epic = useHomerStore((state) => state.epic);
  const book = useHomerStore((state) => state.book);
  const orderMode = useHomerStore((state) => state.orderMode);
  const setEpic = useHomerStore((state) => state.setEpic);
  const setOrderMode = useHomerStore((state) => state.setOrderMode);
  const phase = phaseForBook(epic, book);

  if (mobileLayout) {
    return (
      <Suspense fallback={<div className="grid h-[100dvh] place-items-center bg-[#061019] text-sm text-[#f3dfb9]">正在展开海图…</div>}>
        <HomerMobilePage
          mapStyleId={mapStyleId}
          onMapStyleChange={setMapStyleId}
          labelsVisible={mapLabelsVisible}
          onLabelsVisibleChange={setMapLabelsVisible}
          sourcesOpen={sourcesOpen}
          onSourcesOpenChange={setSourcesOpen}
        />
      </Suspense>
    );
  }

  return (
    <div className={`homer-page homer-page--${epic} relative flex h-screen w-screen flex-col overflow-hidden bg-[#061019]`}>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-30 [background-image:radial-gradient(circle_at_15%_20%,rgba(216,180,106,0.13),transparent_24%),radial-gradient(circle_at_80%_12%,rgba(61,154,156,0.14),transparent_28%)]" />

      <header className="relative z-30 flex shrink-0 items-center gap-2 border-b border-[#d8b46a]/14 bg-[#061019]/88 px-3 py-2.5 backdrop-blur-xl md:gap-3 md:px-5">
        <Link
          to="/"
          className="shrink-0 rounded-md border border-[#d8b46a]/25 px-2 py-1.5 text-[10px] tracking-wide text-[#d8b46a]/75 transition hover:border-[#d8b46a]/50 hover:bg-[#d8b46a]/8 hover:text-[#f1d38d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b46a]"
        >
          ← 主页
        </Link>

        <div className="hidden min-w-0 sm:block">
          <div className="flex items-baseline gap-2">
            <h1 className="truncate font-display text-lg font-bold tracking-[0.16em] text-[#f3dfb9] md:text-xl">荷马史诗</h1>
            <span className="hidden font-serif text-[10px] uppercase tracking-[0.2em] text-[#d8b46a]/45 xl:inline">Homeric Epics Atlas</span>
          </div>
          <p className="mt-0.5 hidden truncate text-[9px] tracking-wider text-[#f2e5ce]/38 md:block">
            众神、英雄与归途 · 文本叙事 × 神话地理 × 考古史实
          </p>
        </div>

        <div className="mx-auto flex rounded-full border border-[#d8b46a]/22 bg-black/25 p-0.5">
          <button
            type="button"
            onClick={() => setEpic("iliad")}
            aria-pressed={epic === "iliad"}
            className={`whitespace-nowrap rounded-full px-2 py-1.5 text-[10px] font-medium tracking-wider transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b46a] sm:px-3 md:px-4 ${
              epic === "iliad" ? "bg-[#b95f43]/35 text-[#ffd9b1] shadow-[0_0_16px_rgba(185,95,67,0.18)]" : "text-[#f2e5ce]/38 hover:text-[#f2e5ce]/70"
            }`}
          >
            <span className="sm:hidden">伊利亚特</span>
            <span className="hidden sm:inline">《伊利亚特》</span>
          </button>
          <button
            type="button"
            onClick={() => setEpic("odyssey")}
            aria-pressed={epic === "odyssey"}
            className={`whitespace-nowrap rounded-full px-2 py-1.5 text-[10px] font-medium tracking-wider transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#69c7c2] sm:px-3 md:px-4 ${
              epic === "odyssey" ? "bg-[#2f8e91]/35 text-[#b8f1ed] shadow-[0_0_16px_rgba(47,142,145,0.18)]" : "text-[#f2e5ce]/38 hover:text-[#f2e5ce]/70"
            }`}
          >
            <span className="sm:hidden">奥德赛</span>
            <span className="hidden sm:inline">《奥德赛》</span>
          </button>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={() => setOrderMode(orderMode === "reading" ? "story" : "reading")}
            className="rounded-md border border-white/10 px-2 py-1.5 text-[9px] text-[#f2e5ce]/55 transition hover:border-[#70c9c4]/35 hover:text-[#8bddd7] sm:hidden"
          >
            {orderMode === "reading" ? "卷次" : "时序"}
          </button>
          <button
            type="button"
            onClick={() => setMobileDetailOpen(true)}
            className="rounded-md border border-white/10 px-2 py-1.5 text-[9px] text-[#f2e5ce]/55 transition hover:border-[#d8b46a]/35 hover:text-[#f1d38d] lg:hidden"
          >
            知识卡
          </button>
          <HomerMapStyleSwitcher
            currentId={mapStyleId}
            onChange={setMapStyleId}
            labelsVisible={mapLabelsVisible}
            onLabelsVisibleChange={setMapLabelsVisible}
          />
          <button
            type="button"
            onClick={() => setSourcesOpen(true)}
            className="rounded-md border border-[#d8b46a]/22 px-2.5 py-1.5 text-[9px] tracking-wide text-[#d8b46a]/68 transition hover:border-[#d8b46a]/48 hover:bg-[#d8b46a]/8 hover:text-[#f1d38d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b46a]"
          >
            <span className="hidden sm:inline">史实与来源</span>
            <span className="sm:hidden">来源</span>
          </button>
        </div>
      </header>

      <main className="relative z-10 min-h-0 flex-1">
        <div className="absolute inset-0">
          <HomerMap styleId={mapStyleId} labelsVisible={mapLabelsVisible} />
        </div>

        <div className="pointer-events-none absolute left-0 top-0 z-20 flex h-full min-h-0 items-start p-2.5 md:p-3">
          <div className="pointer-events-auto h-[min(68vh,720px)] min-h-0">
            <HomerNarrativePanel />
          </div>
        </div>

        <div className="pointer-events-none absolute right-0 top-0 z-20 hidden h-full min-h-0 items-start p-3 lg:flex">
          <div className="pointer-events-auto h-[calc(100%-12px)] min-h-0">
            <HomerContextPanel />
          </div>
        </div>

        <div className="pointer-events-none absolute left-1/2 top-3 z-10 hidden -translate-x-1/2 text-center md:block">
          <motion.div
            key={phase.id}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-full border border-white/8 bg-[#061019]/65 px-3 py-1 text-[9px] tracking-[0.16em] text-[#f2e5ce]/45 backdrop-blur"
          >
            {epic === "iliad" ? "战争第十年 · 约五十日叙事" : "十年归途 · 地理定位存在争议"} · {phase.title}
          </motion.div>
        </div>

        <div className="pointer-events-none absolute bottom-4 right-4 z-10 hidden rounded-lg border border-[#a98dcc]/25 bg-[#071018]/72 px-3 py-2 text-[9px] leading-relaxed text-[#e3d5ef]/48 backdrop-blur-xl xl:block">
          神话锚点用于理解叙事<br />不代表现实航线已获确认
        </div>
      </main>

      <div className="relative z-30 shrink-0 bg-[#061019]/90 pt-0.5">
        <HomerTimeline />
      </div>

      <HomerSourcesDrawer open={sourcesOpen} onClose={() => setSourcesOpen(false)} />

      <AnimatePresence>
        {mobileDetailOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center p-3 lg:hidden">
            <motion.button
              type="button"
              aria-label="关闭知识卡"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileDetailOpen(false)}
              className="absolute inset-0 bg-[#02070c]/72 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              className="relative h-[82vh]"
            >
              <button
                type="button"
                onClick={() => setMobileDetailOpen(false)}
                className="absolute right-2 top-2 z-10 grid h-7 w-7 place-items-center rounded-full border border-white/10 bg-[#071018] text-[#f2e5ce]/60"
              >
                ×
              </button>
              <HomerContextPanel />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
