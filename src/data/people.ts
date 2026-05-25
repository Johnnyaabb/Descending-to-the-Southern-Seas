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
    id: "seah-eu-chin",
    name: "佘有进",
    nameEn: "Seah Eu Chin",
    yearBorn: 1805,
    yearDied: 1883,
    originId: "zhanglin",
    destinationId: "singapore",
    emigrateYear: 1823,
    title: "新加坡甘蜜大王",
    intro: "潮州府属移民，18 岁抵新加坡；与同期闽南帮群共同开拓胡椒与甘蜜种植业。",
    story:
      "佘有进 1823 年（莱佛士开埠仅 4 年后）随红头船抵新加坡，从一名穷困华侨成长为「甘蜜王」（Kangkar King），在新加坡北部开辟连片甘蜜与胡椒种植园。1830 年与诸姓潮侨领袖共同创办「义安公司」——新加坡历史最悠久的潮州人社团与慈善机构，至今仍是粤海清庙、潮州八邑会馆的主体。他还涉足税收承包业务，被任命为殖民地立法会非官守议员（华人首位之一），被誉为「新加坡潮帮开山祖」。",
    source: "Seah Eu Chin Heritage Project；新加坡潮州八邑会馆",
  },
  {
    id: "zhang-bishi",
    name: "张弼士",
    nameEn: "Thio Tiauw Siat",
    yearBorn: 1841,
    yearDied: 1916,
    originId: "shantou",
    destinationId: "batavia",
    emigrateYear: 1859,
    title: "南洋首富",
    intro: "广东大埔（潮属客家）人，南洋华侨首富，国内创办张裕葡萄酒公司。",
    story:
      "张弼士 18 岁赴巴达维亚谋生，初为米店勤杂工。1866 年创办裕和垦植公司，逐步发展椰子、咖啡、橡胶种植，雇工近万人。全盛时资金达白银 8000 万两，成为南洋华侨首富。他愤于德国轮船歧视华人，与人筹办中国第一批侨办远洋航运。捐银 30 万两支持孙中山革命，国内创办张裕酿酒、粤汉铁路。晚年捐建岭南大学，兴办华文学校 8 所。",
    source: "广东省人民政府参事室；大埔县志",
  },
  {
    id: "chen-cihong",
    name: "陈慈黉",
    nameEn: "Tan Choo Hong",
    yearBorn: 1843,
    yearDied: 1921,
    originId: "shantou",
    destinationId: "bangkok",
    emigrateYear: 1871,
    title: "暹罗火砻王",
    intro: "汕头潮阳人，1871 年在曼谷创设「陈黉利行」，垄断暹罗大米贸易。",
    story:
      "陈慈黉少时即接管家业，1871 年赴曼谷设立陈黉利行，专营进出口贸易，主营暹罗大米。他在湄南河边开设多家「火砻」（碾米厂），人称「火砻王」。商号网络遍及汕头、香港、新加坡、西贡，「大座山」之名享誉东南亚。61 岁回乡后捐资修桥铺路，创办成德学校（粤东最早的侨办学校）。陈慈黉故居（澄海前美村）至今仍是潮汕侨乡建筑代表。",
    source: "潮商网；澄海陈慈黉故居",
  },
  {
    id: "zheng-zhiyong",
    name: "郑智勇",
    nameEn: "Tan Chee Yong (Erh Geh Hong)",
    yearBorn: 1851,
    yearDied: 1937,
    originId: "shantou",
    destinationId: "bangkok",
    emigrateYear: 1863,
    title: "洪门二哥丰 · 暹罗坤伯",
    intro: "潮安凤塘人，12 岁赴暹罗，从搬运工成为洪门「二哥丰」、暹罗大富翁。",
    story:
      "郑智勇 12 岁渡海，到曼谷栈行当搬运工。后加入洪门组织，因机智勇敢升至「二哥丰」。获暹罗政府授予「花会长」专营权后日进万金，业务遍及暹罗、香港、上海、厦门，涵盖航运、银庄、当押、报社。创办华侨报德善堂、培英中学，建华暹码头。暹罗皇帝加封为「坤伯」（伯爵），并以其名命名曼谷一条街道。",
    source: "潮安区志；百度百科·郑智勇",
  },
  {
    id: "lim-nee-soon",
    name: "林义顺",
    nameEn: "Lim Nee Soon",
    yearBorn: 1879,
    yearDied: 1936,
    originId: "zhanglin",
    destinationId: "singapore",
    emigrateYear: 1879,
    title: "新加坡橡胶/菠萝大王",
    intro: "祖籍澄海，生于新加坡，「橡胶大王」「菠萝大王」，孙中山革命同盟会南洋首批盟员。",
    story:
      "林义顺祖籍广东澄海，生于新加坡潮人家庭。1908 年任三巴旺橡胶公司首任总经理，1911 年创立林义顺公司，在新马大规模种植橡胶与菠萝，建菠萝罐头厂远销欧洲。1903 年参与营救《苏报》案邹容、章太炎，被誉为「南洋华侨同情革命之第一声」。1906 年成为新加坡同盟会首批会员，创办《图南日报》《中兴日报》宣传革命。两度出任新加坡中华总商会会长（1921-22、1925-26），是潮州八邑会馆主要创建者。1936 年病逝上海，南京政府为其国葬，葬于中山陵附近。今新加坡北部「义顺镇」（Yishun）即以其名命名。",
    source: "维基百科；新加坡国家档案馆 Roots.gov.sg",
  },
  {
    id: "ngee-kong-yam",
    name: "蚁光炎",
    nameEn: "Ngee Kong Yam",
    yearBorn: 1879,
    yearDied: 1939,
    originId: "shantou",
    destinationId: "bangkok",
    emigrateYear: 1896,
    title: "泰国侨领 · 抗日烈士",
    intro: "澄海南畔洲人，17 岁赴南洋，首位为抗日捐躯的海外侨领。",
    story:
      "蚁光炎 3 岁失怙，仅读 3 个月私塾即辍学。17 岁赴越南、柬埔寨做苦力，1902 年到暹罗投奔堂兄。从酱园杂工干起，1909 年合伙创办「六顺」内河船运公司，至 30 年代已拥船 50 余艘，业务横跨泰、越、柬三国的航运、碾米、虫胶、酿酒。1936 年当选泰国中华总商会主席、报德善堂董事长。1937 年抗战爆发后，他领导侨商抵制日货、认购救国公债、捐献滇缅公路卡车、向八路军新四军输送药品。1939 年 11 月 21 日晚，于曼谷耀华力路遭日本特务枪杀，弥留之际留下遗言：「我虽死，尔等免用痛心，中国必定胜利！」。国民政府为其颁发褒扬令，是首位为抗日捐躯的海外侨领。",
    source: "广东省人民政府侨务办；中国华侨历史博物馆",
  },
  {
    id: "chia-ek-chor",
    name: "谢易初",
    nameEn: "Chia Ek Chor",
    yearBorn: 1896,
    yearDied: 1983,
    originId: "shantou",
    destinationId: "bangkok",
    emigrateYear: 1919,
    title: "正大集团（卜蜂）创始人",
    intro: "澄海蓬中人，自幼喜植草菇人称「草菇佬」，1922 年在曼谷创办「正大庄」种子店，奠定今正大集团百年基业。",
    story:
      "谢易初出生于澄海贫苦农家，自幼酷爱园艺。1919 年 23 岁渡海赴泰国曼谷，1922 年 6 月在三聘街创办「正大庄」菜籽店——这就是今天遍布世界的正大集团（CP Group, 1953 年正式注册为 Charoen Pokphand「卜蜂」）的前身。他为正大庄设计的「方圆」商标，方代表「正大光明」原则，圆代表灵活创新。他给四个儿子取名「正民、大民、中民、国民」，寓意「正大中国之民」。其四子谢国民将正大集团带成横跨农业、零售、电讯、金融的跨国集团。谢易初本人于 1950 年回国，担任澄海农场技术员、副场长，捐建华侨医院与多项水利工程。",
    source: "中国侨网；国际潮团总会",
  },
  {
    id: "chin-sophonpanich",
    name: "陈弼臣",
    nameEn: "Chin Sophonpanich",
    yearBorn: 1910,
    yearDied: 1988,
    originId: "shantou",
    destinationId: "bangkok",
    emigrateYear: 1927,
    title: "盘谷银行创办人",
    intro: "潮阳人，1944 年集资 20 万美元创办盘谷银行，奠定泰华金融业基石。",
    story:
      "陈弼臣生于泰国，5 岁回潮阳读书，17 岁返泰从搬运、售货干起。1944 年与中泰商人集资 20 万美元，在曼谷三聘街创办盘谷银行（Bangkok Bank）。他奉行「用人勿疑」哲学，专为华商提供融资。1957 年沙立军变后移居香港遥控经营，使盘谷国际化。至 1983 年，盘谷银行已位列全球十二大商业银行；1984 年总资产 83 亿美元，占泰国金融市场逾 30%。盘谷银行是泰国最大的商业银行，也是东南亚最重要的潮商金融中枢。",
    source: "维基百科；盘谷银行年报",
  },
  {
    id: "liao-zhongkai",
    name: "廖仲恺",
    nameEn: "Liao Zhongkai",
    yearBorn: 1877,
    yearDied: 1925,
    originId: "shantou",
    destinationId: "singapore",
    emigrateYear: 1877,
    title: "民国先驱",
    intro: "祖籍潮属客家，生于美国旧金山华侨家庭，国民党左派领袖。",
    story:
      "廖仲恺虽生于旧金山，但祖籍广东惠阳客家，其家族与潮汕侨乡渊源深厚。他后来成为孙中山的左膀右臂，主持国共合作时期的国民政府财政，是 20 世纪初南洋华侨参与中国革命的代表人物之一。",
    source: "广东省侨办",
  },
];
