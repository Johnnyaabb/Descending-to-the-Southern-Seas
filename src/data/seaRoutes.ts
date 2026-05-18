/**
 * 潮汕红头船下南洋的真实历史航线 (1684–1949)
 *
 * 红头船依靠季风（10 月–翌年 3 月 NE 季风南下；5–9 月 SW 季风北归）
 * 沿海岸线导航，途经一系列已知的海上节点。航线参考：
 * - 陈伦炯《海国闻见录》(1730)
 * - 《粤海关志》《汕头海关志》
 * - 张燮《东西洋考》(1617)
 * - 朱杰勤《中外关系史论文集》
 * - Anthony Reid, "Southeast Asia in the Age of Commerce"
 *
 * 主要海上节点（坐标为大致海道经过点，非陆地）：
 *
 *   南澳岛 → 粤东沿海 → 海南东岸 → 越南中部 (占婆) → 越南南部 (昆仑岛)
 *     ├── 绕金瓯角入暹罗湾 → 曼谷 / 北大年
 *     ├── 沿越南河道入西贡-堤岸；上溯湄公河至金边
 *     ├── 沿「内沟」(西沙石塘以西、纳土纳以西) → 阿南巴斯 → 新加坡海峡 → 新加坡 / 新山
 *     ├── 续经马六甲海峡 → 马六甲 / 槟城 / 苏门答腊 (棉兰)
 *     └── 经邦加海峡入爪哇海 → 巴达维亚
 *
 * 注：西沙群岛 (「万里石塘」) 历来是潮汕红头船刻意避开的暗礁禁区，
 *     《海国闻见录》《东西洋考》皆有明确记载，故航线不经其上。
 */

import type { LngLat } from "../lib/arcGeometry";

// 关键海上节点（lng, lat）—— 用于绘制真实航线
const WP = {
  // 出潮汕：南澳岛南口
  nanao:        [117.20, 22.95] as LngLat,
  // 粤东外海（揭阳-汕尾以南）
  yuedong:      [115.30, 22.10] as LngLat,
  // 香港-万山外海
  wanshan:      [114.10, 21.30] as LngLat,
  // 海南岛东岸（文昌外海）
  hainanE:      [111.50, 18.80] as LngLat,
  // 海南岛东南角（万宁外海）
  hainanSE:     [110.30, 16.50] as LngLat,
  // 越南占婆海岸（中越）
  champa:       [109.40, 14.50] as LngLat,
  // 越南归仁外海
  quynhon:      [109.50, 12.80] as LngLat,
  // 越南潘郎/芽庄外海
  nhatrang:     [109.40, 11.50] as LngLat,
  // 越南潘切外海
  phanthiet:    [108.30, 10.40] as LngLat,
  // 越南头顿外海（湄公河三角洲东缘）
  vungtau:      [107.20,  9.80] as LngLat,
  // 西贡河口（堤岸入口）
  saigonMouth:  [106.90, 10.10] as LngLat,
  // 湄公河上溯（金边以南）
  mekongUp:     [105.30, 11.10] as LngLat,
  // 昆仑岛（Côn Sơn）—— 南海航线关键中转
  conson:       [106.60,  8.60] as LngLat,
  // 昆仑岛与纳土纳群岛之间的「内沟」中段（纳土纳主岛 ~108°E 之西侧）
  innerSouth:   [106.00,  5.00] as LngLat,
  // 金瓯角外海
  camau:        [104.70,  8.40] as LngLat,
  // 暹罗湾南口
  gulfThaiS:    [102.40,  8.80] as LngLat,
  // 暹罗湾中部
  gulfThaiC:    [101.10, 11.50] as LngLat,
  // 曼谷湾入口（湄南河口）
  bangkokApp:   [100.55, 13.20] as LngLat,
  // 北大年外海
  pattaniApp:   [101.40,  6.95] as LngLat,
  // 阿南巴斯群岛
  anambas:      [105.60,  3.10] as LngLat,
  // 新加坡海峡东口（民丹岛北）
  bintan:       [104.50,  1.50] as LngLat,
  // 新加坡海峡西口（沙巴海峡）
  sporeW:       [103.50,  1.18] as LngLat,
  // 林加群岛
  linga:        [104.50,  0.10] as LngLat,
  // 邦加海峡北口
  bangkaN:      [105.70, -2.10] as LngLat,
  // 爪哇海北部
  javaSeaN:     [106.40, -5.20] as LngLat,
  // 马六甲海峡南口（一名岛/丹绒柏椒）
  malaccaS:     [102.30,  2.50] as LngLat,
  // 马六甲海峡中
  malaccaM:     [101.30,  3.60] as LngLat,
  // 马六甲海峡北（槟城外海）
  malaccaN:     [100.10,  5.20] as LngLat,
  // 苏门答腊东岸（亚齐外海）
  sumatraE:     [99.20,   3.70] as LngLat,
};

