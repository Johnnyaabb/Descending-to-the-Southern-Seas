export interface NortheastSettlementBand {
  /** 地域名称（省份或跨省经济区） */
  region: string;
  destinationIds: string[];
  /** 示意人口量级（万人），截至近年普查区间的学术折算近似 */
  populationBandWan: number;
  /** 汉族闯关东后裔占比或结构的学者估算用语 */
  compositionNote: string;
  source: string;
}

/**
 * 近现代关东各省人口量级与汉族闯关后裔结构的学界综述快照（示意）。
 */
export const NORTHEAST_SNAPSHOT: NortheastSettlementBand[] = [
  {
    region: "辽宁省",
    destinationIds: ["shenyang", "dalian", "yingkou", "dandong"],
    populationBandWan: 4180,
    compositionNote: "汉族为主体；胶东–直隶闯关后裔在城市化核心区占比极高",
    source: "第七次人口普查公报 · 辽宁省；《辽宁省人口发展史》综述",
  },
  {
    region: "吉林省",
    destinationIds: ["changchun"],
    populationBandWan: 2340,
    compositionNote: "中部松辽平原居民点多源自清末民初跨省务农定居链条",
    source: "吉林省人口普查年鉴综述",
  },
  {
    region: "黑龙江省",
    destinationIds: ["harbin", "qiqihar"],
    populationBandWan: 3090,
    compositionNote: "松花江–嫩江流域为晚清中东铁路时期闯关峰值走廊之一",
    source: "黑龙江省人口历史专题综述",
  },
  {
    region: "内蒙古东部（呼伦贝尔—通辽一线）",
    destinationIds: ["qiqihar"],
    populationBandWan: 560,
    compositionNote: "农牧交错带亦有闯关垦荒形成的华北方言岛散布其间",
    source: "内蒙古自治区移民史综述",
  },
];

/** 学界常用量级提示：晚清民国跨区域迁入人次估算上限区间（仅供叙事对照） */
export const SCHOLARLY_CROSSING_CEILING_WAN = 3000;
