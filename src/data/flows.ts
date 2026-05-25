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
 * 华北→关东迁徙弧线数据。volume 为该时段对该路线的累计迁入人次估算，用于：
 * 1. 控制弧线宽度（对数比例）
 * 2. 计算目的地节点累计规模
 * 3. 时间窗激活动画
 *
 * 估计综合：维基百科「闯关东」、山东大学移民研究所文章、《近代东北移民史》诸版本交叉，
 * 数值为学界区间的中位近似，仅供可视化量级对比而非精确人口普查。
 */
export const FLOWS: MigrationFlow[] = [
  // ─── 1644–1667：辽东招垦 ───
  {
    id: "jinan-shenyang-recruit",
    fromId: "jinan",
    toId: "shenyang",
    startYear: 1644,
    endYear: 1667,
    volume: 120_000,
    note: "鲁境灾民领票出山海关赴辽东垦荒的官方招垦客流。",
    source: "清实录招垦条文综述",
    phaseId: "openSea",
  },
  {
    id: "tianjin-shenyang-recruit",
    fromId: "tianjin",
    toId: "shenyang",
    startYear: 1644,
    endYear: 1667,
    volume: 95_000,
    note: "直隶沿河州县贫民北上辽东就耕。",
    source: "河北省移民史资料综述",
    phaseId: "openSea",
  },
  {
    id: "shanhaiguan-shenyang-recruit",
    fromId: "shanhaiguan",
    toId: "shenyang",
    startYear: 1645,
    endYear: 1667,
    volume: 110_000,
    note: "出山海关第一站直指辽沈河谷平原垦殖。",
    source: "山海关榷关档案综述",
    phaseId: "openSea",
  },

  // ─── 1668–1859：柳条封禁与闯关 ───
  {
    id: "jinan-shenyang-ban",
    fromId: "jinan",
    toId: "shenyang",
    startYear: 1668,
    endYear: 1859,
    volume: 2_600_000,
    note: "乾嘉道咸年间违禁闯关的主流走廊之一，抵达辽沈后分流吉林。",
    source: "刘平《闯关东：从流民开始的东北移民潮》",
    phaseId: "redShipPeak",
  },
  {
    id: "tianjin-shenyang-ban",
    fromId: "tianjin",
    toId: "shenyang",
    startYear: 1668,
    endYear: 1859,
    volume: 1_850_000,
    note: "直隶贫民沿驿道出山海关涌入辽东。",
    source: "维基百科·闯关东",
    phaseId: "redShipPeak",
  },
  {
    id: "shanhaiguan-shenyang-ban",
    fromId: "shanhaiguan",
    toId: "shenyang",
    startYear: 1668,
    endYear: 1859,
    volume: 2_100_000,
    note: "陆路闯关的经典轴线：过山海关即为关东第一站奉天。",
    source: "柳条边研究综述",
    phaseId: "redShipPeak",
  },
  {
    id: "yantai-dalian-ban",
    fromId: "yantai",
    toId: "dalian",
    startYear: 1720,
    endYear: 1859,
    volume: 980_000,
    note: "胶东贫民泛渤海海峡登陆大连湾，再分散辽东半岛。",
    source: "烟台港移民航运档案汇编",
    phaseId: "redShipPeak",
  },
  {
    id: "weihai-dalian-ban",
    fromId: "weihai",
    toId: "dalian",
    startYear: 1750,
    endYear: 1859,
    volume: 420_000,
    note: "威海卫—辽东半岛南岸帆船航线，季节性闯关客流。",
    source: "威海市志·航运篇",
    phaseId: "redShipPeak",
  },
  {
    id: "yantai-dandong-ban",
    fromId: "yantai",
    toId: "dandong",
    startYear: 1780,
    endYear: 1859,
    volume: 180_000,
    note: "沿海北上辽东半岛东端安东（丹东）登陆，进入鸭绿江流域。",
    source: "国家民委《闯关东》专题；丹东市志",
    phaseId: "redShipPeak",
  },
  {
    id: "jinan-changchun-ban",
    fromId: "jinan",
    toId: "changchun",
    startYear: 1780,
    endYear: 1859,
    volume: 520_000,
    note: "部分闯关鲁民越过沈阳向北深入吉林腹地垦荒。",
    source: "吉林省移民史资料综述",
    phaseId: "redShipPeak",
  },

  // ─── 1860–1903：移民实边与中东铁路 ───
  {
    id: "tianjin-harbin-railstart",
    fromId: "tianjin",
    toId: "harbin",
    startYear: 1860,
    endYear: 1903,
    volume: 680_000,
    note: "华北劳力沿渤海沿岸换乘北上铁路支线涌入松花江流域新兴城市。",
    source: "《中东铁路沿革史》综述",
    phaseId: "shantouTreaty",
  },
  {
    id: "jinan-harbin-railstart",
    fromId: "jinan",
    toId: "harbin",
    startYear: 1865,
    endYear: 1903,
    volume: 740_000,
    note: "山东淘金客与伐木工沿中东铁路修筑沿线涌入三江平原外围。",
    source: "黑龙江省档案馆综述",
    phaseId: "shantouTreaty",
  },
  {
    id: "yantai-yingkou-open",
    fromId: "yantai",
    toId: "yingkou",
    startYear: 1861,
    endYear: 1903,
    volume: 620_000,
    note: "营口（牛庄）开埠后，胶东帆船经辽东湾抵辽河口登陆。",
    source: "营口市志·口岸篇",
    phaseId: "shantouTreaty",
  },
  {
    id: "yantai-dandong-open",
    fromId: "yantai",
    toId: "dandong",
    startYear: 1860,
    endYear: 1903,
    volume: 240_000,
    note: "辽东半岛东岸安东口岸吸纳胶东闯关者。",
    source: "丹东市志·近代移民篇",
    phaseId: "shantouTreaty",
  },
  {
    id: "yantai-dalian-open",
    fromId: "yantai",
    toId: "dalian",
    startYear: 1860,
    endYear: 1903,
    volume: 880_000,
    note: "轮船时代胶东→辽东运力暴增，登陆大连后再分散腹地。",
    source: "大连市志·港口贸易篇",
    phaseId: "shantouTreaty",
  },
  {
    id: "shanhaiguan-changchun-open",
    fromId: "shanhaiguan",
    toId: "changchun",
    startYear: 1878,
    endYear: 1903,
    volume: 540_000,
    note: "京奉铁路贯通前夕驿路与大车店古道长途迁徙吉林中部。",
    source: "长春市志·人口篇",
    phaseId: "shantouTreaty",
  },
  {
    id: "jinan-qiqihar-open",
    fromId: "jinan",
    toId: "qiqihar",
    startYear: 1885,
    endYear: 1903,
    volume: 260_000,
    note: "招垦告示动员农民远赴黑龙江将军辖区草场湿地开垦。",
    source: "齐齐哈尔市志·垦殖篇",
    phaseId: "shantouTreaty",
  },

  // ─── 1904–1931：大潮鼎盛 ───
  {
    id: "jinan-shenyang-peak",
    fromId: "jinan",
    toId: "shenyang",
    startYear: 1904,
    endYear: 1931,
    volume: 3_900_000,
    note: "全面开禁后山东闯关第一大去向——沈阳集散枢纽饱和运转。",
    source: "维基百科·闯关东；《近代东北移民史》",
    phaseId: "republic",
  },
  {
    id: "tianjin-shenyang-peak",
    fromId: "tianjin",
    toId: "shenyang",
    startYear: 1904,
    endYear: 1931,
    volume: 2_950_000,
    note: "京奉铁路快车昼夜兼程运送直隶豫鲁闯关难民。",
    source: "京奉铁路客运统计汇编（学界估算）",
    phaseId: "republic",
  },
  {
    id: "shanhaiguan-changchun-peak",
    fromId: "shanhaiguan",
    toId: "changchun",
    startYear: 1905,
    endYear: 1931,
    volume: 1_780_000,
    note: "过山海关直上新京方向的铁路迁徙大潮。",
    source: "长春市志·近代移民篇",
    phaseId: "republic",
  },
  {
    id: "jinan-changchun-peak",
    fromId: "jinan",
    toId: "changchun",
    startYear: 1904,
    endYear: 1931,
    volume: 2_050_000,
    note: "鲁省灾民分批定居吉林省中部商品粮基地。",
    source: "吉林省移民史资料汇编",
    phaseId: "republic",
  },
  {
    id: "jinan-harbin-peak",
    fromId: "jinan",
    toId: "harbin",
    startYear: 1904,
    endYear: 1931,
    volume: 2_420_000,
    note: "哈尔滨大都市崛起吸纳巨量修路、垦荒与工商业移民。",
    source: "哈尔滨市志·人口篇",
    phaseId: "republic",
  },
  {
    id: "tianjin-harbin-peak",
    fromId: "tianjin",
    toId: "harbin",
    startYear: 1904,
    endYear: 1931,
    volume: 1_620_000,
    note: "直隶冀鲁豫联运客流北上松花江流域。",
    source: "中国社会科学院边疆研究所移民估算综述",
    phaseId: "republic",
  },
  {
    id: "yantai-dalian-peak",
    fromId: "yantai",
    toId: "dalian",
    startYear: 1904,
    endYear: 1931,
    volume: 2_680_000,
    note: "渤海轮渡鼎盛年代胶东闯关的首选海陆捷径。",
    source: "烟台—大连航运统计学界综述",
    phaseId: "republic",
  },
  {
    id: "weihai-dalian-peak",
    fromId: "weihai",
    toId: "dalian",
    startYear: 1904,
    endYear: 1931,
    volume: 1_050_000,
    note: "威海卫码头与烟台错位补给胶东东部闯关客流。",
    source: "威海市志·航运贸易篇",
    phaseId: "republic",
  },
  {
    id: "yantai-yingkou-peak",
    fromId: "yantai",
    toId: "yingkou",
    startYear: 1904,
    endYear: 1931,
    volume: 840_000,
    note: "辽河口轮船航线分流胶东闯关客流。",
    source: "营口市志·近代移民篇",
    phaseId: "republic",
  },
  {
    id: "yantai-dandong-peak",
    fromId: "yantai",
    toId: "dandong",
    startYear: 1904,
    endYear: 1931,
    volume: 520_000,
    note: "安东—烟台航线在民国鼎盛期运力大增。",
    source: "丹东市志·航运篇",
    phaseId: "republic",
  },
  {
    id: "weihai-dandong-peak",
    fromId: "weihai",
    toId: "dandong",
    startYear: 1904,
    endYear: 1931,
    volume: 310_000,
    note: "威海—安东沿海航线服务胶东东部移民。",
    source: "丹东市志·航运篇",
    phaseId: "republic",
  },
  {
    id: "jinan-qiqihar-peak",
    fromId: "jinan",
    toId: "qiqihar",
    startYear: 1905,
    endYear: 1931,
    volume: 780_000,
    note: "嫩江流域土地开垦吸纳远期闯关定居农户。",
    source: "齐齐哈尔市志·移民篇",
    phaseId: "republic",
  },
  {
    id: "shanhaiguan-qiqihar-peak",
    fromId: "shanhaiguan",
    toId: "qiqihar",
    startYear: 1906,
    endYear: 1931,
    volume: 560_000,
    note: "陆路闯关直指黑龙江腹地的新兴旱路走廊。",
    source: "黑龙江省移民史综述",
    phaseId: "republic",
  },

  // ─── 1932–1949：沦陷动荡 ───
  {
    id: "jinan-shenyang-war",
    fromId: "jinan",
    toId: "shenyang",
    startYear: 1932,
    endYear: 1949,
    volume: 620_000,
    note: "战乱与日本国策交织背景下锐减但仍持续的闯关谋生客流。",
    source: "伪满洲国史料汇编·劳工卷综述",
    phaseId: "warEnd",
  },
  {
    id: "yantai-dalian-war",
    fromId: "yantai",
    toId: "dalian",
    startYear: 1932,
    endYear: 1949,
    volume: 410_000,
    note: "渤海海运虽未断绝但遭严密管制与盘剥，客流量陡降。",
    source: "大连市志·沦陷时期航运篇",
    phaseId: "warEnd",
  },
  {
    id: "tianjin-harbin-war",
    fromId: "tianjin",
    toId: "harbin",
    startYear: 1932,
    endYear: 1949,
    volume: 380_000,
    note: "华北战争难民与公司招募劳力断续北上哈尔滨务工垦荒。",
    source: "哈尔滨市志·沦陷时期人口流动篇",
    phaseId: "warEnd",
  },
  {
    id: "jinan-changchun-war",
    fromId: "jinan",
    toId: "changchun",
    startYear: 1932,
    endYear: 1949,
    volume: 290_000,
    note: "伪新京工业化与日本开拓团挤压下的零散闯关迁徙。",
    source: "长春市志·沦陷时期人口篇",
    phaseId: "warEnd",
  },
];

export function flowsActiveAt(year: number): MigrationFlow[] {
  return FLOWS.filter((f) => year >= f.startYear && year <= f.endYear);
}

/**
 * 给定 year，返回该目的地在 TIMELINE_MIN → year 区间内累计接收的迁入人次估算。
 * 假设流量在 startYear..endYear 之间线性累积。
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
