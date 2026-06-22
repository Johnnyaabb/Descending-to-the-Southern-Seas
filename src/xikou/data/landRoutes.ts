/**
 * 走西口历史陆路走廊（WGS-84 示意折线，依方志、晋商行记与当代研究整理）。
 *
 * 主线分述（狭义「西口」= 杀虎口）：
 * 1. 杀虎口道：晋中/云中 → 朔州 → 右玉 → 杀虎口 → 和林格尔 → 归化城（呼和浩特）
 *    —— 《中华合作时报》等载：出杀虎口直北约六十公里至和林格尔，再北行五十余公里至归化城。
 * 2. 河曲西口渡道：河曲、保德、偏关 → 黄河古渡 → 后套（五原），多不经杀虎口。
 * 3. 张库东道：张家口（东口）→ 张北 → 察哈尔 → 平地泉（集宁），可北接库伦，与西口在归化城交汇。
 * 4. 包头道：杀虎口/和林 → 萨拉齐 → 包头（乔贵发入大盛魁驼队之路，见《太原道·再走西口》）。
 * 5. 陕北道：榆林 → 府谷 → 黄河渡口/河套东岸 → 包头或后套。
 *
 * 坐标取县城、关隘、古渡遗址附近，非现代高速公路轨迹。
 */
import type { LngLat } from "../../lib/arcGeometry";
import {
  HEQU_TOWN,
  HEQU_XIKOU_FERRY,
  SHAHUKOU_PASS,
  YOUWEI_TOWN,
  YOUYU_COUNTY_SEAT,
} from "./geoWaypoints";

/** 口内、关隘、渡口 */
const WP = {
  qixian: [112.333, 37.357] as LngLat,
  taiyuan: [112.549, 37.87] as LngLat,
  taigu: [112.577, 37.424] as LngLat,
  xinzhou: [112.734, 38.417] as LngLat,
  yuanping: [112.711, 38.731] as LngLat,
  yanmenPass: [112.959, 39.065] as LngLat,
  ningwuPass: [112.304, 38.728] as LngLat,
  shuozhou: [112.433, 39.331] as LngLat,
  youyuTown: YOUYU_COUNTY_SEAT,
  youweiFort: YOUWEI_TOWN,
  zuoyun: [112.703, 40.012] as LngLat,
  datong: [113.3, 40.076] as LngLat,
  pianguan: [111.508, 39.437] as LngLat,
  hequ: HEQU_TOWN,
  hequFerry: HEQU_XIKOU_FERRY,
  baode: [111.086, 38.524] as LngLat,
  fugu: [110.744, 39.028] as LngLat,
  yulin: [109.741, 38.29] as LngLat,
  zhangjiakou: [114.885, 40.811] as LngLat,
  zhangbei: [114.72, 41.152] as LngLat,
  shangdu: [113.57, 41.54] as LngLat,
  zhuozi: [112.577, 40.895] as LngLat,
  /** 杀虎口关城（OSM 杀虎口长城） */
  shahukou: SHAHUKOU_PASS,
  /** 口外 */
  helingeer: [111.821, 40.379] as LngLat,
  hohhotGuihua: [111.67, 40.818] as LngLat,
  salaqi: [110.527, 40.568] as LngLat,
  baotouDonghe: [110.04, 40.576] as LngLat,
  wuyuan: [108.27, 41.089] as LngLat,
  linhe: [107.417, 40.758] as LngLat,
  ordosDongsheng: [109.99, 39.817] as LngLat,
  jining: [113.114, 41.035] as LngLat,
  yingxian: [113.187, 39.559] as LngLat,
  sangganFord: [113.35, 39.85] as LngLat,
  wuhai: [106.825, 39.673] as LngLat,
  yinchuan: [106.23, 38.487] as LngLat,
};

function dedupe(points: LngLat[]): LngLat[] {
  const out: LngLat[] = [];
  for (const p of points) {
    const prev = out[out.length - 1];
    if (prev && Math.hypot(prev[0] - p[0], prev[1] - p[1]) < 0.008) continue;
    out.push(p);
  }
  return out;
}

/** 晋中祁县—太谷—太原—忻州—雁门关—朔州—右玉—杀虎口 */
function jinzhongToShahukou(fromCoord: LngLat, fromId: string): LngLat[] {
  const approachTail: LngLat[] = [WP.shuozhou, WP.youyuTown, WP.youweiFort, WP.shahukou];
  if (fromId === "qixian") {
    return [fromCoord, WP.qixian, WP.taigu, WP.taiyuan, WP.xinzhou, WP.yuanping, WP.yanmenPass, ...approachTail];
  }
  if (fromId === "taiyuan") {
    return [fromCoord, WP.xinzhou, WP.yuanping, WP.yanmenPass, ...approachTail];
  }
  if (fromId === "xinzhou") {
    return [fromCoord, WP.yuanping, WP.yanmenPass, ...approachTail];
  }
  return [fromCoord, WP.taiyuan, WP.xinzhou, WP.yuanping, WP.yanmenPass, ...approachTail];
}

