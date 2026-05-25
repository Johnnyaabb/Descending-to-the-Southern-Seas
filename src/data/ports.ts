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
  {
    id: "xiamen",
    name: "厦门港",
    nameEn: "Xiamen / Amoy",
    kind: "origin",
    country: "闽南 · 厦门一带",
    /** 厦门半岛商埠核心区一带（WGS-84） */
    coord: [118.089, 24.479],
    established: 1843,
    description:
      "清代以来闽南对洋贸易重镇；鸦片战争后为首开五口之一，与汕头并列为近代南洋契约华工与自由移民主要登船口岸。槟榔屿与海峡殖民地「闽帮」多由此线出海。",
    source: "《厦门海关历史档案》；南洋华侨史",
  },
  {
    id: "quanzhou",
    name: "泉州湾（晋江口—后渚）",
    nameEn: "Quanzhou Bay",
    kind: "origin",
    country: "闽南 · 泉州",
    /** 泉州市区—后渚港区海面代表坐标（WGS-84） */
    coord: [118.676, 24.874],
    description:
      "历代海舶聚所；晚清民国南安、晋江、惠安各县赴暹罗、槟城与新马务农营商者络绎不绝，与海澄、安溪等闽南网络叠合。",
    source: "《东西洋考》；泉州华侨史",
  },
  {
    id: "zhangzhou",
    name: "漳州湾外—月港海道示意",
    nameEn: "Zhangzhou / Yuegang approach",
    kind: "origin",
    country: "闽南 · 漳州",
    /** 九龙江口海域示意点（古月港岸线今昔变化大）（WGS-84） */
    coord: [117.96, 24.42],
    established: 1567,
    description:
      "隆庆元年部分开海以来，闽南商渔民经月港报税出洋的制度影响深远；晚清以降多改由厦门接驳，与海澄、云霄等县人下南洋的路线交织。",
    source: "《海澄县志》；闽南华侨史",
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
      "曼谷建都后继续为南洋最大都会之一。晚清以来耀华力路（唐人街）聚居大量潮汕与闽南华商，形成以潮、闽方言为基础的华人经济与社会网络。",
    source: "泰国潮州会馆",
  },
  {
    id: "pattani",
    name: "北大年",
    nameEn: "Pattani",
    kind: "destination",
    country: "泰南马来亚",
    coord: [101.281, 6.866],
    description: "暹罗南部早期与闽南、潮汕通商的重要据点，红头船与闽南海舶航线南向节点之一。",
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
      "1819 年莱佛士登陆后辟为自由港；闽、潮两省移民几乎与开埠同步涌入，形成以福建帮、潮州帮等方言群为主体的种植园商业与商行网络。今约数十万潮裔，更大口径的闽南、闽粤籍华裔人口规模更高。",
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
    description:
      "1786 年莱特上校登陆，是马来亚最早的英属殖民港之一；闽南、潮汕移民与峇峇土生华人共同塑造了乔治市的街肆与宗祠景观。",
    source: "马来亚华侨史",
  },
  {
    id: "malacca",
    name: "马六甲",
    nameEn: "Malacca",
    kind: "destination",
    country: "马来亚",
    coord: [102.249, 2.196],
    description: "海上丝绸之路古港，明清以来即有闽粤商人定居并与马来世界通婚融合，形成峇峇娘惹等地方华人文化。",
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
    description:
      "英属柔佛开发与「港主制度」下胡椒、甘蜜种植的重心；史实记载港主籍贯以潮、闽、客为主，与海峡殖民地劳工网络紧密相连。",
    source: "柔佛港主史",
  },
  {
    id: "saigon",
    name: "西贡-堤岸",
    nameEn: "Saigon-Cholon",
    kind: "destination",
    country: "越南",
    coord: [106.660, 10.762],
    description:
      "越南南方最大华人聚居地堤岸一带，闽南、潮州、广府、客家与海南方言群在历史上形成明显的街帮分区，潮人以碾米作坊闻名。",
    source: "越南华侨史",
  },
  {
    id: "phnompenh",
    name: "金边",
    nameEn: "Phnom Penh",
    kind: "destination",
    country: "柬埔寨",
    coord: [104.916, 11.562],
    description: "柬埔寨首都，闽南与潮汕华商长期主导大米、橡胶种植与典当行，近现代侨汇网路覆盖闽粤侨乡多个县份。",
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
    description:
      "荷属东印度首府，蔗糖与香料贸易中枢；闽南、潮汕与客家帮群在历史上长期经营种植园与商行，张弼士等侨领即发迹于此工商业网络。",
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
    description:
      "苏门答腊东岸烟草、橡胶种植重镇；晚清「猪仔贩运」鼎盛时期有大量闽粤契约华工经新加坡、槟城中转送达。",
    source: "苏门答腊华侨史",
  },
];

export const ALL_PORTS: Port[] = [...ORIGIN_PORTS, ...DESTINATION_PORTS];
