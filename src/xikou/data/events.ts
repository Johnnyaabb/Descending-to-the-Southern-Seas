import { SHAHUKOU_PASS } from "./geoWaypoints";

export interface HistoricalEvent {
  id: string;
  year: number;
  title: string;
  location: string;
  coord: [number, number];
  summary: string;
  detail: string;
  source: string;
  category: "policy" | "war" | "economic" | "settlement";
}

export const EVENTS: HistoricalEvent[] = [
  {
    id: "shahukou-customs",
    year: 1650,
    title: "杀虎口榷关成形期",
    location: "杀虎口",
    coord: SHAHUKOU_PASS,
    summary: "西口税关与商旅稽查渐成定制，走西口大规模化开端之一。",
    detail:
      "学界与地方口碑多将顺治末至康熙初视为杀虎口正式设关榷税的时期（具体纪年各家考订略有出入）。榷关设立后，走口外的人流、驼队需要纳税通关，官方文献与关税档案成为研究走西口规模的重要旁证。",
    source: "百度百科·杀虎口；华字号《绵延二百八十年的历史大潮》",
    category: "policy",
  },
  {
    id: "duolun-league",
    year: 1691,
    title: "多伦会盟",
    location: "多伦诺尔",
    coord: [116.485, 42.203],
    summary: "漠南蒙古盟旗体系巩固，蒙汉交往进入相对可预期时期。",
    detail:
      "康熙三十年多伦诺尔会盟后，清朝对喀尔喀、内蒙古诸旗的统治格局成形，草原战事频率下降，为晋陕商人持票贸易、农民租垦蒙旗土地提供了政治前提。",
    source: "清实录；内蒙古通史",
    category: "policy",
  },
  {
    id: "dashengkui-name",
    year: 1724,
    title: "大盛魁号名确立",
    location: "归化城",
    coord: [111.67, 40.818],
    summary: "旅蒙巨椟品牌化，驼道供销网络迈向全盛的前奏。",
    detail:
      "康熙年间由晋商伙友创立的商号在雍正初年正式以「大盛魁」之名行旅蒙贸易，后竟成清代驰骋蒙俄草原最大的商号之一。其组织形态（合资、学徒制、驻蒙扎柜）是走西口商业化达到顶点的象征。",
    source: "山西纪实·走西口；百度百科·大盛魁",
    category: "economic",
  },
  {
    id: "jekd-chahars",
    year: 1734,
    title: "张库大道与察哈尔商路整治",
    location: "张家口",
    coord: [114.885, 40.811],
    summary: "「东口」对蒙俄贸易与西口形成空间分工。",
    detail:
      "清廷整顿口外台站、驿站系统，张家口—库伦—买卖城一线的官方许可贸易增长，晋商往往在西口、东口之间调配货物与人力。",
    source: "察哈尔通史",
    category: "economic",
  },
  {
    id: "dingwu-famine",
    year: 1877,
    title: "丁戊奇荒全面爆发",
    location: "太原 · 晋中",
    coord: [112.549, 37.87],
    summary: "华北大旱导致数百万流民，助推近代走西口高潮。",
    detail:
      "光绪二至四年（1876–1878）间，山西、河南、直隶遭遇毁灭性旱蝗。饿死与逃荒人数史家估计数百万级，晋北、陕北居民沿熟路北渡黄河或逾杀虎口涌入口外河套，是清末移民实边的重要推力。",
    source: "华北灾荒史；丁戊奇荒档案研究",
    category: "war",
  },
  {
    id: "jz-railway",
    year: 1905,
    title: "京张铁路动工",
    location: "张家口",
    coord: [114.885, 40.811],
    summary: "詹天佑主持的自建干线，改变口内外物流速度。",
    detail:
      "京张路不仅缩短了京津冀与口北的时空距离，也为日后展筑至归绥、包头奠定基础。铁路时代后，传统72天骆驼行程被压缩，走西口从「驼道+步行」转向「火车+短途畜力」。",
    source: "中国铁路史；詹天佑纪念馆",
    category: "economic",
  },
  {
    id: "xinhai-revolution",
    year: 1911,
    title: "辛亥革命与清朝覆亡",
    location: "武昌",
    coord: [114.305, 30.593],
    summary: "帝制终结，绥远、山西政局重塑口外移民政策。",
    detail:
      "革命后各势力争夺北方税源与垦务公司，晋商票号体系受创，但普通农民为躲避战乱赋役仍继续沿西口进入相对空旷的河套。",
    source: "内蒙古通史（近代卷）",
    category: "policy",
  },
  {
    id: "dashoukui-closure",
    year: 1936,
    title: "大盛魁正式歇业",
    location: "归绥",
    coord: [111.67, 40.818],
    summary: "旅蒙旧式巨椟退出历史舞台，象征传统驼道贸易黄昏。",
    detail:
      "受外蒙独立、俄边贸易中断、绥远币制紊乱与军阀盘剥影响，大盛魁难以维系庞大柜坊与债务网络，遂告倒闭。普通移民并未停止，但组织形态转向小型商铺与农垦合作社。",
    source: "山西日报；晋商研究",
    category: "economic",
  },
  {
    id: "marco-polo-bridge",
    year: 1937,
    title: "卢沟桥事变",
    location: "北平 · 卢沟桥",
    coord: [116.215, 39.846],
    summary: "全面抗战爆发，华北商路多次中断。",
    detail:
      "日军南下占领平绥沿线要点，绥远、察哈尔成为战场，口内外物资被双方征用，传统「春出秋回」的走西口节律遭战争机器撕裂。",
    source: "抗日战争史",
    category: "war",
  },
  {
    id: "prc-founded",
    year: 1949,
    title: "中华人民共和国成立",
    location: "北京",
    coord: [116.404, 39.904],
    summary: "新的交通、垦务与民族政策整合长城两侧，走西口退入历史记忆。",
    detail:
      "随着土地改革与计划经济路网建设，口外人口增速更多由计划移民与工业调配驱动，自发性的「走西口」大潮至此告一段落，但其文化认同仍存于晋陕冀—内蒙古之间的方言与民俗之中。",
    source: "中华人民共和国史",
    category: "policy",
  },
];

export function eventsAtYear(year: number): HistoricalEvent[] {
  return EVENTS.filter((e) => e.year === year);
}
