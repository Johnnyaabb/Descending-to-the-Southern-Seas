import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapView } from "../guandong/components/MapView";
import { TimeSlider } from "../guandong/components/TimeSlider";
import { NarrativePanel } from "../guandong/components/NarrativePanel";
import { StatsCounter } from "../guandong/components/StatsCounter";
import { PersonCard } from "../guandong/components/PersonCard";
import { Legend } from "../guandong/components/Legend";
import { MapStyleSwitcher } from "../components/MapStyleSwitcher";
import { ALL_PORTS } from "../guandong/data/ports";
import { TIMELINE_MIN } from "../guandong/data/phases";
import { useTimelineStore } from "../guandong/store/useTimelineStore";
import { HAS_MAPBOX_TOKEN, type MapboxLike } from "../lib/mapInstance";
import { DEFAULT_STYLE_ID } from "../lib/mapStyles";
import type { NotablePerson } from "../guandong/data/people";

const GuandongMobilePage = lazy(() =>
  import("../guandong/GuandongMobilePage").then((module) => ({ default: module.GuandongMobilePage })),
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

export function ChuangGuandongMigrationPage() {
  const mobileLayout = useMobileLayout();
  const mapRef = useRef<MapboxLike | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [styleId, setStyleId] = useState<string>(() => (mobileLayout ? "satellite" : DEFAULT_STYLE_ID));

  useEffect(() => {
    if (mobileLayout) return;
    useTimelineStore.getState().reset();
    useTimelineStore.getState().setYear(TIMELINE_MIN);
  }, [mobileLayout]);

  const handleMapReady = useCallback((map: MapboxLike) => {
    mapRef.current = map;
    setMapReady(true);
  }, []);

  const onFocusPerson = useCallback((p: NotablePerson) => {
    const dest = ALL_PORTS.find((port) => port.id === p.destinationId);
    if (!dest || !mapRef.current) return;
    (mapRef.current as any).flyTo({
      center: dest.coord,
      zoom: 5,
      speed: 0.7,
      curve: 1.6,
    });
    useTimelineStore.getState().setYear(p.emigrateYear);
  }, []);

  if (mobileLayout) {
    return (
      <Suspense fallback={<div className="grid h-[100dvh] place-items-center bg-[#080d13] text-sm text-[#f5e6c8]">正在展开关东迁徙图…</div>}>
        <GuandongMobilePage mapStyleId={styleId} onMapStyleChange={setStyleId} />
      </Suspense>
    );
  }

  return (
    <div className="relative flex h-[100dvh] min-h-0 w-screen max-w-[100vw] flex-col overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-br from-[#0a0a0f] via-[#0e1116] to-[#0a0a0a]" />

      <header className="relative z-30 flex shrink-0 flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-5">
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-end sm:gap-3"
        >
          <Link
            to="/"
            className="shrink-0 self-start rounded border border-oldgold/35 px-2 py-1 text-[11px] tracking-wide text-oldgold hover:bg-black/45 sm:self-auto"
          >
            ← 主页
          </Link>
          <h1 className="font-display text-xl font-bold leading-tight tracking-wide text-ricepaper sm:text-2xl md:text-3xl md:tracking-widest">
            闯关东历史迁徙地图
          </h1>
          <span className="hidden text-xs leading-snug text-oldgold lg:inline xl:text-sm">
            一份 1644–1949 年的华北→关东移民可视化时间轴
          </span>
        </motion.div>
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 text-[11px] text-ricepaper/50">
          <span className="hidden lg:inline">键盘 ← → 拖动 · 空格播放</span>
          {!HAS_MAPBOX_TOKEN && (
            <MapStyleSwitcher currentId={styleId} onChange={setStyleId} />
          )}
          <Link
            to="/nanyang"
            className="rounded border border-oldgold/30 px-2 py-1 hover:bg-black/40 hover:text-oldgold"
          >
            潮汕下南洋
          </Link>
          <a
            href="https://github.com/Johnnyaabb/Descending-to-the-Southern-Seas"
            className="rounded border border-oldgold/30 px-2 py-1 hover:bg-black/40"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </header>

      <main className="relative z-10 flex min-h-0 flex-1 overflow-hidden">
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

      <footer className="relative z-20 shrink-0 pb-[env(safe-area-inset-bottom)]">
        <TimeSlider />
      </footer>
    </div>
  );
}
