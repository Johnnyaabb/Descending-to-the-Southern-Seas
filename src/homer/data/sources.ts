export type SourceKind =
  | "primary"
  | "archaeology"
  | "geography"
  | "scholarship"
  | "art";

export interface HomerSource {
  id: string;
  title: string;
  organization: string;
  url: string;
  kind: SourceKind;
  note: string;
}

/**
 * Sources are kept as first-class data so every event, place and statistic can
 * expose its provenance in the UI. Modern copyrighted translations are not
 * reproduced; citations point to public-domain/open catalogues or institutions.
 */
export const HOMER_SOURCES: HomerSource[] = [
  {
    id: "perseus-iliad",
    title: "Iliad · canonical text catalogue",
    organization: "Perseus Digital Library · Tufts University",
    url: "https://catalog.perseus.org/catalog/urn:cts:greekLit:tlg0012.tlg001.perseus-grc2",
    kind: "primary",
    note: "《伊利亚特》希腊文开放文本、卷次与行号引用的基础来源。",
  },
  {
    id: "perseus-odyssey",
    title: "Odyssey · canonical text catalogue",
    organization: "Perseus Digital Library · Tufts University",
    url: "https://catalog.perseus.tufts.edu/catalog/urn:cts:greekLit:tlg0012.tlg002",
    kind: "primary",
    note: "《奥德赛》希腊文开放文本、卷次与行号引用的基础来源。",
  },
  {
    id: "chs-structure",
    title: "Homer and Greek Myth",
    organization: "Center for Hellenic Studies · Harvard University",
    url: "https://www-current.chs.harvard.edu/curated-article/gregory-nagy-homer-and-greek-myth/",
    kind: "scholarship",
    note: "两部史诗各二十四卷，以及四卷一组的表演单元研究。",
  },
  {
    id: "met-greek-art",
    title: "Greek Art: From Prehistoric to Classical",
    organization: "The Metropolitan Museum of Art",
    url: "https://www.metmuseum.org/-/media/files/learn/for-educators/publications-for-educators/greek.pdf",
    kind: "scholarship",
    note: "约公元前750年定型、十年战争与《伊利亚特》约五十日叙事范围等背景。",
  },
  {
    id: "unesco-troy",
    title: "Archaeological Site of Troy",
    organization: "UNESCO World Heritage Centre",
    url: "https://whc.unesco.org/en/list/849/",
    kind: "archaeology",
    note: "特洛伊遗址、青铜时代城市层位与爱琴海—安纳托利亚交流背景。",
  },
  {
    id: "british-museum-troy",
    title: "The search for the lost city of Troy",
    organization: "The British Museum",
    url: "https://www.britishmuseum.org/blog/search-lost-city-troy",
    kind: "archaeology",
    note: "考古发现可构成战争背景，但不足以证明荷马叙事按原样发生。",
  },
  {
    id: "unesco-mycenae",
    title: "Archaeological Sites of Mycenae and Tiryns",
    organization: "UNESCO World Heritage Centre",
    url: "https://whc.unesco.org/en/list/941/",
    kind: "archaeology",
    note: "迈锡尼文明、公元前1600—1100年宫殿体系及其与荷马传统的联系。",
  },
  {
    id: "pleiades",
    title: "Pleiades ancient places dataset",
    organization: "Institute for the Study of the Ancient World",
    url: "https://pleiades.stoa.org/downloads",
    kind: "geography",
    note: "真实古代地点名称、代表坐标与GeoJSON/JSON数据的核心来源。",
  },
  {
    id: "pleiades-nestor",
    title: "Nestor's Palace",
    organization: "Pleiades · ISAW / Ancient World Mapping Center",
    url: "https://pleiades.stoa.org/places/156116232",
    kind: "geography",
    note: "阿诺·恩格利亚诺宫殿遗址的代表坐标；地点与荷马传统的对应仍需和考古事实区分。",
  },
  {
    id: "hellenic-acheron",
    title: "Nekromanteion of Acheron",
    organization: "Hellenic Heritage · Greek Ministry of Culture",
    url: "https://www.hh.gr/en/destinations/necromanteion-of-acheron/",
    kind: "archaeology",
    note: "梅索波塔莫斯阿刻戎亡灵神谕所的传统定位，并记录该建筑亦可能是设防农庄的争议。",
  },
  {
    id: "odyssey-geography",
    title: "What Was Homer Honing in the Odyssey?",
    organization: "American Geophysical Union · Wiley",
    url: "https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2024CN000261",
    kind: "scholarship",
    note: "梳理奥德修斯航线的多种重建，并强调多数地点无法形成学术共识。",
  },
  {
    id: "cambridge-ships",
    title: "Numbers Up · Poetry and Number in Graeco-Roman Antiquity",
    organization: "Cambridge University Press",
    url: "https://www.cambridge.org/core/books/poetry-and-number-in-graecoroman-antiquity/numbers-up/5B8C3F5E4A6D85D17DDEE95A133C6AEB",
    kind: "scholarship",
    note: "船表的现代合计为1,186艘；该数字属于诗歌统计，不是考古人口普查。",
  },
  {
    id: "met-open-access",
    title: "The Met Collection API · Open Access",
    organization: "The Metropolitan Museum of Art",
    url: "https://metmuseum.github.io/",
    kind: "art",
    note: "公共领域希腊陶器、雕塑及高分辨率图像的后续素材来源。",
  },
];

export const SOURCE_BY_ID = new Map(HOMER_SOURCES.map((source) => [source.id, source]));