// 由 destination 标识到航线途经点的映射（不含起点、终点）。
// 顺序对应实际海上航向。
const ROUTE_TO_DESTINATION: Record<string, LngLat[]> = {
  // 曼谷（暹罗）：经海南东、越南海岸、绕金瓯角入暹罗湾北上
  bangkok: [
    WP.nanao, WP.yuedong, WP.wanshan, WP.hainanE, WP.hainanSE,
    WP.champa, WP.quynhon, WP.nhatrang, WP.phanthiet, WP.vungtau,
    WP.conson, WP.camau, WP.gulfThaiS, WP.gulfThaiC, WP.bangkokApp,
  ],
  // 北大年（暹罗南部）：暹罗湾南部
  pattani: [
    WP.nanao, WP.yuedong, WP.hainanE, WP.hainanSE,
    WP.champa, WP.quynhon, WP.nhatrang, WP.phanthiet,
    WP.conson, WP.camau, WP.gulfThaiS, WP.pattaniApp,
  ],
  // 新加坡：南海西行，经昆仑、内沟、阿南巴斯进入新加坡海峡
  singapore: [
    WP.nanao, WP.yuedong, WP.wanshan, WP.hainanE, WP.hainanSE,
    WP.champa, WP.quynhon, WP.nhatrang, WP.phanthiet,
    WP.conson, WP.innerSouth, WP.anambas, WP.bintan,
  ],
  // 新山（紧邻新加坡北岸，柔佛海峡）
  johorbahru: [
    WP.nanao, WP.yuedong, WP.hainanE, WP.hainanSE,
    WP.champa, WP.quynhon, WP.nhatrang, WP.phanthiet,
    WP.conson, WP.innerSouth, WP.anambas, WP.bintan,
  ],
  // 槟城：续入马六甲海峡北上
  penang: [
    WP.nanao, WP.yuedong, WP.hainanE, WP.hainanSE,
    WP.champa, WP.quynhon, WP.nhatrang, WP.phanthiet,
    WP.conson, WP.innerSouth, WP.anambas, WP.sporeW,
    WP.malaccaS, WP.malaccaM, WP.malaccaN,
  ],
  // 马六甲：马六甲海峡中段
  malacca: [
    WP.nanao, WP.yuedong, WP.hainanE, WP.hainanSE,
    WP.champa, WP.quynhon, WP.nhatrang, WP.phanthiet,
    WP.conson, WP.innerSouth, WP.anambas, WP.sporeW, WP.malaccaS,
  ],
  // 西贡-堤岸：沿越南海岸南下入西贡河口
  saigon: [
    WP.nanao, WP.yuedong, WP.wanshan, WP.hainanE, WP.hainanSE,
    WP.champa, WP.quynhon, WP.nhatrang,
    WP.phanthiet, WP.vungtau, WP.saigonMouth,
  ],
  // 金边：经西贡入湄公河上溯
  phnompenh: [
    WP.nanao, WP.yuedong, WP.hainanE, WP.hainanSE,
    WP.champa, WP.quynhon, WP.nhatrang, WP.phanthiet,
    WP.vungtau, WP.saigonMouth, WP.mekongUp,
  ],
  // 巴达维亚（雅加达）：经内沟、林加、邦加海峡入爪哇海
  batavia: [
    WP.nanao, WP.yuedong, WP.hainanE, WP.hainanSE,
    WP.champa, WP.quynhon, WP.nhatrang, WP.phanthiet,
    WP.conson, WP.innerSouth, WP.anambas,
    WP.linga, WP.bangkaN, WP.javaSeaN,
  ],
  // 棉兰（苏门答腊东北）：经新加坡海峡西、马六甲南部入苏门答腊东岸
  medan: [
    WP.nanao, WP.yuedong, WP.hainanE, WP.hainanSE,
    WP.champa, WP.quynhon, WP.nhatrang, WP.phanthiet,
    WP.conson, WP.innerSouth, WP.anambas,
    WP.sporeW, WP.malaccaS, WP.sumatraE,
  ],
};

/**
 * 返回一条从 fromCoord 到 toCoord 的真实历史航线坐标序列。
 * 第一个点是出发港，最后是目的港，中间是历史海道节点。
 */
export function seaRouteWaypoints(
  fromCoord: LngLat,
  toCoord: LngLat,
  toId: string,
): LngLat[] {
  const middle = ROUTE_TO_DESTINATION[toId];
  if (!middle) return [fromCoord, toCoord];
  return [fromCoord, ...middle, toCoord];
}
