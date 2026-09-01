import type { ContextMilestone } from "./types";

export const CONTEXT_MILESTONES: ContextMilestone[] = [
  {
    id: "mycenaean-age",
    dateLabel: "约前1600—1100年",
    title: "迈锡尼文明",
    description: "宫殿、线形文字B和跨爱琴海网络构成后世英雄时代想象的重要历史背景。",
    sourceIds: ["unesco-mycenae"],
  },
  {
    id: "late-bronze-troy",
    dateLabel: "约前1400—1180年",
    title: "特洛伊晚期青铜时代",
    description: "考古显示特洛伊与爱琴海、安纳托利亚之间存在接触和冲突环境，但不能证明单一“特洛伊战争”。",
    sourceIds: ["unesco-troy", "british-museum-troy"],
  },
  {
    id: "homeric-form",
    dateLabel: "约前750年",
    title: "史诗以现存形态逐渐定型",
    description: "诗歌源于口头表演传统；作品的语言、社会制度与青铜时代遗存不是同一时间切片。",
    sourceIds: ["met-greek-art", "chs-structure"],
  },
  {
    id: "schliemann",
    dateLabel: "1870年起",
    title: "希萨利克系统发掘",
    description: "施里曼的发掘使特洛伊成为公众考古焦点，也带来层位误判和破坏等方法史问题。",
    sourceIds: ["unesco-troy", "british-museum-troy"],
  },
  {
    id: "unesco",
    dateLabel: "1998年",
    title: "特洛伊列入世界遗产",
    description: "遗址因四千年聚落史以及对文学艺术的深远影响被列入世界遗产名录。",
    sourceIds: ["unesco-troy"],
  },
];

