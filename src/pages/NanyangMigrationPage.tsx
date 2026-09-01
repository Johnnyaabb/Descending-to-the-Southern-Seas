import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapView } from "../components/MapView";
import { TimeSlider } from "../components/TimeSlider";
import { NarrativePanel } from "../components/NarrativePanel";
import { StatsCounter } from "../components/StatsCounter";
import { PersonCard } from "../components/PersonCard";
import { Legend } from "../components/Legend";
import { MapStyleSwitcher } from "../components/MapStyleSwitcher";
import { ALL_PORTS } from "../data/ports";
import { useTimelineStore } from "../store/useTimelineStore";
import { HAS_MAPBOX_TOKEN, type MapboxLike } from "../lib/mapInstance";
import { DEFAULT_STYLE_ID } from "../lib/mapStyles";
import type { NotablePerson } from "../data/people";

const NanyangMobilePage = lazy(() =>
  import("../nanyang/NanyangMobilePage").then((module) => ({ default: module.NanyangMobilePage })),
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

export function NanyangMigrationPage() {
  const mobileLayout = useMobileLayout();
  const mapRef = useRef<MapboxLike | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [styleId, setStyleId] = useState<string>(() => (mobileLayout ? "satellite" : DEFAULT_STYLE_ID));

  const handleMapReady = useCallback((map: MapboxLike) => {
    mapRef.current = map;
    setMapReady(true);
  }, []);

  const onFocusPerson = useCallback((p: NotablePerson) => {
    const dest = ALL_PORTS.find((port) => port.id === p.destinationId);
    if (!dest || !mapRef.current) return;
    (mapRef.current as any).flyTo({
      center: dest.coord,
      zoom: 4.2,
      speed: 0.7,
      curve: 1.6,
    });
    useTimelineStore.getState().setYear(p.emigrateYear);
  }, []);

  if (mobileLayout) {
    return (
      <Suspense fallback={<div className="grid h-[100dvh] place-items-center bg-[#080d13] text-sm text-[#f5e6c8]">正在展开南洋航海图…</div>}>
        <NanyangMobilePage mapStyleId={styleId} onMapStyleChange={setStyleId} />
      </Suspense>
    );
  }

  return (
    <div className="relative flex h-screen w-screen flex-col overflow-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-br from-[#0a0a0f] via-[#0e1116] to-[#0a0a0a]" />

      <header className="z-20 flex items-center justify-between px-5 py-3">
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex min-w-0 flex-1 items-center gap-3"
        >
          <Link
            to="/"
            className="shrink-0 rounded border border-oldgold/35 px-2 py-1.5 text-[11px] tracking-wide text-oldgold hover:bg-black/45"
          >
            ← 主页
          </Link>
          <div className="flex min-w-0 flex-col gap-1 md:flex-row md:items-baseline md:gap-3">
            <h1 className="font-display truncate text-xl font-bold leading-none tracking-widest text-ricepaper md:text-3xl">
              闽南·潮汕下南洋历史迁徙地图
            </h1>
            <span className="hidden text-sm leading-none text-oldgold lg:inline">
              1684–1949 年从福建南部与粤东启航的南洋离散史
            </span>
          </div>
        </motion.div>
        <div className="flex shrink-0 items-center gap-2 text-[11px] text-ricepaper/50">
          <span className="hidden md:inline">键盘 ← → 拖动 · 空格播放</span>
          {!HAS_MAPBOX_TOKEN && (
            <MapStyleSwitcher currentId={styleId} onChange={setStyleId} />
          )}
          <a
            href="https://github.com"
            className="rounded border border-oldgold/30 px-2 py-1 hover:bg-black/40"
            target="_blank"
            rel="noreferrer"
          >
            关于本图
          </a>
        </div>
      </header>

      <main className="relative z-10 flex min-h-0 flex-1">
        <div className="absolute inset-0">
          <MapView onMapReady={handleMapReady} styleId={styleId} />
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex h-full min-h-0 flex-col pl-3 pt-3">
          <div className="pointer-events-auto flex min-h-0 flex-1 flex-col overflow-hidden">
            <NarrativePanel />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 flex flex-col items-end">
          <div className="pointer-events-auto flex h-full min-h-0 flex-col pb-1">
            <StatsCounter />
            <PersonCard onFocusPerson={onFocusPerson} />
            <Legend />
          </div>
        </div>

        {!mapReady && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40">
            <div className="rounded-lg border border-oldgold/30 bg-black/60 px-6 py-4 text-center font-display text-ricepaper">
              <div className="mb-2 inline-block h-6 w-6 animate-spin rounded-full border-2 border-oldgold border-t-transparent" />
              <div>地图加载中…</div>
              <div className="mt-1 text-[11px] text-ricepaper/60">
                {HAS_MAPBOX_TOKEN ? "已检测到 Mapbox token" : "使用 OpenFreeMap 免费瓦片"}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="z-20">
        <TimeSlider />
      </footer>
    </div>
  );
}
