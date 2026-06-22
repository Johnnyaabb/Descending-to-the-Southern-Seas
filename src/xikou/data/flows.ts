export interface MigrationFlow {
  id: string;
  fromId: string;
  toId: string;
  startYear: number;
  endYear: number;
  volume: number;
  note: string;
  source: string;
  phaseId: string;
}

/**
 * 走西口迁徙「人次」估算：学术档案多为区间推测，此处综合地方志、移民史综述与人口史研究折算为可比数量级，
 * 用于弧线粗细与动态演示，并非官方统计口径。
 */
export const FLOWS: MigrationFlow[] = [
  // ─── 关隘与龙票 1650–1735 ───
  {
    id: "taiyuan-hohhot-early",
    fromId: "taiyuan",
    toId: "hohhot",
    startYear: 1650,
    endYear: 1735,
    volume: 120_000,
    note: "晋中—雁门关—朔州—杀虎口—和林格尔—归化城主线。",
    source: "晋商研究；内蒙古通史",
    phaseId: "earlyQing",
  },
  {
    id: "datong-shahukou-early",
    fromId: "datong",
    toId: "shahukou",
    startYear: 1650,
    endYear: 1735,
    volume: 85_000,
    note: "大同—左云一线居民季节性走口外。",
    source: "大同府志",
    phaseId: "earlyQing",
  },
  {
    id: "xinzhou-hohhot-early",
    fromId: "xinzhou",
    toId: "hohhot",
    startYear: 1660,
    endYear: 1735,
    volume: 95_000,
    note: "忻代盆地农民受雇于旅蒙商号。",
    source: "山西移民史",
    phaseId: "earlyQing",
  },
  {
    id: "zhangjiakou-hohhot-early",
    fromId: "zhangjiakou",
    toId: "hohhot",
    startYear: 1650,
    endYear: 1735,
    volume: 70_000,
    note: "东口与西口在归化城交汇的支线客流。",
    source: "察哈尔通史",
    phaseId: "earlyQing",
  },

  // ─── 晋商鼎盛 1736–1850 ───
  {
    id: "taiyuan-hohhot-merchant",
    fromId: "taiyuan",
    toId: "hohhot",
    startYear: 1736,
    endYear: 1850,
    volume: 420_000,
    note: "随大盛魁等巨椟扩张带来的扎柜、驼队编役高峰。",
    source: "大盛魁研究；晋商票号史",
    phaseId: "merchantPeak",
  },
  {
    id: "qixian-baotou-merchant",
    fromId: "qixian",
    toId: "baotou",
    startYear: 1740,
    endYear: 1850,
    volume: 180_000,
    note: "祁县—杀虎口—萨拉齐—包头（乔贵发驼队之路）。",
    source: "晋商博物馆展板",
    phaseId: "merchantPeak",
  },
  {
    id: "hequ-wuyuan-merchant",
    fromId: "hequ",
    toId: "wuyuan",
    startYear: 1750,
    endYear: 1850,
    volume: 240_000,
    note: "河曲西口古渡—黄河北岸—后套，不经杀虎口。",
    source: "河套农业史",
    phaseId: "merchantPeak",
  },
  {
    id: "yulin-ordos-merchant",
    fromId: "yulin",
    toId: "ordos",
    startYear: 1760,
    endYear: 1850,
    volume: 160_000,
    note: "陕北移民与蒙旗牧场租赁。",
    source: "陕北移民调查",
    phaseId: "merchantPeak",
  },
  {
    id: "datong-jining-merchant",
    fromId: "datong",
    toId: "jining",
    startYear: 1780,
    endYear: 1850,
    volume: 110_000,
    note: "晋北短途佣工进入察哈尔南缘市镇。",
    source: "大同府志",
    phaseId: "merchantPeak",
  },
  {
    id: "taiyuan-yinchuan-merchant",
    fromId: "taiyuan",
    toId: "yinchuan",
    startYear: 1770,
    endYear: 1850,
    volume: 95_000,
    note: "西口西侧支线进入宁夏引黄区。",
    source: "宁夏移民史",
    phaseId: "merchantPeak",
  },

  // ─── 灾荒与放垦 1851–1900 ───
  {
    id: "xinzhou-wuyuan-crisis",
    fromId: "xinzhou",
    toId: "wuyuan",
    startYear: 1851,
    endYear: 1900,
    volume: 520_000,
    note: "同治、光绪迭次旱蝗推动忻代农民北迁。",
    source: "华北灾荒史；丁戊奇荒研究",
    phaseId: "crisisOpen",
  },
  {
    id: "hequ-wuyuan-crisis2",
    fromId: "hequ",
    toId: "wuyuan",
    startYear: 1875,
    endYear: 1900,
    volume: 380_000,
    note: "1877–1878 奇荒后河曲—保德逃亡潮。",
    source: "丁戊奇荒档案研究",
    phaseId: "crisisOpen",
  },
  {
    id: "taiyuan-hohhot-crisis",
    fromId: "taiyuan",
    toId: "hohhot",
    startYear: 1851,
    endYear: 1900,
    volume: 410_000,
    note: "城市周边流民涌入土默川佣耕。",
    source: "呼和浩特志",
    phaseId: "crisisOpen",
  },
  {
    id: "yulin-baotou-crisis",
    fromId: "yulin",
    toId: "baotou",
    startYear: 1860,
    endYear: 1900,
    volume: 290_000,
    note: "陕北灾民进入包头河曲段船工、垦户。",
    source: "榆林府志",
    phaseId: "crisisOpen",
  },
  {
    id: "datong-baotou-crisis",
    fromId: "datong",
    toId: "baotou",
    startYear: 1855,
    endYear: 1900,
    volume: 260_000,
    note: "晋北兵燹余波后的持续外溢。",
    source: "山西移民史",
    phaseId: "crisisOpen",
  },
  {
    id: "zhangjiakou-jining-crisis",
    fromId: "zhangjiakou",
    toId: "jining",
    startYear: 1865,
    endYear: 1900,
    volume: 140_000,
    note: "京张沿线筑路、垦务公司招工。",
    source: "铁路史",
    phaseId: "crisisOpen",
  },

  // ─── 铁路时代 1901–1937 ───
  {
    id: "taiyuan-baotou-rail",
    fromId: "taiyuan",
    toId: "baotou",
    startYear: 1901,
    endYear: 1937,
    volume: 360_000,
    note: "京绥铁路贯通后产业工人迁移。",
    source: "中国铁路史",
    phaseId: "railEra",
  },
  {
    id: "qixian-hohhot-rail",
    fromId: "qixian",
    toId: "hohhot",
    startYear: 1905,
    endYear: 1937,
    volume: 220_000,
    note: "票号转型背景下的柜员、店员北上。",
    source: "晋商票号史",
    phaseId: "railEra",
  },
  {
    id: "hequ-jining-rail",
    fromId: "hequ",
    toId: "jining",
    startYear: 1912,
    endYear: 1937,
    volume: 180_000,
    note: "晋西北贫民沿铁路赴察哈尔工矿。",
    source: "乌兰察布市志",
    phaseId: "railEra",
  },
  {
    id: "xinzhou-ordos-rail",
    fromId: "xinzhou",
    toId: "ordos",
    startYear: 1910,
    endYear: 1937,
    volume: 150_000,
    note: "新式农垦公司进入鄂尔多斯。",
    source: "鄂尔多斯史",
    phaseId: "railEra",
  },
  {
    id: "yulin-yinchuan-rail",
    fromId: "yulin",
    toId: "yinchuan",
    startYear: 1920,
    endYear: 1937,
    volume: 125_000,
    note: "陕甘宁盐茶马帮衰落后的劳动力再配置。",
    source: "宁夏移民史",
    phaseId: "railEra",
  },
  {
    id: "datong-hohhot-rail",
    fromId: "datong",
    toId: "hohhot",
    startYear: 1900,
    endYear: 1937,
    volume: 200_000,
    note: "大同煤铁产业与口外服务业互动。",
    source: "大同市志",
    phaseId: "railEra",
  },

  // ─── 战乱 1938–1949 ───
  {
    id: "taiyuan-jining-war",
    fromId: "taiyuan",
    toId: "jining",
    startYear: 1938,
    endYear: 1949,
    volume: 95_000,
    note: "晋中难民沿铁路仓促北上。",
    source: "抗日战争史",
    phaseId: "warEnd",
  },
  {
    id: "xinzhou-wuyuan-war",
    fromId: "xinzhou",
    toId: "wuyuan",
    startYear: 1938,
    endYear: 1949,
    volume: 80_000,
    note: "根据地与河套之间的拉锯性移民。",
    source: "内蒙古通史（现代卷）",
    phaseId: "warEnd",
  },
  {
    id: "hequ-hohhot-war",
    fromId: "hequ",
    toId: "hohhot",
    startYear: 1942,
    endYear: 1949,
    volume: 55_000,
    note: "抗战中后期零散逃荒与军需动员。",
    source: "晋绥根据地史资料",
    phaseId: "warEnd",
  },
];

export function flowsActiveAt(year: number): MigrationFlow[] {
  return FLOWS.filter((f) => year >= f.startYear && year <= f.endYear);
}

/**
 * 给定 year，返回该目的地在 TIMELINE_MIN → year 区间内累计接收人次（线性折损估算）。
 */
export function cumulativeAtDestination(destId: string, year: number): number {
  let total = 0;
  for (const f of FLOWS) {
    if (f.toId !== destId) continue;
    if (year < f.startYear) continue;
    const span = Math.max(1, f.endYear - f.startYear + 1);
    const elapsed = Math.min(year, f.endYear) - f.startYear + 1;
    total += (f.volume * elapsed) / span;
  }
  return Math.round(total);
}

export function cumulativeTotal(year: number): number {
  let total = 0;
  for (const f of FLOWS) {
    if (year < f.startYear) continue;
    const span = Math.max(1, f.endYear - f.startYear + 1);
    const elapsed = Math.min(year, f.endYear) - f.startYear + 1;
    total += (f.volume * elapsed) / span;
  }
  return Math.round(total);
}
