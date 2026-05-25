/**
 * 闯关东迁徙路线示意节点（WGS-84）。
 *
 * 陆路主线（辽西走廊）：
 *   济南/天津 → 唐山 → 秦皇岛 → 山海关 → 锦州 → 沈阳 → [四平 → 长春 → 哈尔滨 → 齐齐哈尔]
 *
 * 海路主线（渤海海峡 / 辽东湾）：
 *   烟台/威海 → 渤海海峡中段 → 大连 / 辽东湾北岸 → 营口
 *   烟台/威海 → 辽东半岛东岸 → 安东（丹东）
 *
 * 参考：国家民委《闯关东》专题；京奉铁路、中东铁路走向；《近代东北移民史》
 */

import type { LngLat } from "../../lib/arcGeometry";

/** 华北—关内段（津浦/京奉南下汇入） */
const WP = {
  cangzhou: [116.839, 38.304] as LngLat, // 沧州，济南—天津—唐山走廊
  tangshan: [118.18, 39.63] as LngLat,
  qinhuangdao: [119.587, 39.942] as LngLat, // 秦皇岛/关外前站
  shanhaiguan: [119.7542, 40.0114] as LngLat,
  /** 辽西走廊咽喉 */
  jinzhou: [121.128, 41.095] as LngLat,
  liaoyang: [123.172, 41.269] as LngLat, // 沈阳前辽阳平原
  siping: [124.351, 43.171] as LngLat,
  songyuan: [124.825, 45.136] as LngLat, // 松原，长春—哈尔滨之间
  /** 渤海海路 */
  bohaiStraitMid: [120.95, 38.42] as LngLat, // 烟台—大连海峡中段
  liaodongWest: [121.15, 39.55] as LngLat, // 辽东湾西岸外海
  liaodongEast: [122.85, 39.75] as LngLat, // 辽东半岛东岸外海（赴安东）
  yingkouApproach: [121.85, 40.35] as LngLat, // 辽河口外海
} as const;

const SEA_ORIGINS = new Set(["yantai", "weihai"]);

function isBohaiSea(fromId: string): boolean {
  return SEA_ORIGINS.has(fromId);
}

/** 出山海关后、按目的地选择的北向走廊节点（不含起终点） */
function corridorAfterPass(toId: string): LngLat[] {
  switch (toId) {
    case "shenyang":
      return [WP.jinzhou, WP.liaoyang];
    case "dalian":
      // 陆路极少直达；海路单独处理。若从山海关陆行至大连需绕锦州—沈阳—南折，此处简化为登陆后节点
      return [WP.jinzhou];
    case "yingkou":
      return [WP.jinzhou];
    case "dandong":
      return [WP.jinzhou, WP.liaoyang];
    case "changchun":
      return [WP.jinzhou, WP.liaoyang, WP.siping];
    case "harbin":
      return [WP.jinzhou, WP.liaoyang, WP.siping, WP.songyuan];
    case "qiqihar":
      return [WP.jinzhou, WP.liaoyang, WP.siping, WP.songyuan, [126.097, 47.339] as LngLat];
    default:
      return [WP.jinzhou, WP.liaoyang];
  }
}

/** 济南 / 天津出发：先汇入华北铁路走廊，再出山海关 */
function inlandApproach(fromId: string): LngLat[] {
  if (fromId === "jinan") {
    return [WP.cangzhou, WP.tangshan, WP.qinhuangdao, WP.shanhaiguan];
  }
  if (fromId === "tianjin") {
    return [WP.tangshan, WP.qinhuangdao, WP.shanhaiguan];
  }
  return [WP.shanhaiguan];
}

/** 胶东海路：按目的地选择海峡/湾口节点 */
function seaMiddle(fromId: string, toId: string): LngLat[] {
  if (toId === "dalian") {
    return [WP.bohaiStraitMid];
  }
  if (toId === "yingkou") {
    return [WP.liaodongWest, WP.yingkouApproach];
  }
  if (toId === "dandong") {
    return [WP.liaodongEast];
  }
  // 其他目的地：先登陆大连再转陆路（常见换乘模式）
  return [WP.bohaiStraitMid];
}

/**
 * 返回从出发地到目的地的迁徙路径途经点序列 [起点, …中间节点, 终点]。
 */
export function migrationRouteWaypoints(
  fromCoord: LngLat,
  toCoord: LngLat,
  fromId: string,
  toId: string,
): LngLat[] {
  // ── 海路：烟台 / 威海 → 辽东口岸（大连 / 营口 / 安东） ──
  if (isBohaiSea(fromId)) {
    return [fromCoord, ...seaMiddle(fromId, toId), toCoord];
  }

  // ── 陆路：山海关出发 ──
  if (fromId === "shanhaiguan") {
    return [fromCoord, ...corridorAfterPass(toId), toCoord];
  }

  // ── 陆路：济南 / 天津 → 出山海关 → 辽西走廊 ──
  const approach = inlandApproach(fromId);
  const north = corridorAfterPass(toId);
  // 避免 shanhaiguan 与 corridor 首段重复
  const northTrimmed =
    north.length > 0 && approach[approach.length - 1][0] === north[0][0]
      ? north.slice(1)
      : north;
  return [fromCoord, ...approach, ...northTrimmed, toCoord];
}
