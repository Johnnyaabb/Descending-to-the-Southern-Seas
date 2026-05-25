export type PortKind = "origin" | "destination";

export interface Port {
  id: string;
  name: string;
  nameEn: string;
  kind: PortKind;
  country: string;
  /** WGS-84 [lng, lat]，标注具体历史地标（关隘/港区/铁路枢纽） */
  coord: [number, number];
  established?: number;
  description: string;
  source: string;
}

/**
 * 闯关出发地与华北集散枢纽。
 * 坐标取关隘、港区、铁路枢纽等实际节点，而非仅行政中心。
 */
export const ORIGIN_PORTS: Port[] = [
  {
    id: "shanhaiguan",
    name: "山海关",
    nameEn: "Shanhai Pass",
    kind: "origin",
    country: "直隶 · 秦皇岛境",
    /** 天下第一关城楼（明长城东端关隘，WGS-84） */
    coord: [119.7542, 40.0114],
    established: 1381,
    description:
      "明长城东端「天下第一关」，清代以来华北陆路进入关东的必经关隘。民谣所谓「闯关东」即指出此关——近代京奉铁路关城车站与关楼毗邻，是陆路闯关最象征性的出发点。",
    source: "维基百科·山海关；OpenStreetMap 关城节点",
  },
  {
    id: "yantai",
    name: "烟台港",
    nameEn: "Yantai Port",
    kind: "origin",
    country: "山东 · 胶东半岛",
    /** 芝罘湾港区（近代通商口岸核心，WGS-84） */
    coord: [121.393, 37.541],
    established: 1861,
    description:
      "第二次鸦片战争后辟为通商口岸，芝罘湾迅速成为胶东闯关渡渤海第一大港。晚清民国数百万山东移民由此乘船抵大连、营口、安东等辽东口岸，航程约 100–150 海里，是海路闯关主通道。",
    source: "烟台港志；维基百科·烟台开埠",
  },
  {
    id: "weihai",
    name: "威海港",
    nameEn: "Weihai Port",
    kind: "origin",
    country: "山东 · 胶东半岛",
    /** 威海港客运/老港区一带（WGS-84） */
    coord: [122.158, 37.509],
    established: 1898,
    description:
      "英租威海卫时期港口与渔业航运发达，胶东东部（文登、荣成等）闯关者多由此泛海北上，或换乘烟台—大连航线，与烟台构成胶东「双港出海」格局。",
    source: "威海市志·港口航运篇",
  },
  {
    id: "jinan",
    name: "济南",
    nameEn: "Jinan",
    kind: "origin",
    country: "山东 · 腹地枢纽",
    /** 济南站（胶济铁路北端枢纽，WGS-84） */
    coord: [116.991, 36.668],
    description:
      "山东省会与胶济铁路北端枢纽，鲁西、鲁南、鲁中闯关者在北上津浦线转京奉线之前的重要集散地；灾荒年份常由此集结成批难民北行。",
    source: "济南市志；胶济铁路史",
  },
  {
    id: "tianjin",
    name: "天津",
    nameEn: "Tianjin",
    kind: "origin",
    country: "直隶 · 华北咽喉",
    /** 天津站/海河三岔口商埠区（WGS-84） */
    coord: [117.21, 39.136],
    established: 1860,
    description:
      "北方第一大埠，津浦、京奉铁路在此交汇。直隶、河南、山西移民多顺大运河或铁路至此换乘北上列车，经唐山、秦皇岛出山海关进入关东。",
    source: "天津市志；《华北近代交通史》",
  },
];

/**
 * 关东主要迁入地与近代城市化节点。
 * 陆路移民多先抵沈阳再向北分流；海路移民多在大连、营口、安东登陆后再进入腹地。
 */
