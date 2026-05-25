import { useEffect, useMemo, useRef } from "react";
import type { Feature, FeatureCollection, LineString, Point as GjPoint } from "geojson";
import { useTimelineStore } from "../store/useTimelineStore";
import { ALL_PORTS } from "../data/ports";
import { FLOWS, flowsActiveAt } from "../data/flows";
import { pointAlongArc, smoothRouteLine, lineStringLengthKm, type LngLat } from "../lib/arcGeometry";
import { migrationRouteWaypoints } from "../data/migrationRoutes";
import type { MapboxLike } from "../lib/mapInstance";
import { HAS_MAPBOX_TOKEN } from "../lib/mapInstance";
import { registerMigrationOverlayRestore } from "../lib/migrationOverlayBus";

const ARC_SOURCE = "arcs-src";
const ARC_LINE_LAYER = "arcs-line";
const ARC_GLOW_LAYER = "arcs-glow";
const ARC_LABEL_SOURCE = "arcs-label-src";
const ARC_LABEL_LAYER = "arcs-label";
const PARTICLE_SOURCE = "particles-src";
const PARTICLE_LAYER = "particles-layer";
const SHIP_ICON_ID = "redhead-ship";

/**
 * Build a "红头船" (red-head ship) icon as ImageData.
 * The boat is drawn with the bow pointing UP (=北/0°), so the map's
 * `icon-rotate` can directly receive the travel bearing in degrees.
 */
