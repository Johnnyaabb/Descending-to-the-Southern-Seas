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

export const ORIGIN_PORTS: Port[] = [
  {
    id: "zhanglin",
    name: "樟林古港",
    nameEn: "Zhanglin Port",
    kind: "origin",
    country: "潮汕 · 澄海",
    /** 樟林古港遗址公园一带（OSM: Zhanglin Ancient Port Park，WGS-84） */
    coord: [116.82385, 23.56282],
    established: 1684,
    description:
      "「红头船故乡」，清代粤东第一大港。第一艘红头船从这里驶出，全盛时拥船队 40 余支。在泰国 150 万先侨中约六成由此扬帆。",
    source: "维基百科；澄海县志",
  },
  {
    id: "shantou",
    name: "汕头港",
    nameEn: "Shantou Port",
    kind: "origin",
    country: "潮汕 · 汕头",
    /** 汕头中心城区/商埠代表点（市政府一带，WGS-84） */
    coord: [116.708, 23.354],
    established: 1860,
    description:
      "1860 年 1 月 1 日开埠，潮海关设于妈屿岛，是潮汕近代「百载商埠」。1864–1911 年从这里出国谋生者达 294 万人次。",
    source: "《汕头海关志》",
  },
  {
    id: "dongli",
    name: "东里港",
    nameEn: "Dongli Port",
    kind: "origin",
    country: "潮汕 · 澄海",
    /** 澄海东里镇镇区一带（WGS-84，与维基东里镇坐标一致量级） */
    coord: [116.819, 23.557],
    description: "樟林港的卫星港，红头船辅助启锚地之一。",
    source: "澄海县志",
  },
  {
    id: "dahao",
    name: "达濠",
    nameEn: "Dahao",
    kind: "origin",
    country: "潮汕 · 濠江",
    /** 濠江区达濠街道一带（WGS-84） */
    coord: [116.727, 23.286],
    description: "汕头湾南岸传统渔商港，潮汕渔家下南洋重要出发地。",
    source: "潮汕地方志",
  },
  {
    id: "haimen",
    name: "海门",
    nameEn: "Haimen",
    kind: "origin",
    country: "潮汕 · 潮阳",
    /** 潮阳区海门镇沿海一侧（WGS-84） */
    coord: [116.612, 23.188],
    description: "潮阳古海门所，沿海居民赴暹罗、安南的早期出发点之一。",
    source: "潮阳县志",
  },
];

export const DESTINATION_PORTS: Port[] = [
  {
    id: "bangkok",
    name: "曼谷",
    nameEn: "Bangkok",
    kind: "destination",
    country: "泰国",
    coord: [100.502, 13.7563],
    established: 1782,
    description:
      "1767 年达信王建吞武里王朝（湄南河西岸），1782 年拉玛一世迁都曼谷。19 世纪中叶起为潮人最重要的目的地，今曼谷耀华力路（唐人街）即潮汕华人聚居核心。",
    source: "泰国潮州会馆",
  },
  {
    id: "pattani",
    name: "北大年",
    nameEn: "Pattani",
    kind: "destination",
    country: "泰南马来亚",
    coord: [101.281, 6.866],
    description: "暹罗南部早期与潮汕通商的重要据点，红头船航线南端节点。",
    source: "暹罗-潮汕航运史",
  },
  {
    id: "singapore",
    name: "新加坡",
    nameEn: "Singapore",
    kind: "destination",
    country: "新加坡",
    coord: [103.819, 1.352],
    established: 1819,
    description:
      "1819 年莱佛士登陆后辟为自由港，潮人随即大量涌入；1830 年代潮帮已主导甘蜜与胡椒种植。今约 45 万潮人。",
    source: "新加坡潮州八邑会馆；维基",
  },
  {
    id: "penang",
    name: "槟城",
    nameEn: "Penang",
    kind: "destination",
    country: "马来亚",
    coord: [100.330, 5.414],
    established: 1786,
    description: "1786 年莱特上校登陆，是马来亚最早的英属殖民港，潮人聚居于乔治市与威省。",
    source: "马来亚华侨史",
  },
  {
    id: "malacca",
    name: "马六甲",
    nameEn: "Malacca",
    kind: "destination",
    country: "马来亚",
    coord: [102.249, 2.196],
    description: "海上丝绸之路古港，明清以来即有潮汕商人定居，多与峇峇娘惹文化融合。",
    source: "马来亚华侨史",
  },
  {
    id: "johorbahru",
    name: "新山",
    nameEn: "Johor Bahru",
    kind: "destination",
    country: "马来亚 · 柔佛",
    coord: [103.760, 1.4927],
    established: 1855,
    description: "潮人「港主制度」中心，柔佛胡椒甘蜜港主多为潮汕籍，影响柔佛百年开发史。",
    source: "柔佛港主史",
  },
  {
    id: "saigon",
    name: "西贡-堤岸",
    nameEn: "Saigon-Cholon",
    kind: "destination",
    country: "越南",
    coord: [106.660, 10.762],
    description: "越南南方最大华人聚居地堤岸，潮汕、广府、福建、客家、海南五帮共聚，潮人主理碾米业。",
    source: "越南华侨史",
  },
  {
    id: "phnompenh",
    name: "金边",
    nameEn: "Phnom Penh",
    kind: "destination",
    country: "柬埔寨",
    coord: [104.916, 11.562],
    description: "柬埔寨首都，潮汕华人长期主导大米、橡胶、典当业，今潮人约 50 余万。",
    source: "柬埔寨华人志",
  },
  {
    id: "batavia",
    name: "巴达维亚（雅加达）",
    nameEn: "Batavia / Jakarta",
    kind: "destination",
    country: "印尼 · 爪哇",
    coord: [106.845, -6.208],
    established: 1619,
    description: "荷属东印度首都，张弼士最初在此白手起家。潮人多经营椰子、咖啡、橡胶种植与贸易。",
    source: "印尼华侨史；张弼士传",
  },
  {
    id: "medan",
    name: "棉兰",
    nameEn: "Medan",
    kind: "destination",
    country: "印尼 · 苏门答腊",
    coord: [98.672, 3.595],
    established: 1860,
    description: "苏门答腊东岸烟草、橡胶种植中心，1860 年代后大批潮汕、客家契约华工被运至此地。",
    source: "苏门答腊华侨史",
  },
];

export const ALL_PORTS: Port[] = [...ORIGIN_PORTS, ...DESTINATION_PORTS];
