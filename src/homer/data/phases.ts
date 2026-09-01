import type { EpicId, HomerPhase } from "./types";

export const HOMER_PHASES: HomerPhase[] = [
  {
    id: "iliad-1-4",
    epic: "iliad",
    bookStart: 1,
    bookEnd: 4,
    title: "愤怒与盟约",
    subtitle: "瘟疫、决裂与短暂休战",
    color: "#c96f48",
    narrative:
      "故事从战争第十年切入。阿波罗的瘟疫迫使阿伽门农归还克律塞伊斯，他却夺走阿喀琉斯的布里塞伊斯作为补偿。阿喀琉斯退出战斗，忒提斯请求宙斯让希腊人遭受挫败。诗歌随后展开希腊联军的地域名录，并以帕里斯与墨涅拉俄斯的决斗制造和平将至的错觉；盟约最终被打破，战争再次启动。",
    highlights: ["阿喀琉斯的愤怒成为全诗发动机", "第2卷船表展开爱琴海政治地理", "神、人两个层面的盟约同时失效"],
    sourceIds: ["perseus-iliad", "chs-structure"],
  },
  {
    id: "iliad-5-8",
    epic: "iliad",
    bookStart: 5,
    bookEnd: 8,
    title: "英雄与城邦",
    subtitle: "狄俄墨得斯逞威 · 赫克托耳返城",
    color: "#d89a52",
    narrative:
      "阿喀琉斯缺席后，狄俄墨得斯成为战场中心，甚至在雅典娜帮助下伤及阿佛洛狄忒和阿瑞斯。视角随赫克托耳进入特洛伊城：母亲、海伦、帕里斯与安德洛玛刻让战争第一次显露家庭代价。赫克托耳与大埃阿斯的决斗未分胜负，随后宙斯禁止诸神干预，战局向特洛伊人倾斜。",
    highlights: ["狄俄墨得斯的英勇时刻", "赫克托耳与安德洛玛刻诀别", "战场与家庭空间并置"],
    sourceIds: ["perseus-iliad"],
  },
  {
    id: "iliad-9-12",
    epic: "iliad",
    bookStart: 9,
    bookEnd: 12,
    title: "希腊人的危局",
    subtitle: "劝归失败 · 城垒被破",
    color: "#b85a3d",
    narrative:
      "希腊联军被压回海边。阿伽门农派奥德修斯、福尼克斯和大埃阿斯向阿喀琉斯许诺厚礼，但阿喀琉斯拒绝以物质补偿被践踏的荣誉。夜袭、负伤与反复溃退之后，赫克托耳以巨石击破希腊营垒大门，特洛伊人逼近船阵。",
    highlights: ["第9卷使团与阿喀琉斯的选择", "奥德修斯、狄俄墨得斯夜袭", "赫克托耳攻破希腊壁垒"],
    sourceIds: ["perseus-iliad"],
  },
  {
    id: "iliad-13-16",
    epic: "iliad",
    bookStart: 13,
    bookEnd: 16,
    title: "船阵与代价",
    subtitle: "诸神角力 · 帕特洛克罗斯之死",
    color: "#9f4737",
    narrative:
      "波塞冬暗中援助希腊人，赫拉又以计策分散宙斯注意；但宙斯重新掌控战局后，赫克托耳率军纵火攻船。帕特洛克罗斯借用阿喀琉斯铠甲率密耳弥冬人出战，挽救船阵却越过了返回界限。他杀死萨耳佩冬，最终被阿波罗、欧福耳玻斯和赫克托耳接连击倒。",
    highlights: ["海神与天后暂时改变战局", "帕特洛克罗斯穿上阿喀琉斯铠甲", "越界追击导致悲剧"],
    sourceIds: ["perseus-iliad"],
  },
  {
    id: "iliad-17-20",
    epic: "iliad",
    bookStart: 17,
    bookEnd: 20,
    title: "重铸与归战",
    subtitle: "争夺遗体 · 新盾与和解",
    color: "#d4aa63",
    narrative:
      "双方围绕帕特洛克罗斯遗体展开拉锯。得知挚友死讯的阿喀琉斯放下与阿伽门农的争执，忒提斯请赫淮斯托斯为他打造新铠甲。著名的阿喀琉斯之盾把战争之外的城市、农耕、婚礼、审判与星空纳入一件兵器。阿喀琉斯重返战场，人与神的冲突同时升级。",
    highlights: ["帕特洛克罗斯遗体争夺", "阿喀琉斯之盾呈现完整宇宙", "阿喀琉斯与阿伽门农和解"],
    sourceIds: ["perseus-iliad"],
  },
  {
    id: "iliad-21-24",
    epic: "iliad",
    bookStart: 21,
    bookEnd: 24,
    title: "暴怒与和解",
    subtitle: "河神、赫克托耳与普里阿摩斯",
    color: "#7f3730",
    narrative:
      "阿喀琉斯的杀戮使斯卡曼德河为尸体堵塞，河神几乎将他吞没。他随后在城外杀死赫克托耳并侮辱其遗体。帕特洛克罗斯的葬礼竞技结束后，年迈的普里阿摩斯在赫尔墨斯引导下进入敌营，亲吻杀子者的双手。共同的悲恸暂时压倒敌我，全诗在赫克托耳葬礼而非特洛伊陷落中结束。",
    highlights: ["阿喀琉斯与斯卡曼德河冲突", "赫克托耳之死", "普里阿摩斯赎回遗体"],
    sourceIds: ["perseus-iliad", "met-greek-art"],
  },
  {
    id: "odyssey-1-4",
    epic: "odyssey",
    bookStart: 1,
    bookEnd: 4,
    title: "寻父之旅",
    subtitle: "伊塔卡失序 · 忒勒马科斯出发",
    color: "#4da7a1",
    narrative:
      "奥德修斯离家二十年，求婚者长期侵占其宫室和财产。雅典娜化身门忒斯与门托耳，促使忒勒马科斯公开质问求婚者，并前往皮洛斯、斯巴达寻找父亲消息。涅斯托耳与墨涅拉俄斯的归乡故事构成奥德修斯命运的镜面。",
    highlights: ["雅典娜推动青年踏出宫门", "伊塔卡的待客秩序被反转", "皮洛斯—斯巴达寻访支线"],
    sourceIds: ["perseus-odyssey", "chs-structure"],
  },
  {
    id: "odyssey-5-8",
    epic: "odyssey",
    bookStart: 5,
    bookEnd: 8,
    title: "离岛与重获身份",
    subtitle: "卡吕普索放行 · 费埃克人迎客",
    color: "#56b6c2",
    narrative:
      "众神决定结束奥德修斯在卡吕普索岛的七年滞留。波塞冬击碎木筏后，他游至斯刻里亚，受到瑙西卡和费埃克人接纳。在宴会、竞技与歌者德摩多科斯的特洛伊之歌中，奥德修斯终于流泪并说出自己的名字，为接下来的倒叙航程打开叙事之门。",
    highlights: ["卡吕普索与永生诱惑", "瑙西卡在海岸救援", "歌者令匿名英雄承认身份"],
    sourceIds: ["perseus-odyssey"],
  },
  {
    id: "odyssey-9-12",
    epic: "odyssey",
    bookStart: 9,
    bookEnd: 12,
    title: "海上奇航",
    subtitle: "十二艘船到一人独还",
    color: "#2d8ca8",
    narrative:
      "奥德修斯向费埃克人回述离开特洛伊后的航程：基科涅斯、食莲人、波吕斐摩斯、风神、莱斯特律戈涅斯、喀耳刻、冥界、塞壬、斯库拉与卡律布狄斯，以及太阳神牛岛。路线在文本中具有明确的先后关系，却通常没有可验证坐标；它更像一张关于边界、欲望和判断失误的神话海图。",
    highlights: ["“无人”之计与波塞冬的愤怒", "莱斯特律戈涅斯摧毁十一艘船", "食用神牛后全体船员覆亡"],
    sourceIds: ["perseus-odyssey", "odyssey-geography"],
  },
  {
    id: "odyssey-13-16",
    epic: "odyssey",
    bookStart: 13,
    bookEnd: 16,
    title: "返乡与伪装",
    subtitle: "伊塔卡登陆 · 父子相认",
    color: "#318b78",
    narrative:
      "费埃克人把沉睡的奥德修斯送回伊塔卡。雅典娜用迷雾遮蔽故土，又将英雄变成衰老乞丐。奥德修斯在忠诚猪倌欧迈俄斯的小屋试探局势；忒勒马科斯归来后，父子相认并共同制定进入宫殿的计划。",
    highlights: ["故乡因迷雾而变得陌生", "乞丐身份成为侦察工具", "父子在欧迈俄斯小屋重逢"],
    sourceIds: ["perseus-odyssey"],
  },
  {
    id: "odyssey-17-20",
    epic: "odyssey",
    bookStart: 17,
    bookEnd: 20,
    title: "宫殿中的试探",
    subtitle: "忍耐侮辱 · 身份逐层显露",
    color: "#497f72",
    narrative:
      "伪装的奥德修斯进入自己的宫殿，观察忠诚与背叛。老犬阿尔戈斯认出主人后死去，乳母欧律克勒娅则凭腿上的伤疤识破身份。佩涅洛佩与陌生乞丐谈论梦、婚姻和失踪的丈夫；奥德修斯必须在愤怒与计划之间保持克制。",
    highlights: ["阿尔戈斯最后一次认主", "伤疤成为身体记忆", "佩涅洛佩以语言试探陌生人"],
    sourceIds: ["perseus-odyssey"],
  },
  {
    id: "odyssey-21-24",
    epic: "odyssey",
    bookStart: 21,
    bookEnd: 24,
    title: "弓、床与和平",
    subtitle: "复仇完成 · 家庭秩序复位",
    color: "#24645f",
    narrative:
      "佩涅洛佩提出弯弓穿斧孔的竞赛，只有乞丐能够拉开奥德修斯之弓。身份揭晓后，奥德修斯、忒勒马科斯与忠仆杀死求婚者。佩涅洛佩用不可移动的婚床进行最后验证；英雄又与父亲拉厄耳忒斯相认。求婚者亲属准备复仇，雅典娜最终迫使双方停战。",
    highlights: ["弓箭竞赛与身份揭晓", "婚床秘密确认夫妻关系", "雅典娜终止复仇循环"],
    sourceIds: ["perseus-odyssey"],
  },
];

export function phasesForEpic(epic: EpicId): HomerPhase[] {
  return HOMER_PHASES.filter((phase) => phase.epic === epic);
}

export function phaseForBook(epic: EpicId, book: number): HomerPhase {
  return (
    HOMER_PHASES.find(
      (phase) => phase.epic === epic && book >= phase.bookStart && book <= phase.bookEnd,
    ) ?? phasesForEpic(epic)[0]
  );
}