/** 大同—左云—右玉—杀虎口 */
function datongToShahukou(fromCoord: LngLat): LngLat[] {
  return [fromCoord, WP.datong, WP.zuoyun, WP.youyuTown, WP.youweiFort, WP.shahukou];
}

/** 张家口东口—张北—商都—卓资—归化（与杀虎口道在呼市汇合） */
function zhangjiakouToHohhot(fromCoord: LngLat): LngLat[] {
  return [fromCoord, WP.zhangjiakou, WP.zhangbei, WP.shangdu, WP.zhuozi, WP.hohhotGuihua];
}

/** 张库大道东段：张家口—张北—集宁（平地泉） */
function zhangjiakouToJining(fromCoord: LngLat): LngLat[] {
  return [fromCoord, WP.zhangjiakou, WP.zhangbei, [114.25, 41.05], WP.jining];
}

/** 河曲西口古渡—黄河北岸西行—后套（五原），不经杀虎口 */
function hequToHetao(fromCoord: LngLat): LngLat[] {
  return [
    fromCoord,
    WP.hequ,
    WP.hequFerry,
    [111.05, 39.75],
    WP.pianguan,
    [110.55, 40.15],
    [109.85, 40.55],
    WP.wuyuan,
  ];
}

/** 陕北榆林—府谷—保德—渡河西进河套 */
function yulinToHetao(fromCoord: LngLat): LngLat[] {
  return [fromCoord, WP.yulin, WP.fugu, WP.baode, WP.hequFerry, [110.55, 40.15], WP.wuyuan];
}

/** 杀虎口—和林格尔—归化城（出关直北，不经右卫城南绕路） */
const SHAHUKOU_TO_HOHOT: LngLat[] = [WP.shahukou, WP.helingeer, WP.hohhotGuihua];

/** 杀虎口—和林—萨拉齐—包头（乔贵发路线） */
const SHAHUKOU_TO_BAOTOU: LngLat[] = [WP.shahukou, WP.helingeer, WP.salaqi, WP.baotouDonghe];

/** 杀虎口—土默川南缘—鄂尔多斯 */
const SHAHUKOU_TO_ORDOS: LngLat[] = [WP.shahukou, WP.helingeer, WP.salaqi, [110.35, 40.15], WP.ordosDongsheng];

/** 杀虎口—阴山北麓—后套（部分晋北灾民绕口北再西进） */
const SHAHUKOU_TO_WUYUAN: LngLat[] = [
  WP.shahukou,
  [111.9, 40.85],
  [110.8, 41.0],
  [109.6, 41.05],
  WP.wuyuan,
];

/** 杀虎口东翼—凉城方向—集宁（与东路衔接的草原通道） */
const SHAHUKOU_TO_JINING: LngLat[] = [WP.shahukou, [112.55, 40.55], [113.0, 40.85], WP.jining];

/** 河套—沿黄河西岸—乌海—银川 */
const HETAO_TO_YINCHUAN: LngLat[] = [WP.wuyuan, WP.linhe, WP.wuhai, WP.yinchuan];

/** 包头—黄河西岸—银川 */
const BAOTOU_TO_YINCHUAN: LngLat[] = [WP.baotouDonghe, [109.2, 40.35], WP.wuhai, WP.yinchuan];

/** 忻州—应县—桑干河—大同—左云—杀虎口（近代赴包头商路之一，见《太原道》杨黄金口述） */
function xinzhouToBaotouViaYingxian(fromCoord: LngLat): LngLat[] {
  return [
    fromCoord,
    WP.yingxian,
    WP.sangganFord,
    WP.datong,
    WP.zuoyun,
    WP.shahukou,
    WP.helingeer,
    WP.salaqi,
    WP.baotouDonghe,
  ];
}

function segmentToShahukou(fromId: string, fromCoord: LngLat): LngLat[] {
  switch (fromId) {
    case "datong":
      return datongToShahukou(fromCoord);
    case "zhangjiakou":
      return [fromCoord, WP.zhangjiakou, WP.zhangbei, WP.shangdu, WP.zhuozi, WP.shahukou];
    case "hequ":
      return [fromCoord, WP.pianguan, WP.shuozhou, WP.youyuTown, WP.youweiFort, WP.shahukou];
    case "yulin":
      return [fromCoord, WP.fugu, WP.baode, WP.hequ, WP.pianguan, WP.shuozhou, WP.youyuTown, WP.youweiFort, WP.shahukou];
    case "qixian":
    case "taiyuan":
    case "xinzhou":
      return jinzhongToShahukou(fromCoord, fromId);
    default:
      return jinzhongToShahukou(fromCoord, fromId);
  }
}

