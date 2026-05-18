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
    id: "lift-sea-ban",
    year: 1684,
    title: "康熙解除海禁",
    location: "潮汕",
    coord: [116.82385, 23.56282],
    summary: "广东海禁正式废止，红头船时代开启。",
    detail:
      "1684 年（康熙二十三年）清廷废除迁海令、解除海禁，大量沿海居民得以恢复海上贸易活动。第一艘红头船便从樟林古港出海，下南洋的大幕由此拉开。",
    source: "维基百科·下南洋；红头船百度百科",
    category: "policy",
  },
  {
    id: "red-ship-named",
    year: 1727,
    title: "「红头船」正式命名",
    location: "樟林港",
    coord: [116.82385, 23.56282],
    summary: "雍正规定广东商船船头漆红，「红头船」一名由此而来。",
    detail:
      "1727 年（雍正五年）朝廷再次开放海禁，并规定各省商船须有标志：广东商船船头与大桅一律漆成红色，与福建蓝头船相区分，「红头船」之名遂传遍南洋。",
    source: "红头船百度百科",
    category: "policy",
  },
  {
    id: "taksin",
    year: 1767,
    title: "达信王建吞武里王朝",
    location: "暹罗 · 吞武里",
    coord: [100.502, 13.7263],
    summary: "潮裔郑信即位，主动招纳潮汕移民。",
    detail:
      "1767 年缅甸破阿瑜陀耶后，潮汕澄海后裔郑信（达信王）光复暹罗、建吞武里王朝（1767–1782）。他大力招纳潮汕移民赴暹经商农耕，被尊为「潮人入暹之父」，奠定了泰国潮汕人的根基。",
    source: "泰国潮州会馆；维基百科·达信",
    category: "settlement",
  },
  {
    id: "raffles-singapore",
    year: 1819,
    title: "莱佛士开埠新加坡",
    location: "新加坡",
    coord: [103.819, 1.352],
    summary: "新加坡成为自由港，潮人随即涌入。",
    detail:
      "1819 年莱佛士爵士登陆新加坡，将其辟为英属自由港。潮人迅速从马六甲、廖内移入，1830 年代潮帮已主导甘蜜、胡椒种植，渐成华人五大方言群之一。",
    source: "新加坡潮州八邑会馆",
    category: "settlement",
  },
  {
    id: "shantou-treaty-port",
    year: 1860,
    title: "汕头开埠",
    location: "汕头",
    /** 妈屿岛（潮海关初设处，WGS-84） */
    coord: [116.739, 23.317],
    summary: "1 月 1 日潮海关挂牌，汕头进入「百载商埠」时代。",
    detail:
      "依据《天津条约》，1860 年 1 月 1 日潮海关在妈屿岛挂牌，汕头正式开埠，成为全国第三个、广东第二个设关口岸。蒸汽轮船航线随之取代红头船，汕头跃居中国近代最重要的移民出洋港之一。",
    source: "中新网；《汕头海关志》",
    category: "policy",
  },
  {
    id: "convention-of-peking",
    year: 1860,
    title: "《北京条约》契约华工合法化",
    location: "北京",
    coord: [116.404, 39.904],
    summary: "条约新增条款：清廷不得阻止英法招募华工出国。",
    detail:
      "1860 年冬，英法联军逼清廷签订《北京条约》，附加条款明确：「清廷不得阻止英、法两国招募华工出国。」由此，从汕头、厦门启运的「猪仔贸易」获得法律合法性，1860–1912 年间被运往海外的契约华工保守估计 200 万人，最多可达 500 万。",
    source: "维基百科；中新网",
    category: "policy",
  },
  {
    id: "suez-canal",
    year: 1869,
    title: "苏伊士运河通航",
    location: "苏伊士",
    coord: [32.330, 30.025],
    summary: "全球航运革命，加速蒸汽轮船取代红头船。",
    detail:
      "1869 年苏伊士运河通航，欧亚航线大幅缩短，蒸汽轮船经济优势凸显。红头船帆船迅速被淘汰，汕头港至新加坡、曼谷的轮船航线全面建立。",
    source: "维基百科·苏伊士运河",
    category: "economic",
  },
  {
    id: "xinhai",
    year: 1911,
    title: "辛亥革命",
    location: "武昌",
    coord: [114.305, 30.593],
    summary: "清亡民国立，南洋华侨为革命输血。",
    detail:
      "辛亥革命前后，南洋潮汕华侨积极支持孙中山。张弼士一次性捐银 30 万两。新加坡的潮人会馆、印尼的潮汕商号都是革命党重要据点。",
    source: "张弼士传",
    category: "war",
  },
  {
    id: "1922-typhoon",
    year: 1922,
    title: "潮汕「八二」风灾",
    location: "汕头",
    coord: [116.708, 23.354],
    summary: "1922 年 8 月 2 日特大风灾，死亡逾 5 万。",
    detail:
      "1922 年 8 月 2 日（农历六月初十）夜，超强台风正面袭击潮汕，潮汕沿海死亡逾 5 万人，无数村庄被海水淹没。灾后大批幸存者南渡谋生，推动民国移民第二高峰。",
    source: "潮汕地方志",
    category: "war",
  },
  {
    id: "great-depression",
    year: 1929,
    title: "世界大萧条",
    location: "纽约",
    coord: [-74.006, 40.713],
    summary: "南洋经济衰退，侨汇短暂中断。",
    detail:
      "1929 年华尔街股灾引发全球大萧条，橡胶、锡、糖价格暴跌，南洋潮汕华工大量失业。侨汇骤减导致潮汕本土经济短暂恶化，但 1933 年后逐步复苏。",
    source: "广东省侨办",
    category: "economic",
  },
  {
    id: "war-of-resistance",
    year: 1937,
    title: "抗战全面爆发",
    location: "卢沟桥",
    coord: [116.215, 39.846],
    summary: "南洋潮人反哺祖国，倾力支援抗战。",
    detail:
      "卢沟桥事变后，南洋潮汕华侨在陈嘉庚、蚁光炎等领导下组织筹赈祖国难民总会，捐款汇国，输送医药与机工。1939 年汕头沦陷，下南洋航线被迫中断。",
    source: "南洋华侨筹赈祖国难民总会档案",
    category: "war",
  },
];

export function eventsAtYear(year: number): HistoricalEvent[] {
  return EVENTS.filter((e) => e.year === year);
}
