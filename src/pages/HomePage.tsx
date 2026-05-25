import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface MigrationCardProps {
  to: string;
  title: string;
  description: string;
  years: string;
  delay: number;
}

function MigrationCard({ to, title, description, years, delay }: MigrationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className="flex min-h-[200px] flex-col"
    >
      <Link
        to={to}
        className="group flex h-full flex-col rounded-2xl border border-oldgold/35 bg-black/45 p-6 shadow-scroll backdrop-blur-md transition-colors hover:border-oldgold/65 hover:bg-black/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-oldgold focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0a08]"
      >
        <h2 className="font-display text-xl font-bold tracking-widest text-oldgold md:text-2xl">{title}</h2>
        <p className="mt-3 flex-1 text-[14px] leading-relaxed text-ricepaper/85 md:text-[15px]">{description}</p>
        <div className="mt-5">
          <span className="inline-block rounded-md border-2 border-chaored/90 bg-chaored/10 px-3 py-1 text-xs font-medium tracking-wider text-ricepaper">
            {years}
          </span>
        </div>
        <span className="mt-4 text-[11px] text-oldgold/70 group-hover:text-oldgold">
          点击进入交互地图 →
        </span>
      </Link>
    </motion.div>
  );
}

export function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(200,169,81,0.12), transparent 55%), linear-gradient(165deg, #080706 0%, #0e1116 42%, #0a0908 100%)",
        }}
      />

      <div className="mx-auto flex max-w-5xl flex-col px-5 pb-16 pt-14 md:pb-24 md:pt-20">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-center"
        >
          <h1 className="font-display text-3xl font-bold tracking-[0.25em] text-oldgold md:text-[2.15rem] md:tracking-[0.32em]">
            华人迁徙史 · 交互地图
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[14px] leading-relaxed text-ricepaper/78 md:text-[15px]">
            下南洋、闯关东、走西口，是近代以来汉人向域外与边疆流动的三条著名路径。点击下方板块，进入对应主题的交互地图与时间轴叙事（闯关东、走西口线图正在陆续接入）。
          </p>
        </motion.header>

        <div className="mx-auto mt-14 grid w-full max-w-[1040px] gap-6 md:grid-cols-3 md:gap-8">
          <MigrationCard
            to="/nanyang"
            title="闽南·潮汕下南洋"
            description="从厦门、泉州湾、漳州一带与樟林、汕头等港口出发，倚季风红头船与近代轮船，抵达暹罗、海峡殖民地、荷属东印度等地，形成南洋闽粤华侨社会。"
            years="1684 — 1949"
            delay={0.1}
          />
          <MigrationCard
            to="/chuang-guandong"
            title="闯关东"
            description="华北贫民出山海关或渡渤海海峡，进入辽东、吉林、黑龙江，在清代封禁与放垦政策起伏中，塑造了近代东北汉人聚落与城镇网络。"
            years="1644 — 1949"
            delay={0.2}
          />
          <MigrationCard
            to="/zou-xikou"
            title="走西口"
            description="晋陕百姓经杀虎口、河曲渡等口外孔道进入土默川、河套与察哈尔，以垦殖、旅蒙商道与手工技艺谋生，推动晋语与蒙古各部交往带上的聚落生长。"
            years="约明末 — 1949"
            delay={0.3}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="mt-14 text-center text-[11px] text-ricepaper/40"
        >
          史料与口径因时代、族籍统计方式而异；各图数据与文献将随专题逐步公开完善。
        </motion.p>
      </div>
    </div>
  );
}
