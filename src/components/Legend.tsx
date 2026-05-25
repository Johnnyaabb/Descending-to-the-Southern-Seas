import { PHASES } from "../data/phases";
import { REGION_SNAPSHOT } from "../data/populations";

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
        口外聚居估算（民国前后峰值）
      </div>
      <div className="mt-1 grid grid-cols-2 gap-x-3 gap-y-0.5 text-[10.5px]">
        {REGION_SNAPSHOT.map((d) => (
          <div key={d.region} className="flex items-baseline justify-between gap-1 leading-tight">
            <span className="text-ricepaper/75">{d.region}</span>
            <span className="font-display text-oldgold">
              {(d.stockEstimate / 10_000).toFixed(0)} 万
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
