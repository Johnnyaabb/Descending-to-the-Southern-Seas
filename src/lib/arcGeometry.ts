import { geoInterpolate } from "d3";
import type { Feature, LineString, Point as GjPoint } from "geojson";

export type LngLat = [number, number];

const EARTH_RADIUS_KM = 6371;

/** Haversine distance between two WGS-84 points in kilometers. */
export function haversineDistanceKm(a: LngLat, b: LngLat): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b[1] - a[1]);
  const dLon = toRad(b[0] - a[0]);
  const φ1 = toRad(a[1]);
  const φ2 = toRad(b[1]);
  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.min(1, Math.sqrt(h)));
}

/** Sum of geodesic segment lengths along a LineString (matches the rendered route polyline). */
export function lineStringLengthKm(coords: LngLat[]): number {
  if (coords.length < 2) return 0;
  let sum = 0;
  for (let i = 1; i < coords.length; i++) {
    sum += haversineDistanceKm(coords[i - 1], coords[i]);
  }
  return sum;
}

/**
 * Generate a great-circle arc (LineString) between two coordinates,
 * lifted upwards (visual curvature) by interpolating along d3.geoInterpolate
 * and bowing the path toward higher latitudes for a nicer arc.
 *
 * Returns ~`steps` vertices.
 */
export function greatCircleArc(from: LngLat, to: LngLat, steps = 64): Feature<LineString> {
  const interpolator = geoInterpolate(from, to);
  const coords: LngLat[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const [lng, lat] = interpolator(t);
    const lift = Math.sin(Math.PI * t) * 3.5;
    coords.push([lng, lat + lift]);
  }
  return {
    type: "Feature",
    geometry: { type: "LineString", coordinates: coords },
    properties: {},
  };
}

/**
 * Centripetal Catmull-Rom spline through a sequence of waypoints.
 * Produces a smooth, curvy path that strictly passes through every waypoint
 * without overshoot/loops — ideal for tracing historical sea lanes.
 */
function catmullRom(
  p0: LngLat,
  p1: LngLat,
  p2: LngLat,
  p3: LngLat,
  t: number,
  alpha = 0.5,
): LngLat {
  const tj = (ti: number, pi: LngLat, pj: LngLat) => {
    const dx = pj[0] - pi[0];
    const dy = pj[1] - pi[1];
    return Math.pow(Math.hypot(dx, dy), alpha) + ti;
  };
  const t0 = 0;
  const t1 = tj(t0, p0, p1);
  const t2 = tj(t1, p1, p2);
  const t3 = tj(t2, p2, p3);
  const u = t1 + (t2 - t1) * t;

  const lerp = (a: number, b: number, ta: number, tb: number, x: number) =>
    a + ((x - ta) / (tb - ta)) * (b - a);

  const a1x = lerp(p0[0], p1[0], t0, t1, u);
  const a1y = lerp(p0[1], p1[1], t0, t1, u);
  const a2x = lerp(p1[0], p2[0], t1, t2, u);
  const a2y = lerp(p1[1], p2[1], t1, t2, u);
  const a3x = lerp(p2[0], p3[0], t2, t3, u);
  const a3y = lerp(p2[1], p3[1], t2, t3, u);

  const b1x = lerp(a1x, a2x, t0, t2, u);
  const b1y = lerp(a1y, a2y, t0, t2, u);
  const b2x = lerp(a2x, a3x, t1, t3, u);
  const b2y = lerp(a2y, a3y, t1, t3, u);

  return [lerp(b1x, b2x, t1, t2, u), lerp(b1y, b2y, t1, t2, u)] as LngLat;
}

/**
 * Build a smooth LineString that passes through a series of waypoints.
 * Uses centripetal Catmull-Rom interpolation with `samplesPerSegment` points
 * per segment. The first and last waypoints are anchored.
 */
export function smoothRouteLine(
  waypoints: LngLat[],
  samplesPerSegment = 14,
): Feature<LineString> {
  if (waypoints.length < 2) {
    return {
      type: "Feature",
      geometry: { type: "LineString", coordinates: waypoints },
      properties: {},
    };
  }
  // Pad with mirrored endpoints so the spline has tangent control at the ends.
  const reflect = (a: LngLat, b: LngLat): LngLat => [2 * a[0] - b[0], 2 * a[1] - b[1]];
  const pts: LngLat[] = [
    reflect(waypoints[0], waypoints[1]),
    ...waypoints,
    reflect(
      waypoints[waypoints.length - 1],
      waypoints[waypoints.length - 2],
    ),
  ];

  const out: LngLat[] = [];
  for (let i = 1; i < pts.length - 2; i++) {
    const p0 = pts[i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2];
    for (let s = 0; s < samplesPerSegment; s++) {
      const t = s / samplesPerSegment;
      out.push(catmullRom(p0, p1, p2, p3, t));
    }
  }
  out.push(waypoints[waypoints.length - 1]);

  return {
    type: "Feature",
    geometry: { type: "LineString", coordinates: out },
    properties: {},
  };
}

export function pointAlongArc(arc: Feature<LineString>, t: number): LngLat {
  const coords = arc.geometry.coordinates;
  const idx = Math.min(coords.length - 2, Math.floor(t * (coords.length - 1)));
  const frac = t * (coords.length - 1) - idx;
  const a = coords[idx];
  const b = coords[idx + 1];
  return [a[0] + (b[0] - a[0]) * frac, a[1] + (b[1] - a[1]) * frac] as LngLat;
}

export function makePoint(coord: LngLat, properties: Record<string, unknown> = {}): Feature<GjPoint> {
  return {
    type: "Feature",
    geometry: { type: "Point", coordinates: coord },
    properties,
  };
}
