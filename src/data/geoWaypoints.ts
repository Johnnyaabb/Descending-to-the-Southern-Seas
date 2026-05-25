/**
 * 走西口相关地标 WGS-84 坐标（EPSG:4326）。
 * 杀虎口、右卫、右玉等经 OpenStreetMap Nominatim 核对；其余关隘/商埠取县城或遗址近似点。
 */
export type GeoCoord = [number, number];

/** 狭义「西口」：杀虎口长城关城（OSM node 杀虎口长城，右玉县右卫镇） */
export const SHAHUKOU_PASS: GeoCoord = [112.3063, 40.2464];

/** 杀虎口村聚落中心（OSM Shahukou village） */
export const SHAHUKOU_VILLAGE: GeoCoord = [112.3089, 40.2413];

/** 清代右卫城/右卫镇（杀虎口南约 10km，朔平府驻地） */
export const YOUWEI_TOWN: GeoCoord = [112.3444, 40.1613];

/** 右玉县城（新城镇） */
export const YOUYU_COUNTY_SEAT: GeoCoord = [112.4611, 39.9878];

/** 广义西口之一：河曲县城黄河古渡（西口古渡，河曲县临黄河） */
export const HEQU_XIKOU_FERRY: GeoCoord = [111.183, 39.352];

/** 河曲县政府片区（县城中心，OSM Hequ County） */
export const HEQU_TOWN: GeoCoord = [111.1461, 39.3793];
