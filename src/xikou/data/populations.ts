export interface RegionSnapshot {
  region: string;
  destinationIds: string[];
  stockEstimate: number;
  shareNote: string;
  source: string;
}

/**
 * 晚清—民国口外晋陕裔聚落估算（学界多为区间推断，用于图例对比，非普查数字）。
 */
export const REGION_SNAPSHOT: RegionSnapshot[] = [
  {
    region: "土默川（归绥平原）",
    destinationIds: ["hohhot", "baotou"],
    stockEstimate: 680_000,
    shareNote: "城镇从业 + 近郊农垦人口主体",
    source: "呼和浩特、包头旧志人口推算",
  },
  {
    region: "后套—五原灌区",
    destinationIds: ["wuyuan"],
    stockEstimate: 320_000,
    shareNote: "丁戊奇荒后聚落爆发式增高",
    source: "河套农垦史",
  },
  {
    region: "鄂尔多斯台地",
    destinationIds: ["ordos"],
    stockEstimate: 210_000,
    shareNote: "半农半牧与季节工并存",
    source: "伊克昭盟档案研究",
  },
  {
    region: "察哈尔—乌兰察布",
    destinationIds: ["jining"],
    stockEstimate: 190_000,
    shareNote: "京绥铁路车站经济带",
    source: "京绥铁路社会经济史",
  },
  {
    region: "宁夏引黄灌区",
    destinationIds: ["yinchuan"],
    stockEstimate: 140_000,
    shareNote: "西口西路移民与回民商贩交汇",
    source: "宁夏移民史",
  },
];

/** 保守折算：20 世纪中叶晋陕冀走西口后裔人口量级（示意） */
export const XIKOU_DESCENDANT_ESTIMATE = 3_500_000;

/** 史料中偶见的清代—民国累计走西口人次上限（学术争议大，仅作宏观框定） */
export const XIKOU_CUMULATIVE_CEILING = 5_000_000;
