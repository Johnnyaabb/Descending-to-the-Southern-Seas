import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function ZouXikouPage() {
  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-[#080a0c] via-[#0e1116] to-[#0a0907]" />

      <div className="mx-auto max-w-2xl px-5 py-12">
        <Link
          to="/"
          className="inline-flex rounded border border-oldgold/35 px-3 py-1.5 text-[12px] text-oldgold hover:bg-black/45"
        >
          ← 返回主页
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mt-8"
        >
          <p className="text-[11px] uppercase tracking-[0.35em] text-oldgold/75">约明末 — 1949</p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-widest text-oldgold">
            走西口
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-ricepaper/88">
            「西口」在民间说法中常对应杀虎口一带，亦泛指晋西北、陕北百姓渡黄河、过长城隘口，进入土默特川、河套、后山与察哈尔等蒙旗驻牧与盟旗地带的迁徙与经商网络。旅蒙商路与走口外务农的人群共同带动了口外汇聚城镇与半农半牧经济带，也是晋语与蒙古语接触的重要历史场景之一。
          </p>
          <div className="mt-10 rounded-xl border border-chaored/40 bg-black/50 p-5 text-[14px] leading-relaxed text-ricepaper/75">
            <p className="font-display text-oldgold">交互地图筹备中</p>
            <p className="mt-2">
              计划在图中呈现晋陕出发点、主要口隘与土默川—河套示意廊道，并联置清至民国的放垦、主教区与铁路节点等事件层。上线后将与「华人迁徙史」主页互通导航。
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
