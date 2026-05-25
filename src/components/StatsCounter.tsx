import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cumulativeTotal } from "../data/flows";
import { useTimelineStore } from "../store/useTimelineStore";

function formatLargeChinese(n: number) {
  if (n >= 100_000_000) return { value: (n / 100_000_000).toFixed(2), unit: "亿" };
  if (n >= 10_000) return { value: (n / 10_000).toFixed(n >= 1_000_000 ? 0 : 1), unit: "万" };
  return { value: n.toLocaleString(), unit: "人" };
}

/**
 * Smoothly animates `from` -> `to` over `duration` ms.
 * Used to count up cumulative migration totals when year scrubs.
 */
function useCountUp(target: number, duration = 600) {
  const [v, setV] = useState(target);
  useEffect(() => {
    const start = v;
    const dt = target - start;
    if (dt === 0) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(start + dt * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return v;
}

export function StatsCounter() {
  const year = useTimelineStore((s) => s.year);
  const total = cumulativeTotal(year);
  const animated = useCountUp(total);
  const { value, unit } = formatLargeChinese(Math.round(animated));

  return (
    <motion.div
      className="panel mr-3 mt-3 w-[320px] rounded-xl px-4 py-3"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-[11px] uppercase tracking-widest text-oldgold/80">
        截至 {year} 年累计闯关迁入估算
      </div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="font-display text-3xl font-bold text-ricepaper">{value}</span>
        <span className="text-sm text-oldgold">{unit}</span>
        <span className="text-xs text-ricepaper/60">人次</span>
      </div>
      <div className="mt-1 text-[10px] text-ricepaper/45">
        综合维基百科「闯关东」、山东大学移民研究所、《近代东北移民史》诸估算口径加权示意
      </div>
    </motion.div>
  );
}
