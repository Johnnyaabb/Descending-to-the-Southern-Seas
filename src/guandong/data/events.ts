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
    id: "shunzhi-capital-move-context",
    year: 1644,
    title: "清军入关与辽东善后",
    location: "北京",
    coord: [116.407, 39.904],
    summary: "明清鼎革背景下清廷亟需充实辽东防务与屯垦以稳固后方。",
    detail:
      "崇祯十七年清军入关定鼎北京后，辽东历经明清战事荒芜已久，清廷顺势颁布多项屯垦条例鼓励华北贫民北上种地输粮，以为八旗驻军提供物质基础——此为入关移民的制度源头之一。",
    source: "维基百科·清军入关；《清实录·世祖实录》综述",
    category: "policy",
  },
  {
    id: "liaodong-recruit-edict",
    year: 1653,
    title: "辽东招民开垦条例",
    location: "京师（诏谕辽东）",
    coord: [116.407, 39.904],
    summary: "顺治十年颁布优惠政策，动员山东等地农民移居辽东开垦。",
    detail:
      "条例承诺数年免征赋役并提供牲畜种子补助，吸引了第一批大规模有组织闯关垦荒人群；此后康熙初年仍有零星招垦告示，但随着边疆形势变化很快被更具限制性的封禁政策所取代。",
    source: "维基百科·闯关东；中国历史研究院边疆专题综述",
    category: "policy",
  },
  {
    id: "willow-palisade-ban",
    year: 1668,
    title: "辽东封禁与柳条边强化",
    location: "沈阳 · 柳条边沿线",
    coord: [123.454, 41.796],
    summary: "清廷转而实行满洲封禁，移民涌入转入长达两百余年的非法闯关时期。",
    detail:
      "康熙中叶以后清廷为保护「龙兴之地」生态与旗地利益修筑并不断加长柳条边墙，理论上阻止汉人涌入腹地；黄河下游连年灾荒迫使成千上万贫民铤而走险闯关北上，是为民间称谓「闯关东」的起点语境之一。",
    source: "维基百科·柳条边；维基百科·闯关东",
    category: "policy",
  },
  {
    id: "beijing-treaty-border",
    year: 1860,
    title: "《北京条约》与东北边疆危机",
    location: "承德 · 京师议约",
    coord: [117.939, 40.976],
    summary: "沙俄攫取黑龙江以北领土刺激清廷转向移民实边政策。",
    detail:
      "第二次鸦片战争末期签订的系列条约使中国东北边疆直面列强蚕食压力；清廷被迫认识到仅靠军事驻防不足以守卫广袤边疆，转而鼓励汉人移居开垦充实边防并开辟税收来源；闯关关东自此带有更强的国家战略色彩。",
    source: "维基百科·中俄北京条约",
    category: "policy",
  },
  {
    id: "yingkou-open-port",
    year: 1861,
    title: "营口（牛庄）开埠",
    location: "营口 · 辽河口（没沟营）",
    coord: [122.106, 40.626],
    summary: "东北首个近代通商口岸之一，海陆联运吸纳胶东闯关帆船客流。",
    detail:
      "根据《天津条约》营口辟为商埠后辽河航运可与渤海海运相接，胶东半岛闯关贫民亦可乘船北上转入河口抵达辽东腹地；口岸关税档案中长期充斥着华北跨省流动人口记载。",
    source: "维基百科·营口；《营口市志·口岸篇》",
    category: "economic",
  },
  {
    id: "chinese-eastern-railway-start",
    year: 1898,
    title: "中东铁路修筑开工",
    location: "哈尔滨 · 松花江畔",
    coord: [126.632, 45.756],
    summary: "沙俄修筑中东铁路催生近代城市化浪潮并大举吸纳华北劳力北上。",
    detail:
      "铁路土建阶段招募数以万计的修路工人与后勤商贩；哈尔滨从小渔村跃升为国际性铁路枢纽城市；闯关关东的路线重心日益由单纯的驿路迁徙转向与现代机车轮船联运并举的时代。",
    source: "维基百科·中东铁路；《中东铁路沿革史》综述",
    category: "economic",
  },
  {
    id: "russo-japanese-war-mukden",
    year: 1905,
    title: "日俄战争奉天会战落幕",
    location: "沈阳 · 辽沈平原",
    coord: [123.461, 41.677],
    summary: "列强争霸加深清廷危机感，客观上催生战后更大规模的移民实边浪潮。",
    detail:
      "奉天会战伤亡惨烈震动中外；战后清政府与日本、俄国在东北的利益妥协迫使清廷加速废除满洲禁令并招商引资垦荒；数百万华北贫民在接下来的二十余年里如潮水般涌入东北盆地与三江平原。",
    source: "维基百科·日俄战争；《近代东北移民史》相关章节",
    category: "war",
  },
  {
    id: "xinhai-northeast",
    year: 1912,
    title: "中华民国成立 · 北洋招垦延续",
    location: "南京 · 临时政府成立",
    coord: [118.798, 32.058],
    summary: "共和肇始并未阻断闯关大潮，北洋政权延续清末鼓励垦荒政策。",
    detail:
      "民国初年军阀割据战乱频繁，华北天灾人祸此起彼伏；张作霖等地方实力派为保障粮食赋税鼓励开荒招垦；大连、营口、丹东等口岸与烟台之间轮船航线空前繁忙形成季节性候鸟式劳工迁徙景观。",
    source: "维基百科·中华民国；《近代东北移民史》",
    category: "policy",
  },
  {
    id: "huanggutun-incident",
    year: 1928,
    title: "皇姑屯事件 · 张学良执政前夕",
    location: "沈阳 · 皇姑屯",
    coord: [123.425, 41.817],
    summary: "军阀更迭动荡短暂冲击闯关秩序但未终结迁徙大趋势。",
    detail:
      "张作霖专列被日军炸毁震动远东政局；张学良随后东北易帜归附国民政府；闯关关东的主流驱动力仍然是华北过剩人口与东北广袤土地的结构性反差而非政局单次事变本身。",
    source: "维基百科·皇姑屯事件",
    category: "war",
  },
  {
    id: "mukden-incident",
    year: 1931,
    title: "九一八事变 · 东北沦陷",
    location: "沈阳 · 北大营",
    coord: [123.468, 41.795],
    summary: "日本武力侵占东北标志着自发闯关大潮被迫与日本国策殖民迁徙交织。",
    detail:
      "一夜之间关东军占领沈阳并向北迅速扩张建立伪满洲国；此后日本推行武装移民「开拓团」政策挤压中国农户生存空间；华北闯关的性质由传统的谋生迁徙转变为在日伪严密统治下的强制性劳工调配为主的新形态。",
    source: "维基百科·九一八事变",
    category: "war",
  },
  {
    id: "marco-polo-bridge",
    year: 1937,
    title: "七七事变 · 华北难民新一轮北上压力",
    location: "卢沟桥 · 北平西南",
    coord: [116.215, 39.849],
    summary: "全面抗战爆发催生华北流离民众冒险闯关谋生与新四军八路军游击根据地交错的人口迁徙景观。",
    detail:
      "日军南下侵占华北平原大量农田荒芜工厂关停；一部分难民向西向南流亡亦有部分人铤而走险闯关东北在日伪严密关卡缝隙中求存——此一阶段的闯关迁移已是沦陷区多重压迫下的悲情支线而非清末民初意义上的主流大潮。",
    source: "维基百科·七七事变；《伪满洲国史料汇编·劳工卷》综述",
    category: "war",
  },
  {
    id: "soviet-invasion-manchuria",
    year: 1945,
    title: "苏联出兵东北 · 日本战败投降",
    location: "长春 · 关东军大本营瓦解",
    coord: [125.325, 43.897],
    summary: "抗战胜利短暂重塑东北人口格局但随即转入国共内战新时期的人口迁徙形态。",
    detail:
      "1945 年 8 月苏联红军出兵东北击溃关东军；大量日本侨俘遣返、「开拓团」瓦解；华北山东老区移民短暂回流亦有新一轮闯关觅食浪潮；然而内战炮火再起终究酝酿着中华人民共和國成立后计划经济体制下迁徙方式的深层变革。",
    source: "维基百科·八月风暴行动；《中国人口史·东北卷》相关章节",
    category: "war",
  },
];

export function eventsAtYear(year: number): HistoricalEvent[] {
  return EVENTS.filter((e) => e.year === year);
}
