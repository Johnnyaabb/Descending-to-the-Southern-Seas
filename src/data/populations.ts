export interface CountryDiasporaSnapshot {
  country: string;
  destinationIds: string[];
  modernTotal: number;
  teochewCount: number;
  share: string;
  source: string;
}

/**
 * 当代海外潮汕人分布快照（用于地图右下角图例参考与到达港人口规模）
 * 数据：综合汕头侨务系统调查、圭海四记《五大帮人口考》、各国潮州会馆
 */
export const DIASPORA_SNAPSHOT: CountryDiasporaSnapshot[] = [
  {
    country: "泰国",
    destinationIds: ["bangkok", "pattani"],
    modernTotal: 8_000_000,
    teochewCount: 3_920_000,
    share: "占泰国华侨总数 56%",
    source: "汕头侨务系统调查；圭海四记",
  },
  {
    country: "印尼",
    destinationIds: ["batavia", "medan"],
    modernTotal: 3_000_000,
    teochewCount: 740_000,
    share: "苏门答腊东岸最集中",
    source: "汕头侨务系统调查",
  },
  {
    country: "马来西亚",
    destinationIds: ["penang", "malacca", "johorbahru"],
    modernTotal: 800_000,
    teochewCount: 740_000,
    share: "柔佛港主制度遗产显著",
    source: "汕头侨务系统调查",
  },
  {
    country: "新加坡",
    destinationIds: ["singapore"],
    modernTotal: 450_000,
    teochewCount: 720_000,
    share: "潮帮居新加坡华人五大方言群第二",
    source: "新加坡潮州八邑会馆",
  },
  {
    country: "越南",
    destinationIds: ["saigon"],
    modernTotal: 250_000,
    teochewCount: 476_000,
    share: "西贡-堤岸最集中",
    source: "汕头侨务系统调查",
  },
  {
    country: "柬埔寨",
    destinationIds: ["phnompenh"],
    modernTotal: 200_000,
    teochewCount: 539_000,
    share: "潮人占柬华八成以上",
    source: "汕头侨务系统调查",
  },
];

export const GLOBAL_TEOCHEW_TOTAL = 60_000_000; // 全球潮籍人士 ~6000 万
export const OVERSEAS_TEOCHEW_TOTAL = 20_000_000; // 海外潮人 ~2000 万
