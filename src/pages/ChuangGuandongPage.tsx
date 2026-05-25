import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function ChuangGuandongPage() {
  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-[#0a0c12] via-[#0e1116] to-[#080706]" />

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
          <p className="text-[11px] uppercase tracking-[0.35em] text-oldgold/75">1644 — 1949</p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-widest text-oldgold">
            闯关东
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-ricepaper/88">
            「闯关东」指清代至民国，以山东、直隶、河南等地人口为主，越山海关或乘船横渡渤海，进入辽东、吉林、黑龙江等地的移民与垦殖浪潮。清廷长期封禁辽东、放垦招民政策反复，甲午以后铁路与东清铁路建设又加速人口北移，与蒙边、俄日势力交织，形成今日东北汉语方言与聚落格局的历史渊源之一。
          </p>
          <div className="mt-10 rounded-xl border border-chaored/40 bg-black/50 p-5 text-[14px] leading-relaxed text-ricepaper/75">
            <p className="font-display text-oldgold">交互地图筹备中</p>
            <p className="mt-2">
              本专题将配置东北—华北示意路线、政区与关键事件时间轴。若你有档案线索或希望优先覆盖的历史阶段，欢迎通过「关于本图」仓库议题反馈。
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
