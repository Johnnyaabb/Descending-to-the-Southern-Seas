import { PHASES } from "../data/phases";
import { NORTHEAST_SNAPSHOT, SCHOLARLY_CROSSING_CEILING_WAN } from "../data/populations";

export function Legend() {
  return (
    <div className="panel mr-3 mt-3 w-[320px] flex-shrink-0 rounded-xl px-3 py-2 text-[11px]">
      <div className="mb-1 text-[10px] uppercase tracking-widest text-oldgold/80">
        弧线颜色 · 历史阶段
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
        {PHASES.map((p) => (
          <div key={p.id} className="flex items-center gap-1.5">
            <span
              className="inline-block h-2 w-4 rounded-full"
              style={{ background: p.color }}
            />
            <span className="text-ricepaper/85">{p.title}</span>
          </div>
        ))}
      </div>
      <div className="mt-1.5 border-t border-oldgold/15 pt-1.5 text-[10px] uppercase tracking-widest text-oldgold/80">
        关东人口量级示意（当代普查折算）
      </div>
      <div className="mt-1 grid grid-cols-2 gap-x-3 gap-y-0.5 text-[10.5px]">
        {NORTHEAST_SNAPSHOT.map((d) => (
          <div key={d.region} className="flex items-baseline justify-between gap-1 leading-tight">
            <span className="text-ricepaper/75">{d.region}</span>
            <span className="font-display text-oldgold">{d.populationBandWan.toFixed(0)} 万</span>
          </div>
        ))}
      </div>
      <div className="mt-1.5 text-[10px] leading-snug text-ricepaper/45">
        晚清民国闯关跨区域迁入人次学界估算峰值区间约{" "}
        <span className="font-display text-oldgold/90">{SCHOLARLY_CROSSING_CEILING_WAN}</span>{" "}
        万量级（口径不一，仅供对照）。
      </div>
    </div>
  );
}
