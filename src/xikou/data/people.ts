export interface NotablePerson {
  id: string;
  name: string;
  nameEn: string;
  yearBorn: number;
  yearDied: number;
  originId: string;
  destinationId: string;
  emigrateYear: number;
  title: string;
  intro: string;
  story: string;
  source: string;
}

export const PEOPLE: NotablePerson[] = [
  {
    id: "wang-xiangqing",
    name: "王相卿",
    nameEn: "Wang Xiangqing",
    yearBorn: 1650,
    yearDied: 1720,
    originId: "xinzhou",
    destinationId: "hohhot",
    emigrateYear: 1675,
    title: "大盛魁联合创始人",
    intro: "太谷籍旅蒙伙友，康熙年间随军需商贩游走杀虎口—归化一线，后为大盛魁奠定驼队网络。",
    story:
      "王相卿少年随营贸易，自口内肩挑背负起步，擅识蒙古习俗与草场时令。雍正初，大盛魁名号正式确立，他以「合伙出财、学徒出师」的契约把晋北灾民与退伍兵吸纳为骆驼脚力，形成以归化城为中心的万里供销系统。大盛魁传说版本众多，人物生卒仍有待史料精考，但他作为民间叙事里的「西口创业原型」已成文化符号。",
    source: "百度百科·大盛魁；山西纪实·走西口",
  },
  {
    id: "zhang-jie-merchant",
    name: "张杰",
    nameEn: "Zhang Jie",
    yearBorn: 1655,
    yearDied: 1725,
    originId: "zhangjiakou",
    destinationId: "hohhot",
    emigrateYear: 1685,
    title: "张库旅蒙商",
    intro: "传说中与王相卿等人合伙的行商，代表「东口」与「西口」合力打开漠北市场。",
    story:
      "张杰起于张家口边贸，熟悉对俄皮毛等级与骆驼负重配比。清初蒙疆战事稍歇后，他把东口货物经台站线与西口商帮汇于归化城，再分发至乌里雅苏台、科布多。民间口述常把他与王相卿、史大学并称为大盛魁「三界柜」缔造者之一，体现群体创业而非单一英雄。",
    source: "张库大道研究；大盛魁口述史",
  },
  {
    id: "qiao-zhiyong",
    name: "乔致庸",
    nameEn: "Qiao Zhiyong",
    yearBorn: 1818,
    yearDied: 1907,
    originId: "qixian",
    destinationId: "baotou",
    emigrateYear: 1853,
    title: "乔家票号与口外扎柜",
    intro: "祁县乔家代表人物，以包头、归化多处扎柜支撑「汇通天下」票路。",
    story:
      "乔致庸执掌乔家商业时，正值河套水利开发与皮毛贸易兴盛。他在包头设庄收号、调剂现银，为晋中总号与口外柜坊搭建信息网络，雇员中多有走西口落户的二代移民。乔家大院成为晋商走口外成功叙事的视觉象征。",
    source: "祁县志；乔家大院研究",
  },
  {
    id: "qu-benqiao",
    name: "渠本翘",
    nameEn: "Qu Benqiao",
    yearBorn: 1862,
    yearDied: 1919,
    originId: "qixian",
    destinationId: "hohhot",
    emigrateYear: 1898,
    title: "保矿运动领袖 · 实业家",
    intro: "进士出身的祁县绅商，晚清领导争回山西矿权，推动新式公司在口外招股。",
    story:
      "渠本翘在收回福公司（英）矿权后，忙于整合晋省路矿公司。为筹措赔款与股本金，他多次亲赴归化、包头动员晋籍商人入股，把传统扎柜关系嫁接进近代公司法框架。其经历折射走西口财智回流关内的时代转换。",
    source: "山西保矿运动档案；渠本翘年谱",
  },
  {
    id: "duan-lvzhuang",
    name: "段履庄",
    nameEn: "Duan Lüzhuang",
    yearBorn: 1880,
    yearDied: 1940,
    originId: "taiyuan",
    destinationId: "hohhot",
    emigrateYear: 1905,
    title: "大盛魁末代大掌柜",
    intro: "晋阳人，清末民初接掌大盛魁，力图以银行、垦务公司转型自救。",
    story:
      "段履庄上任时，外蒙政局与俄边汇率已让驼道利润骤降。他引入绥远地方银行信贷、尝试以皮毛合作社代替散庄散户，但仍难挡军阀摊派与货币贬值。1936 年大盛魁歇业，他成为传统旅蒙模式的见证者。",
    source: "大盛魁研究；绥远通志",
  },
  {
    id: "folk-xikou-couple",
    name: "太春与玉莲（民间叙事）",
    nameEn: "Folk Archetypes",
    yearBorn: 1850,
    yearDied: 1920,
    originId: "hequ",
    destinationId: "wuyuan",
    emigrateYear: 1878,
    title: "民歌《走西口》原型",
    intro: "河曲走西口民谣中的虚构情侣，浓缩灾年离别、口外重逢的集体记忆。",
    story:
      "河曲、保德一带传唱百年的《走西口》将小夫妻痛哭离别写得字字滴血，太春赴后套谋生、玉莲在家纺织，互诉安全与归期。人物并非信史，却成为研究走西口情感结构、性别分工与伦理约束的第一手「口述文本」。",
    source: "河曲民歌集；山曲研究",
  },
];
