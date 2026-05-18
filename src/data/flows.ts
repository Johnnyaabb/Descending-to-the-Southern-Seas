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
 * 潮汕→南洋迁徙弧线数据。volume 是估算的累计出洋人次，用于：
 * 1. 控制弧线宽度（对数比例）
 * 2. 计算到达港的累计人口规模
 * 3. 时间窗激活动画
 *
 * 来源：综合《汕头海关志》、广东省侨办、维基百科、泰国/新加坡/马来亚华侨史
 */
export const FLOWS: MigrationFlow[] = [
  // ─── 阶段 1：海禁初开 1684–1781 ───
  {
    id: "zhanglin-bangkok-early",
    fromId: "zhanglin",
    toId: "bangkok",
    startYear: 1684,
    endYear: 1781,
    volume: 80000,
    note: "康熙乾隆年间樟林港至暹罗的红头船早期贸易移民。",
    source: "维基百科·下南洋",
    phaseId: "openSea",
  },
  {
    id: "zhanglin-pattani-early",
    fromId: "zhanglin",
    toId: "pattani",
    startYear: 1684,
    endYear: 1781,
    volume: 15000,
    note: "马来半岛北部早期定居。",
    source: "暹罗-潮汕航运史",
    phaseId: "openSea",
  },
  {
    id: "haimen-saigon-early",
    fromId: "haimen",
    toId: "saigon",
    startYear: 1700,
    endYear: 1781,
    volume: 8000,
    note: "潮阳海门赴越南南圻的早期商船。",
    source: "越南华侨史",
    phaseId: "openSea",
  },
  {
    id: "zhanglin-batavia-early",
    fromId: "zhanglin",
    toId: "batavia",
    startYear: 1720,
    endYear: 1781,
    volume: 6000,
    note: "经马六甲海峡至荷属东印度的早期潮汕商人。",
    source: "印尼华侨史",
    phaseId: "openSea",
  },

  // ─── 阶段 2：红头船鼎盛 1782–1859 ───
  {
    id: "zhanglin-bangkok-peak",
    fromId: "zhanglin",
    toId: "bangkok",
    startYear: 1782,
    endYear: 1859,
    volume: 880000,
    note: "1822–1858 樟林港赴暹罗潮人 88 万（涵盖前后扩展）。",
    source: "《汕头海关志》",
    phaseId: "redShipPeak",
  },
  {
    id: "dongli-bangkok-peak",
    fromId: "dongli",
    toId: "bangkok",
    startYear: 1782,
    endYear: 1859,
    volume: 90000,
    note: "樟林港辅助港分流。",
    source: "澄海县志",
    phaseId: "redShipPeak",
  },
  {
    id: "zhanglin-singapore-peak",
    fromId: "zhanglin",
    toId: "singapore",
    startYear: 1819,
    endYear: 1859,
    volume: 120000,
    note: "莱佛士开埠后潮人涌入，主导甘蜜胡椒种植。",
    source: "新加坡潮州八邑会馆",
    phaseId: "redShipPeak",
  },
  {
    id: "zhanglin-penang-peak",
    fromId: "zhanglin",
    toId: "penang",
    startYear: 1786,
    endYear: 1859,
    volume: 60000,
    note: "槟城开埠后潮人参与商贸、种植。",
    source: "马来亚华侨史",
    phaseId: "redShipPeak",
  },
  {
    id: "dahao-saigon-peak",
    fromId: "dahao",
    toId: "saigon",
    startYear: 1782,
    endYear: 1859,
    volume: 50000,
    note: "潮阳达濠至越南堤岸的潮商航线。",
    source: "越南华侨史",
    phaseId: "redShipPeak",
  },
  {
    id: "zhanglin-batavia-peak",
    fromId: "zhanglin",
    toId: "batavia",
    startYear: 1782,
    endYear: 1859,
    volume: 40000,
    note: "荷属东印度种植园契约劳工兴起前的自由移民。",
    source: "印尼华侨史",
    phaseId: "redShipPeak",
  },
  {
    id: "zhanglin-malacca-peak",
    fromId: "zhanglin",
    toId: "malacca",
    startYear: 1782,
    endYear: 1859,
    volume: 20000,
    note: "马六甲海峡贸易移民。",
    source: "马来亚华侨史",
    phaseId: "redShipPeak",
  },

  // ─── 阶段 3：汕头开埠与契约华工 1860–1911 ───
  {
    id: "shantou-bangkok-treaty",
    fromId: "shantou",
    toId: "bangkok",
    startYear: 1860,
    endYear: 1911,
    volume: 1500000,
    note: "汕头开埠后至辛亥革命，赴暹罗最主流。",
    source: "《汕头海关志》",
    phaseId: "shantouTreaty",
  },
  {
    id: "shantou-singapore-treaty",
    fromId: "shantou",
    toId: "singapore",
    startYear: 1860,
    endYear: 1911,
    volume: 500000,
    note: "新加坡为契约华工再分发中心，部分留居本地。",
    source: "新加坡潮州八邑会馆",
    phaseId: "shantouTreaty",
  },
  {
    id: "shantou-penang-treaty",
    fromId: "shantou",
    toId: "penang",
    startYear: 1860,
    endYear: 1911,
    volume: 240000,
    note: "槟城转口贸易、锡矿契约工。",
    source: "马来亚华侨史",
    phaseId: "shantouTreaty",
  },
  {
    id: "shantou-johorbahru-treaty",
    fromId: "shantou",
    toId: "johorbahru",
    startYear: 1860,
    endYear: 1911,
    volume: 180000,
    note: "柔佛港主制度下潮汕籍港主大量招工。",
    source: "柔佛港主史",
    phaseId: "shantouTreaty",
  },
  {
    id: "shantou-medan-treaty",
    fromId: "shantou",
    toId: "medan",
    startYear: 1865,
    endYear: 1911,
    volume: 200000,
    note: "苏门答腊烟草、橡胶种植园契约华工（猪仔贸易）。",
    source: "苏门答腊华侨史",
    phaseId: "shantouTreaty",
  },
  {
    id: "shantou-batavia-treaty",
    fromId: "shantou",
    toId: "batavia",
    startYear: 1860,
    endYear: 1911,
    volume: 150000,
    note: "爪哇蔗糖、种植园华工。张弼士在此奠定商业根基。",
    source: "印尼华侨史；张弼士传",
    phaseId: "shantouTreaty",
  },
  {
    id: "shantou-saigon-treaty",
    fromId: "shantou",
    toId: "saigon",
    startYear: 1860,
    endYear: 1911,
    volume: 120000,
    note: "法属交趾支那碾米、商贸契约工。",
    source: "越南华侨史",
    phaseId: "shantouTreaty",
  },
  {
    id: "shantou-phnompenh-treaty",
    fromId: "shantou",
    toId: "phnompenh",
    startYear: 1870,
    endYear: 1911,
    volume: 50000,
    note: "湄公河沿线潮人商贾与农工。",
    source: "柬埔寨华人志",
    phaseId: "shantouTreaty",
  },
  {
    id: "shantou-malacca-treaty",
    fromId: "shantou",
    toId: "malacca",
    startYear: 1860,
    endYear: 1911,
    volume: 60000,
    note: "海峡殖民地三地之一，潮商持续输入。",
    source: "马来亚华侨史",
    phaseId: "shantouTreaty",
  },

  // ─── 阶段 4：民国移民高峰 1912–1937 ───
  {
    id: "shantou-bangkok-republic",
    fromId: "shantou",
    toId: "bangkok",
    startYear: 1912,
    endYear: 1937,
    volume: 1800000,
    note: "民国期间赴泰国潮人继续暴增，1922 风灾尤甚。",
    source: "圭海四记《五大帮人口考》",
    phaseId: "republic",
  },
  {
    id: "shantou-singapore-republic",
    fromId: "shantou",
    toId: "singapore",
    startYear: 1912,
    endYear: 1937,
    volume: 600000,
    note: "汕头-新加坡航线轮船定期往返。",
    source: "新加坡华人志",
    phaseId: "republic",
  },
  {
    id: "shantou-penang-republic",
    fromId: "shantou",
    toId: "penang",
    startYear: 1912,
    endYear: 1937,
    volume: 200000,
    note: "马来亚锡橡两大产业吸纳大量潮工。",
    source: "马来亚华侨史",
    phaseId: "republic",
  },
  {
    id: "shantou-johorbahru-republic",
    fromId: "shantou",
    toId: "johorbahru",
    startYear: 1912,
    endYear: 1937,
    volume: 150000,
    note: "柔佛橡胶园开发高峰。",
    source: "柔佛港主史",
    phaseId: "republic",
  },
  {
    id: "shantou-saigon-republic",
    fromId: "shantou",
    toId: "saigon",
    startYear: 1912,
    endYear: 1937,
    volume: 200000,
    note: "潮汕「火砻」（碾米）业称雄堤岸。",
    source: "越南华侨史；陈慈黉传",
    phaseId: "republic",
  },
  {
    id: "shantou-phnompenh-republic",
    fromId: "shantou",
    toId: "phnompenh",
    startYear: 1912,
    endYear: 1937,
    volume: 120000,
    note: "金边、马德望潮汕商行林立。",
    source: "柬埔寨华人志",
    phaseId: "republic",
  },
  {
    id: "shantou-medan-republic",
    fromId: "shantou",
    toId: "medan",
    startYear: 1912,
    endYear: 1937,
    volume: 250000,
    note: "苏门答腊烟草、橡胶继续吸纳大量潮工。",
    source: "苏门答腊华侨史",
    phaseId: "republic",
  },
  {
    id: "shantou-batavia-republic",
    fromId: "shantou",
    toId: "batavia",
    startYear: 1912,
    endYear: 1937,
    volume: 200000,
    note: "巴达维亚潮商势力扩大。",
    source: "印尼华侨史",
    phaseId: "republic",
  },

  // ─── 阶段 5：战乱与终结 1938–1949 ───
  {
    id: "shantou-bangkok-war",
    fromId: "shantou",
    toId: "bangkok",
    startYear: 1938,
    endYear: 1949,
    volume: 120000,
    note: "抗战期间航线时断时续，1939 汕头沦陷后骤减。",
    source: "广东省侨办",
    phaseId: "warEnd",
  },
  {
    id: "shantou-singapore-war",
    fromId: "shantou",
    toId: "singapore",
    startYear: 1938,
    endYear: 1949,
    volume: 80000,
    note: "战时部分潮人辗转出洋避战。",
    source: "新加坡华人志",
    phaseId: "warEnd",
  },
  {
    id: "shantou-saigon-war",
    fromId: "shantou",
    toId: "saigon",
    startYear: 1945,
    endYear: 1949,
    volume: 60000,
    note: "战后短暂复苏后即被冷战切断。",
    source: "越南华侨史",
    phaseId: "warEnd",
  },
];

export function flowsActiveAt(year: number): MigrationFlow[] {
  return FLOWS.filter((f) => year >= f.startYear && year <= f.endYear);
}

/**
 * 给定 year, 返回该 destination 在 1684 → year 区间内累计接收的潮汕人数。
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
