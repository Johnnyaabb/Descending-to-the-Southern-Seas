/**
 * Map library abstraction.
 *
 * If VITE_MAPBOX_TOKEN is provided we use mapbox-gl with a Mapbox style.
 * Otherwise we fall back to maplibre-gl with the free OpenFreeMap "positron"
 * vector style (no token required).
 *
 * Both libraries share an almost-identical API for the bits we use
 * (Map, Marker, Popup, addSource, addLayer, setPaintProperty, fitBounds, flyTo).
 * We re-export a unified `MapboxLike` type and the `createMap()` helper.
 */
import maplibregl from "maplibre-gl";
import mapboxgl from "mapbox-gl";

/**
 * Unified map type. mapbox-gl and maplibre-gl share an almost-identical
 * runtime API but their TypeScript declarations conflict when unioned, so
 * we expose a permissive `any`-shaped facade and trust runtime behavior.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MapboxLike = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MarkerLike = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PopupLike = any;

export const MAPBOX_TOKEN: string = (import.meta.env.VITE_MAPBOX_TOKEN as string | undefined) ?? "";
export const HAS_MAPBOX_TOKEN = MAPBOX_TOKEN.trim().length > 0;

// Free MapLibre style: OpenFreeMap Positron (no token required, MIT data © OSM).
// Falls back to a raster OSM style if the vector tiles ever go down.
const POSITRON_STYLE = "https://tiles.openfreemap.org/styles/positron";

const RASTER_FALLBACK_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
  sources: {
    "osm-raster": {
      type: "raster",
      tiles: [
        "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors",
    },
  },
  layers: [
    { id: "background", type: "background", paint: { "background-color": "#0e1116" } },
    { id: "osm", type: "raster", source: "osm-raster", paint: { "raster-opacity": 0.72 } },
  ],
};

const MAPBOX_DARK_STYLE = "mapbox://styles/mapbox/dark-v11";

export interface CreateMapOptions {
  container: HTMLElement;
  center: [number, number];
  zoom: number;
  bearing?: number;
  pitch?: number;
}

/**
 * Returns:
 *  - `map`     : MapboxLike instance
 *  - `lib`     : "mapbox" | "maplibre"  (so callers can pick correct Marker/Popup constructor)
 *  - `mapbox`  : mapbox-gl namespace
 *  - `maplibre`: maplibre-gl namespace
 */
export function createMap(opts: CreateMapOptions): { map: MapboxLike; lib: "mapbox" | "maplibre" } {
  if (HAS_MAPBOX_TOKEN) {
    mapboxgl.accessToken = MAPBOX_TOKEN;
    const map = new mapboxgl.Map({
      container: opts.container,
      style: MAPBOX_DARK_STYLE,
      center: opts.center,
      zoom: opts.zoom,
      bearing: opts.bearing ?? 0,
      pitch: opts.pitch ?? 0,
      projection: "mercator",
    } as any);
    return { map, lib: "mapbox" as const };
  }

  // Try OpenFreeMap first; if it fails to load the style we'll have set the
  // raster fallback as a one-shot retry.
  let style: maplibregl.StyleSpecification | string = POSITRON_STYLE;
  // Provide a global error handler that switches to raster if vector style 404s
  // (network blocked, offline, etc.).
  const map = new maplibregl.Map({
    container: opts.container,
    style,
    center: opts.center,
    zoom: opts.zoom,
    bearing: opts.bearing ?? 0,
    pitch: opts.pitch ?? 0,
  } as any);
  map.on("error", (e: any) => {
    const msg = e?.error?.message ?? "";
    if (typeof style === "string" && msg.includes("style")) {
      style = RASTER_FALLBACK_STYLE;
      map.setStyle(RASTER_FALLBACK_STYLE);
    }
  });
  return { map, lib: "maplibre" as const };
}

export { maplibregl, mapboxgl };