export const DESTINATION_PORTS: Port[] = [
  {
    id: "shenyang",
    name: "沈阳（奉天）",
    nameEn: "Shenyang / Mukden",
    kind: "destination",
    country: "辽宁 · 辽东腹地",
    /** 沈阳故宫/奉天城中心（清代陪都，WGS-84） */
    coord: [123.454, 41.796],
    established: 1625,
    description:
      "清代陪都、晚清民国东北军政中心，陆路闯关「第一站」。移民出山海关后沿辽西走廊抵锦州，再进入沈阳平原；此后分流吉林、黑龙江或内蒙东部垦区。",
    source: "沈阳市志；维基百科·沈阳",
  },
  {
    id: "dalian",
    name: "大连（旅大）",
    nameEn: "Dalian / Lüda",
    kind: "destination",
    country: "辽宁 · 辽东半岛南端",
    /** 大连港大窑湾/港区代表点（WGS-84） */
    coord: [121.643, 38.921],
    established: 1899,
    description:
      "辽东半岛南端深水港，胶东海路闯关最主要的登陆点之一。俄租「达里尼」及日占时期港口与中东铁路南线联运，移民登陆后或留连、或转铁路北上沈阳、长春。",
    source: "大连市志·港口篇",
  },
  {
    id: "yingkou",
    name: "营口（牛庄）",
    nameEn: "Yingkou / Niuzhuang",
    kind: "destination",
    country: "辽宁 · 辽河口",
    /** 营口港/辽河口没沟营开埠地（WGS-84） */
    coord: [122.106, 40.626],
    established: 1861,
    description:
      "1858《天津条约》称「牛庄」开埠，1861 关区实际设于没沟营（今营口市区）。辽河航运终点，胶东帆船可经渤海湾北上在此登陆，再沿河或陆路进入辽东腹地。",
    source: "维基百科·营口；《营口市志·口岸篇》",
  },
  {
    id: "dandong",
    name: "安东（丹东）",
    nameEn: "Dandong / Antung",
    kind: "destination",
    country: "辽宁 · 鸭绿江口",
    /** 丹东/安东城区与鸭绿江口（WGS-84） */
    coord: [124.354, 40.129],
    established: 1907,
    description:
      "辽东半岛东端鸭绿江口城市，近代称「安东」。胶东移民可沿海北上在此登陆，亦是连接辽东与鸭绿江流域的口岸；与大连、营口并列为海路闯关重要到达点。",
    source: "丹东市志；国家民委《闯关东》专题",
  },
  {
    id: "changchun",
    name: "长春",
    nameEn: "Changchun",
    kind: "destination",
    country: "吉林 · 松辽平原腹地",
    /** 长春站/满铁附属地中心（WGS-84） */
    coord: [125.325, 43.897],
    established: 1800,
    description:
      "中东铁路南线与东线枢纽，民国时期吉林省会、伪满「新京」。移民多先抵沈阳，再沿铁路经四平北上定居松辽平原中部。",
    source: "长春市志；中东铁路史",
  },
  {
    id: "harbin",
    name: "哈尔滨",
    nameEn: "Harbin",
    kind: "destination",
    country: "黑龙江 · 松花江流域",
    /** 哈尔滨站/中央大街历史城区（WGS-84） */
    coord: [126.632, 45.756],
    established: 1898,
    description:
      "中东铁路枢纽，「火车拉来的城市」。移民沿铁路从沈阳—长春一线继续北上，在松花江畔垦荒、务工、经商；20 世纪初即成为远东重要商埠。",
    source: "哈尔滨市志；《中东铁路史稿》",
  },
  {
    id: "qiqihar",
    name: "齐齐哈尔",
    nameEn: "Qiqihar",
    kind: "destination",
    country: "黑龙江 · 嫩江流域",
    /** 齐齐哈尔站/嫩江岸城区（WGS-84） */
    coord: [123.918, 47.342],
    established: 1691,
    description:
      "清代黑龙江将军驻地、近代黑龙江省会。闯关移民抵达哈尔滨后可继续沿铁路或陆路北上，在嫩江流域开垦草原湿地，为关东最北端的农垦终点之一。",
    source: "齐齐哈尔市志",
  },
];

export const ALL_PORTS: Port[] = [...ORIGIN_PORTS, ...DESTINATION_PORTS];
