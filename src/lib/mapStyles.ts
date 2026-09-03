/**
 * Map style registry.
 *
 * Each entry can either reference a hosted MapLibre/Mapbox vector style URL,
 * or provide an inline raster `StyleSpecification` so we can include providers
 * that don't ship a vector style (satellite, ocean base, etc.).
 *
 * All entries are usable without any API key.
 */
import type { StyleSpecification } from "maplibre-gl";

export type MapStyleSpec = string | StyleSpecification;

export interface MapStyleOption {
  id: string;
  label: string;
  /** One-line description shown on hover in the switcher. */
  tagline: string;
  /** Swatch dot color used in the style switcher dropdown. */
  swatch: string;
  /** Whether the basemap is dark, so UI can adapt. */
  tone: "light" | "dark" | "sepia" | "blue";
  /** The actual style URL or inline spec. */
  style: MapStyleSpec;
}

const ATTR_OSM = "© OpenStreetMap contributors";
const ATTR_ESRI =
  "Tiles © Esri — Source: Esri, USGS, NOAA, GEBCO, DeLorme, NAVTEQ, etc.";
const ATTR_CARTO =
  '© <a href="https://carto.com/attributions">CARTO</a>, ' + ATTR_OSM;

function rasterStyle(opts: {
  tiles: string[];
  attribution: string;
  background: string;
  maxzoom?: number;
  opacity?: number;
  /** Optional cartographic reference layer rendered above the imagery. */
  referenceTiles?: string[];
  referenceAttribution?: string;
  referenceMaxzoom?: number;
  referenceOpacity?: number;
}): StyleSpecification {
  return {
    version: 8,
    glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
    sources: {
      base: {
        type: "raster",
        tiles: opts.tiles,
        tileSize: 256,
        attribution: opts.attribution,
        maxzoom: opts.maxzoom ?? 19,
      },
      ...(opts.referenceTiles
        ? {
            reference: {
              type: "raster" as const,
              tiles: opts.referenceTiles,
              tileSize: 256,
              attribution: opts.referenceAttribution,
              maxzoom: opts.referenceMaxzoom ?? opts.maxzoom ?? 19,
            },
          }
        : {}),
    },
    layers: [
      {
        id: "bg",
        type: "background",
        paint: { "background-color": opts.background },
      },
      {
        id: "base",
        type: "raster",
        source: "base",
        paint: { "raster-opacity": opts.opacity ?? 1 },
      },
      ...(opts.referenceTiles
        ? [
            {
              id: "reference",
              type: "raster" as const,
              source: "reference",
              paint: { "raster-opacity": opts.referenceOpacity ?? 0.72 },
            },
          ]
        : []),
    ],
  } as StyleSpecification;
}

export const MAP_STYLES: MapStyleOption[] = [
  {
    id: "positron",
    label: "素白纸卷",
    tagline: "OpenFreeMap Positron · 极简浅色",
    swatch: "#e8e3d4",
    tone: "light",
    style: "https://tiles.openfreemap.org/styles/positron",
  },
  {
    id: "natgeo",
    label: "古图卷",
    tagline: "Esri National Geographic · 仿古地理志",
    swatch: "#c8a951",
    tone: "sepia",
    style: rasterStyle({
      tiles: [
        "https://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",
      ],
      attribution: ATTR_ESRI,
      background: "#e8dcc3",
      maxzoom: 16,
    }),
  },
  {
    id: "ocean",
    label: "航海图",
    tagline: "Esri Ocean Base · 深蓝海道",
    swatch: "#2d5fa6",
    tone: "blue",
    style: rasterStyle({
      tiles: [
        "https://services.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}",
      ],
      attribution: ATTR_ESRI,
      background: "#0c2a4d",
      maxzoom: 13,
    }),
  },
  {
    id: "satellite",
    label: "卫星实景",
    tagline: "Esri World Imagery · 真实地表",
    swatch: "#3b6b3b",
    tone: "dark",
    style: rasterStyle({
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      ],
      attribution: ATTR_ESRI,
      background: "#0a0a0a",
      maxzoom: 19,
      referenceTiles: [
        "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      ],
      referenceAttribution:
        "Reference: Esri, Garmin, HERE, OpenStreetMap contributors, and the GIS user community",
      referenceMaxzoom: 19,
      referenceOpacity: 0.7,
    }),
  },
  {
    id: "darkmatter",
    label: "夜航墨海",
    tagline: "CARTO Dark Matter · 漆黑夜海",
    swatch: "#1d2330",
    tone: "dark",
    style: rasterStyle({
      tiles: [
        "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
        "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
        "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
        "https://d.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
      ],
      attribution: ATTR_CARTO,
      background: "#0b0e13",
      maxzoom: 19,
    }),
  },
];

export const DEFAULT_STYLE_ID = "positron";

export function getStyleById(id: string): MapStyleOption {
  return MAP_STYLES.find((s) => s.id === id) ?? MAP_STYLES[0];
}
