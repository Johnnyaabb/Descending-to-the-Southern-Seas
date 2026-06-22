import { HEQU_TOWN, SHAHUKOU_PASS } from "./geoWaypoints";

export type PortKind = "origin" | "destination";

export interface Port {
  id: string;
  name: string;
  nameEn: string;
  kind: PortKind;
  country: string;
  coord: [number, number];
  established?: number;
  description: string;
  source: string;
}

/** 口内主要迁出与集聚地 */
export const ORIGIN_PORTS: Port[] = [
  {
    id: "taiyuan",
    name: "太原 · 晋中腹地",
    nameEn: "Taiyuan",
    kind: "origin",
    country: "山西",
    coord: [112.549, 37.87],
    description:
      "晋中都会，平遥、太谷、祁县商贩北上的总枢纽。清代至民国，大量晋中商民在此筹资、兑票，再分赴忻州—朔州抵杀虎口。",
    source: "山西地方志；晋商研究",
  },
  {
    id: "datong",
    name: "大同 · 云朔",
    nameEn: "Datong",
    kind: "origin",
    country: "山西",
    coord: [113.3, 40.076],
    description:
      "明代九边重镇，清代口内外军需与粮秣转运繁忙。左云、阳高贫民多经大同盆地西趋杀虎口，行程较晋中更为径直。",
    source: "大同府志；走西口田野调查",
  },
  {
    id: "xinzhou",
    name: "忻州 · 忻代盆地",
    nameEn: "Xinzhou",
    kind: "origin",
    country: "山西",
    coord: [112.734, 38.417],
    description:
      "北出雁门关的第一块大盆地，连接崞县、代州（今原平、代县），是晋北行商与灾民进入朔州道的咽喉。",
    source: "忻州志；山西移民史",
  },
  {
    id: "hequ",
    name: "河曲 · 黄河渡口",
    nameEn: "Hequ",
    kind: "origin",
    country: "山西 · 晋西北",
    coord: HEQU_TOWN,
    description:
      "晋西北瘠土，与陕北府谷隔河相望。城南黄河「西口古渡」为广义西口之一，灾年贫民渡河进入后套，亦有人北上杀虎口入土默川。",
    source: "河曲县志；丁戊奇荒档案研究",
  },
  {
    id: "yulin",
    name: "榆林 · 陕北",
    nameEn: "Yulin",
    kind: "origin",
    country: "陕西",
    coord: [109.741, 38.29],
    description:
      "陕北长城边堡群南缘农牧交错带人口外流的重要节点，与山西河曲—保德渡口形成「走西口」西线走廊。",
    source: "榆林府志；陕北移民调查",
  },
  {
    id: "zhangjiakou",
    name: "张家口 · 东口",
    nameEn: "Zhangjiakou",
    kind: "origin",
    country: "河北 · 察哈尔南缘",
    coord: [114.885, 40.811],
    established: 1571,
    description:
      "「东口」重镇，与杀虎口「西口」并称。隆庆和议后互市大兴，冀北贫民与晋商支线由此北上库伦、恰克图，与西口商道遥相呼应。",
    source: "百度百科·走西口；察哈尔通史",
  },
  {
    id: "qixian",
    name: "祁县 · 昭馀",
    nameEn: "Qixian",
    kind: "origin",
    country: "山西",
    coord: [112.333, 37.357],
    description:
      "晋商故里之一，与平遥、太谷构成票号三角。祁县子弟多任口外大柜掌柜或独资小商，构成精英化「走西口」群体。",
    source: "祁县志；晋商票号史",
  },
];

/** 口外关键关隘、城镇与河套垦区（示意到达点） */
export const DESTINATION_PORTS: Port[] = [
  {
    id: "shahukou",
    name: "杀虎口 · 西口",
    nameEn: "Shāhǔkǒu Pass",
    kind: "destination",
    country: "山西 · 右玉",
    /** OSM「杀虎口长城」关址，右玉县右卫镇（狭义西口） */
    coord: SHAHUKOU_PASS,
    established: 1650,
    description:
      "狭义「西口」最核心的陆路关隘。清代在此设关榷税，见证晋陕商人、贫民络绎出境，民谣「哥哥你走西口」所指多为此路。",
    source: "澎湃新闻《西口到底在哪》；百度百科·杀虎口",
  },
  {
    id: "hohhot",
    name: "归化城 · 呼和浩特",
    nameEn: "Hohhot (Guihua)",
    kind: "destination",
    country: "内蒙古 · 土默川",
    coord: [111.67, 40.818],
    description:
      "清代归化城与绥远城并立，商号云集，「茶、绸、皮毛」互市鼎盛，是走西口人口第一大吸纳中心。",
    source: "呼和浩特志；内蒙古通史",
  },
  {
    id: "baotou",
    name: "包头 · 水旱码头",
    nameEn: "Baotou",
    kind: "destination",
    country: "内蒙古 · 土默特—后套",
    coord: [109.84, 40.657],
    description:
      "黄河漕运与骆驼道交汇，清末民初成为皮毛、盐碱、粮食集散次中心，炼铁、皮毛加工作坊吸纳大批晋籍佣工。",
    source: "包头市志；晋商博物馆研究",
  },
  {
    id: "ordos",
    name: "鄂尔多斯 · 康巴什—东胜",
    nameEn: "Ordos",
    kind: "destination",
    country: "内蒙古 · 伊克昭盟旧地",
    coord: [109.99, 39.817],
    description:
      "晚清放垦后，晋陕农民进入鄂尔多斯台地租种蒙旗牧场或成为牧商中介，形成簇状聚落与周期性往返移民。",
    source: "鄂尔多斯史研究；移民实边档案",
  },
  {
    id: "wuyuan",
    name: "五原 · 后套灌区",
    nameEn: "Wuyuan",
    kind: "destination",
    country: "内蒙古 · 巴彦淖尔",
    coord: [108.27, 41.089],
    description:
      "后套水利开发后涌现大规模灌溉农业，丁戊奇荒与民初招垦潮中，晋北、陕北贫民在此落籍最众。",
    source: "河套农业史；绥远通志",
  },
  {
    id: "jining",
    name: "集宁 · 平地泉",
    nameEn: "Jining",
    kind: "destination",
    country: "内蒙古 · 乌兰察布",
    coord: [113.114, 41.035],
    description:
      "京张—京绥线要站，20 世纪成为口外新兴工矿、转运中心之一，铁路时代「走西口」的重要终点与再出发点。",
    source: "乌兰察布市志；铁路史",
  },
  {
    id: "yinchuan",
    name: "银川 · 宁夏平原",
    nameEn: "Yinchuan",
    kind: "destination",
    country: "宁夏",
    coord: [106.23, 38.487],
    description:
      "西口移民沿黄河西侧进入宁夏引黄灌区的一支，参与渠道修筑与稻麦轮作，与晋陕回民商帮交汇。",
    source: "宁夏移民史；西口研究综述",
  },
];

export const ALL_PORTS: Port[] = [...ORIGIN_PORTS, ...DESTINATION_PORTS];