function makeShipImage(size = 64): ImageData {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const s = size / 32;
  ctx.scale(s, s);
  ctx.lineJoin = "round";

  // Outer glow + dark hull outline so it stands out against the dashed line
  ctx.shadowColor = "rgba(0,0,0,0.85)";
  ctx.shadowBlur = 3;
  ctx.shadowOffsetY = 1;

  // Hull (warm wood color)
  ctx.fillStyle = "#e8c581";
  ctx.strokeStyle = "#221408";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(16, 2.5);
  ctx.bezierCurveTo(22, 7, 23, 13, 23, 18);
  ctx.lineTo(23, 25);
  ctx.bezierCurveTo(23, 28, 20, 30, 16, 30);
  ctx.bezierCurveTo(12, 30, 9, 28, 9, 25);
  ctx.lineTo(9, 18);
  ctx.bezierCurveTo(9, 13, 10, 7, 16, 2.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  // Signature red bow ("红头")
  ctx.fillStyle = "#c2261d";
  ctx.strokeStyle = "#5a1010";
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.moveTo(16, 2.5);
  ctx.bezierCurveTo(22, 7, 23, 12, 23, 14);
  ctx.lineTo(9, 14);
  ctx.bezierCurveTo(9, 12, 10, 7, 16, 2.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Gold stripe between red head and hull
  ctx.fillStyle = "#f5cb53";
  ctx.fillRect(9, 14, 14, 1.4);

  // Wooden cabin
  ctx.fillStyle = "#6b3b16";
  ctx.strokeStyle = "#1a0c04";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.rect(12.5, 17, 7, 6);
  ctx.fill();
  ctx.stroke();

  // Vertical mast
  ctx.fillStyle = "#1a0c04";
  ctx.fillRect(15.55, 15, 0.9, 9.5);

  // Triangular sail catching the monsoon wind
  ctx.fillStyle = "rgba(255, 248, 224, 0.95)";
  ctx.strokeStyle = "rgba(34, 20, 8, 0.85)";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(16, 15.5);
  ctx.lineTo(21.5, 23);
  ctx.lineTo(10.5, 23);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // A tiny wake at the stern
  ctx.fillStyle = "rgba(245, 230, 200, 0.6)";
  ctx.beginPath();
  ctx.ellipse(16, 30.2, 2.4, 0.8, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  return ctx.getImageData(0, 0, size, size);
}

/**
 * Bearing in degrees (0° = north, clockwise) between two lng/lat points.
 */
function bearingDeg(from: [number, number], to: [number, number]): number {
  const φ1 = (from[1] * Math.PI) / 180;
  const φ2 = (to[1] * Math.PI) / 180;
  const Δλ = ((to[0] - from[0]) * Math.PI) / 180;
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

interface Props {
  map: MapboxLike;
}

interface ArcCache {
  flowId: string;
  arc: Feature<LineString>;
  /** Geodesic length along the smoothed route polyline (km). */
  lengthKm: number;
}

export function MigrationArcs({ map }: Props) {
  const year = useTimelineStore((s) => s.year);
  const speed = useTimelineStore((s) => s.speed);
  const arcCacheRef = useRef<Map<string, ArcCache>>(new Map());
  const hoverRef = useRef<{ enter: () => void; leave: () => void } | null>(null);

  // Build & cache realistic historical sea routes once.
  const arcMap = useMemo(() => {
    const cache = new Map<string, ArcCache>();
    const portById = new Map(ALL_PORTS.map((p) => [p.id, p]));
    for (const f of FLOWS) {
      const from = portById.get(f.fromId);
      const to = portById.get(f.toId);
      if (!from || !to) continue;
      const waypoints = migrationRouteWaypoints(
        from.coord as LngLat,
        to.coord as LngLat,
        f.fromId,
        f.toId,
      );
      const line = smoothRouteLine(waypoints, 14);
      const coords = line.geometry.coordinates as LngLat[];
      cache.set(f.id, {
        flowId: f.id,
        arc: line,
        lengthKm: lineStringLengthKm(coords),
      });
    }
    arcCacheRef.current = cache;
    return cache;
  }, []);

  // Overlay sources/layers/icons + hover. Re-run on every style load because setStyle() wipes custom layers.
  useEffect(() => {
    const pushOverlayGeoJSON = (y: number) => {
      const cache = arcCacheRef.current;
      const src = map.getSource(ARC_SOURCE) as { setData?: (d: FeatureCollection) => void } | undefined;
      if (src?.setData) {
        const lineFeats = buildArcFeaturesForYear(y, cache);
        src.setData({ type: "FeatureCollection", features: lineFeats } satisfies FeatureCollection);
      }
      const labelSrc = map.getSource(ARC_LABEL_SOURCE) as { setData?: (d: FeatureCollection) => void } | undefined;
      if (labelSrc?.setData) {
        const labels = buildLabelFeaturesForYear(y, cache);
        labelSrc.setData({ type: "FeatureCollection", features: labels } satisfies FeatureCollection);
      }
    };

    const attachHover = () => {
      if (!map.getLayer?.(ARC_LINE_LAYER)) return;
      if (hoverRef.current) {
        map.off("mouseenter", ARC_LINE_LAYER, hoverRef.current.enter);
        map.off("mouseleave", ARC_LINE_LAYER, hoverRef.current.leave);
      }
      const enter = () => {
        map.getCanvas().style.cursor = "pointer";
      };
      const leave = () => {
        map.getCanvas().style.cursor = "";
      };
      hoverRef.current = { enter, leave };
      map.on("mouseenter", ARC_LINE_LAYER, enter);
      map.on("mouseleave", ARC_LINE_LAYER, leave);
    };

    const syncOverlay = () => {
      if (!map.isStyleLoaded?.()) {
        map.once?.("style.load", syncOverlay);
        return;
      }

      if (!map.getSource(ARC_SOURCE)) {
        map.addSource(ARC_SOURCE, {
          type: "geojson",
          data: { type: "FeatureCollection", features: [] },
        } as any);
        map.addLayer({
          id: ARC_GLOW_LAYER,
          type: "line",
          source: ARC_SOURCE,
          layout: { "line-cap": "round", "line-join": "round" },
          paint: {
            "line-color": ["get", "color"],
            "line-width": ["interpolate", ["linear"], ["get", "weight"], 0, 2, 1, 10],
            "line-opacity": 0.22,
            "line-blur": 5,
          },
        } as any);
        map.addLayer({
          id: ARC_LINE_LAYER,
          type: "line",
          source: ARC_SOURCE,
          layout: { "line-cap": "round", "line-join": "round" },
          paint: {
            "line-color": ["get", "color"],
            "line-width": ["interpolate", ["linear"], ["get", "weight"], 0, 0.8, 1, 3.2],
            "line-opacity": 0.88,
            "line-dasharray": [3, 1.2],
          },
        } as any);
      }

      if (!(map as any).hasImage?.(SHIP_ICON_ID)) {
        try {
          (map as any).addImage(SHIP_ICON_ID, makeShipImage(64), { pixelRatio: 2 });
        } catch {
          /* duplicate add */
        }
      }

      if (!map.getSource(PARTICLE_SOURCE)) {
        map.addSource(PARTICLE_SOURCE, {
          type: "geojson",
          data: { type: "FeatureCollection", features: [] },
        } as any);
        map.addLayer({
          id: PARTICLE_LAYER,
          type: "symbol",
          source: PARTICLE_SOURCE,
          layout: {
            "icon-image": SHIP_ICON_ID,
            "icon-size": ["interpolate", ["linear"], ["get", "size"], 0, 0.7, 1, 1.05],
            "icon-rotate": ["get", "bearing"],
            "icon-rotation-alignment": "map",
            "icon-pitch-alignment": "map",
            "icon-allow-overlap": true,
            "icon-ignore-placement": true,
          },
          paint: {
            "icon-opacity": ["get", "alpha"],
          },
        } as any);
      }

      // Distance labels: own source + add *above* ship particles so text is not covered.
      if (!map.getSource(ARC_LABEL_SOURCE)) {
        map.addSource(ARC_LABEL_SOURCE, {
          type: "geojson",
          data: { type: "FeatureCollection", features: [] },
        } as any);
        try {
          const fontStack = inferTextFontFromStyle(map) ?? arcLabelFontStack();
          map.addLayer({
            id: ARC_LABEL_LAYER,
            type: "symbol",
            source: ARC_LABEL_SOURCE,
            layout: {
              "text-field": ["get", "label"],
              "text-size": 12,
              "text-font": fontStack,
              "text-offset": [0, 0.2],
              "text-anchor": "center",
              "text-allow-overlap": true,
              "text-ignore-placement": true,
            },
            paint: {
              "text-color": "#f5e6c8",
              "text-halo-color": "#0c0a08",
              "text-halo-width": 1.35,
              "text-halo-blur": 0.2,
            },
          } as any);
        } catch (e) {
          console.warn("[MigrationArcs] arc distance labels layer failed:", e);
        }
      }

      // Critical after setStyle(): sources are recreated empty; re-apply current timeline year.
      pushOverlayGeoJSON(useTimelineStore.getState().year);
      attachHover();
    };

    const unsubscribeBus = registerMigrationOverlayRestore(syncOverlay);

    if (map.isStyleLoaded?.()) {
      syncOverlay();
    }
    map.on("load", syncOverlay);
    map.on("style.load", syncOverlay);

    return () => {
      unsubscribeBus();
      map.off("load", syncOverlay);
      map.off("style.load", syncOverlay);
      if (hoverRef.current) {
        map.off("mouseenter", ARC_LINE_LAYER, hoverRef.current.enter);
        map.off("mouseleave", ARC_LINE_LAYER, hoverRef.current.leave);
        hoverRef.current = null;
      }
    };
  }, [map, arcMap]);

  // Update active arcs + distance labels when year changes.
  useEffect(() => {
    const cache = arcCacheRef.current;
    const src = map.getSource(ARC_SOURCE) as { setData?: (d: FeatureCollection) => void } | undefined;
    if (src?.setData) {
      const features = buildArcFeaturesForYear(year, cache);
      src.setData({ type: "FeatureCollection", features } satisfies FeatureCollection);
    }
    const labelSrc = map.getSource(ARC_LABEL_SOURCE) as { setData?: (d: FeatureCollection) => void } | undefined;
    if (labelSrc?.setData) {
      const labels = buildLabelFeaturesForYear(year, cache);
      labelSrc.setData({ type: "FeatureCollection", features: labels } satisfies FeatureCollection);
    }
  }, [map, year]);

  // Particle animation loop.
  useEffect(() => {
    let raf = 0;
    let running = true;
    const particles: {
      flowId: string;
      arc: Feature<LineString>;
      t: number;
      tSpeed: number;
      size: number;
      color: string;
    }[] = [];

    const tick = () => {
      if (!running) return;
      const active = flowsActiveAt(useTimelineStore.getState().year);
      const activeIds = new Set(active.map((f) => f.id));
      const playSpeed = useTimelineStore.getState().speed;

      // Add ships up to a target count per active flow. Heavier flows carry more boats.
      for (const f of active) {
        const cache = arcCacheRef.current.get(f.id);
        if (!cache) continue;
        const target = f.volume > 500_000 ? 3 : f.volume > 100_000 ? 2 : 1;
        const cur = particles.filter((p) => p.flowId === f.id).length;
        const need = target - cur;
        for (let i = 0; i < need; i++) {
          particles.push({
            flowId: f.id,
            arc: cache.arc,
            t: -Math.random() * 0.6,
            tSpeed: 0.0035 + Math.random() * 0.0025,
            size: 0.5 + Math.log(f.volume + 1) / Math.log(2_000_000),
            color: colorForPhase(f.phaseId),
          });
        }
      }
      // Drop ships whose flow is no longer active.
      for (let i = particles.length - 1; i >= 0; i--) {
        if (!activeIds.has(particles[i].flowId)) particles.splice(i, 1);
      }

      // Advance, compute heading, fade in/out at the ends.
      const features: Feature<GjPoint>[] = [];
      for (const p of particles) {
        p.t += p.tSpeed * (1 + (playSpeed - 1) * 0.4);
        if (p.t > 1) p.t = -Math.random() * 0.6;
        if (p.t < 0) continue;
        const alpha = Math.sin(Math.PI * p.t) * 0.95;
        const coord = pointAlongArc(p.arc, p.t);
        const ahead = pointAlongArc(p.arc, Math.min(1, p.t + 0.012));
        const bearing = bearingDeg(coord, ahead);
        features.push({
          type: "Feature",
          geometry: { type: "Point", coordinates: coord },
          properties: {
            size: Math.min(1, p.size),
            bearing,
            alpha,
          },
        });
      }

      const src = map.getSource(PARTICLE_SOURCE) as any;
      if (src) src.setData({ type: "FeatureCollection", features });
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
    };
  }, [map, speed, arcMap]);

  return null;
}

/** Fonts must exist in the active style's glyph PBFs (or Demotiles when using raster fallback). */
function arcLabelFontStack(): string[] {
  return HAS_MAPBOX_TOKEN
    ? ["DIN Offc Pro Medium", "Arial Unicode MS Regular"]
    : [
        "Open Sans Regular",
        "Noto Sans Regular",
        "Arial Unicode MS Regular",
      ];
}

/**
 * Reuse a font stack from the basemap's own symbol layers so glyphs are guaranteed to exist.
 */
function inferTextFontFromStyle(map: MapboxLike): string[] | null {
  const style = map.getStyle?.() as { layers?: Array<Record<string, unknown>> } | undefined;
  const layers = style?.layers;
  if (!Array.isArray(layers)) return null;
  for (const layer of layers) {
    if (layer.type !== "symbol") continue;
    const layout = layer.layout as Record<string, unknown> | undefined;
    const stack = normalizeLayoutTextFont(layout?.["text-font"]);
    if (stack) return stack;
  }
  return null;
}

/** Unwrap Mapbox layout expressions like ["literal", ["Font A", "Font B"]]. */
function normalizeLayoutTextFont(tf: unknown): string[] | null {
  if (!Array.isArray(tf) || tf.length === 0) return null;
  if (tf[0] === "literal" && Array.isArray(tf[1])) {
    const inner = tf[1];
    if (inner.length > 0 && inner.every((x) => typeof x === "string")) return inner as string[];
    return null;
  }
  if (tf.every((x) => typeof x === "string")) return tf as string[];
  return null;
}

/** 距离标签放在航线 parameter t 上：接近目的地港、仍落在弧线上，避免与起点/港标重叠 */
const DISTANCE_LABEL_T = 0.86;

function buildLabelFeaturesForYear(year: number, cache: Map<string, ArcCache>): Feature<GjPoint>[] {
  const active = flowsActiveAt(year);
  return active
    .map((f) => {
      const entry = cache.get(f.id);
      if (!entry) return null;
      const coord = pointAlongArc(entry.arc, DISTANCE_LABEL_T);
      const km = Math.round(entry.lengthKm);
      return {
        type: "Feature",
        geometry: { type: "Point", coordinates: coord },
        properties: {
          label: `${km.toLocaleString("zh-CN")} km`,
        },
      } as Feature<GjPoint>;
    })
    .filter((x): x is Feature<GjPoint> => x !== null);
}

function buildArcFeaturesForYear(
  year: number,
  cache: Map<string, ArcCache>,
): Feature<LineString>[] {
  const active = flowsActiveAt(year);
  const maxVolume = Math.max(1, ...active.map((f) => f.volume));
  return active
    .map((f) => {
      const entry = cache.get(f.id);
      if (!entry) return null;
      const weight = Math.log(f.volume + 1) / Math.log(maxVolume + 1);
      return {
        ...entry.arc,
        properties: {
          id: f.id,
          color: colorForPhase(f.phaseId),
          weight,
          volume: f.volume,
          note: f.note,
          from: f.fromId,
          to: f.toId,
        },
      } as Feature<LineString>;
    })
    .filter((x): x is Feature<LineString> => x !== null);
}

function colorForPhase(phaseId: string): string {
  switch (phaseId) {
    case "openSea":
      return "#7e8d52";
    case "redShipPeak":
      return "#c08a3c";
    case "shantouTreaty":
      return "#b22222";
    case "republic":
      return "#3b82f6";
    case "warEnd":
      return "#64748b";
    default:
      return "#f5e6c8";
  }
}