function segmentFromShahukou(toId: string, toCoord: LngLat): LngLat[] {
  switch (toId) {
    case "shahukou":
      return [WP.shahukou];
    case "hohhot":
      return [...SHAHUKOU_TO_HOHOT, toCoord];
    case "baotou":
      return [...SHAHUKOU_TO_BAOTOU, toCoord];
    case "ordos":
      return [...SHAHUKOU_TO_ORDOS, toCoord];
    case "wuyuan":
      return [...SHAHUKOU_TO_WUYUAN, toCoord];
    case "jining":
      return [...SHAHUKOU_TO_JINING, toCoord];
    case "yinchuan":
      return [...SHAHUKOU_TO_BAOTOU.slice(0, -1), ...BAOTOU_TO_YINCHUAN, toCoord];
    default:
      return [WP.shahukou, toCoord];
  }
}

function buildRoute(fromId: string, toId: string, fromCoord: LngLat, toCoord: LngLat): LngLat[] {
  // ── 河曲渡 → 后套（主流西口渡，不经杀虎口）──
  if (fromId === "hequ" && (toId === "wuyuan" || toId === "linhe")) {
    return dedupe([...hequToHetao(fromCoord), toCoord]);
  }
  if (fromId === "hequ" && toId === "ordos") {
    return dedupe([...hequToHetao(fromCoord).slice(0, -1), [110.2, 39.9], WP.ordosDongsheng, toCoord]);
  }
  if (fromId === "hequ" && toId === "yinchuan") {
    return dedupe([...hequToHetao(fromCoord), ...HETAO_TO_YINCHUAN.slice(1), toCoord]);
  }

  // ── 陕北 → 河套 / 包头 ──
  if (fromId === "yulin" && toId === "wuyuan") {
    return dedupe([...yulinToHetao(fromCoord), toCoord]);
  }
  if (fromId === "yulin" && toId === "baotou") {
    return dedupe([
      fromCoord,
      WP.yulin,
      WP.fugu,
      [110.2, 39.55],
      WP.salaqi,
      WP.baotouDonghe,
      toCoord,
    ]);
  }
  if (fromId === "yulin" && toId === "ordos") {
    return dedupe([fromCoord, WP.yulin, WP.fugu, [109.5, 39.2], WP.ordosDongsheng, toCoord]);
  }
  if (fromId === "yulin" && toId === "yinchuan") {
    return dedupe([fromCoord, WP.yulin, [109.2, 38.55], [107.5, 38.2], WP.yinchuan, toCoord]);
  }

  // ── 张库东道 ──
  if (fromId === "zhangjiakou" && toId === "jining") {
    return dedupe([...zhangjiakouToJining(fromCoord), toCoord]);
  }
  if (fromId === "zhangjiakou" && toId === "hohhot") {
    return dedupe([...zhangjiakouToHohhot(fromCoord), toCoord]);
  }

  // ── 忻州—应县—大同线赴包头（口述史路线）──
  if (fromId === "xinzhou" && toId === "baotou") {
    return dedupe([...xinzhouToBaotouViaYingxian(fromCoord), toCoord]);
  }
  if (fromId === "xinzhou" && toId === "wuyuan") {
    return dedupe([
      fromCoord,
      WP.pianguan,
      WP.hequ,
      WP.hequFerry,
      [110.55, 40.15],
      WP.wuyuan,
      toCoord,
    ]);
  }

  // ── 晋中经杀虎口 ──
  const usesShahukou =
    toId === "shahukou" ||
    toId === "hohhot" ||
    toId === "baotou" ||
    toId === "ordos" ||
    toId === "wuyuan" ||
    toId === "jining" ||
    toId === "yinchuan" ||
    fromId === "datong" ||
    fromId === "qixian" ||
    fromId === "taiyuan" ||
    (fromId === "xinzhou" && toId !== "wuyuan");

  if (usesShahukou) {
    const toPass = segmentToShahukou(fromId, fromCoord);
    if (toId === "shahukou") {
      return dedupe([...toPass.slice(0, -1), toCoord]);
    }
    const passIdx = toPass.findIndex(
      (p) => Math.hypot(p[0] - WP.shahukou[0], p[1] - WP.shahukou[1]) < 0.05,
    );
    const approach = passIdx >= 0 ? toPass.slice(0, passIdx + 1) : toPass;
    const tail = segmentFromShahukou(toId, toCoord);
    const merged = [...approach, ...tail.slice(1)];
    return dedupe(merged);
  }

  // 河套内部西延
  if (toId === "yinchuan" && (fromId === "taiyuan" || fromId === "qixian")) {
    const toPass = segmentToShahukou(fromId, fromCoord);
    return dedupe([
      ...toPass,
      ...SHAHUKOU_TO_WUYUAN.slice(1),
      ...HETAO_TO_YINCHUAN.slice(1),
      toCoord,
    ]);
  }

  return dedupe([fromCoord, toCoord]);
}

/**
 * 返回历史走廊折线：起点、终点坐标 + 港口 id，用于 Catmull-Rom 平滑。
 */
export function landRouteWaypoints(
  fromCoord: LngLat,
  toCoord: LngLat,
  fromId: string,
  toId: string,
): LngLat[] {
  const route = buildRoute(fromId, toId, fromCoord, toCoord);
  if (route.length >= 2) return route;
  return [fromCoord, toCoord];
}
