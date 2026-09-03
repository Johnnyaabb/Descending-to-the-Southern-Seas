import { useEffect, useRef, useState } from "react";
import type { Feature, FeatureCollection, LineString } from "geojson";
import { createMap, mapboxgl, maplibregl, type MapboxLike } from "../../lib/mapInstance";
import { getStyleById } from "../../lib/mapStyles";
import { smoothRouteLine } from "../../lib/arcGeometry";
import { MobileMapCompass } from "../../components/mobile/MobileMapCompass";
import {
  EVIDENCE_LABELS,
  HOMER_ROUTES,
  PLACE_BY_ID,
  placesForEpic,
  type EvidenceLevel,
  type HomerRoute,
} from "../data";
import { useHomerStore } from "../useHomerStore";

const ROUTE_SOURCE = "homer-routes";
const ROUTE_INACTIVE = "homer-routes-inactive";
const ROUTE_SOLID = "homer-routes-solid";
const ROUTE_TRADITIONAL = "homer-routes-traditional";
const ROUTE_MYTHIC = "homer-routes-mythic";

interface GeographyLabel {
  id: string;
  name: string;
  nameEn: string;
  coord: [number, number];
  kind: "sea" | "region" | "country";
  epic: "both" | "iliad" | "odyssey";
  primary?: boolean;
  mobileVisible?: boolean;
}

const GEOGRAPHY_LABELS: GeographyLabel[] = [
  { id: "europe", name: "欧洲", nameEn: "EUROPE", coord: [22.7, 41.05], kind: "region", epic: "both", primary: true },
  { id: "aegean", name: "爱琴海", nameEn: "AEGEAN SEA", coord: [24.45, 38.25], kind: "sea", epic: "both" },
  { id: "greece", name: "希腊", nameEn: "HELLAS · GREECE", coord: [22.9, 38.7], kind: "country", epic: "both", primary: true },
  { id: "turkey", name: "土耳其", nameEn: "TÜRKİYE · ANATOLIA", coord: [28.45, 38.75], kind: "country", epic: "both", primary: true },
  { id: "macedonia", name: "马其顿", nameEn: "MACEDONIA", coord: [21.55, 40.75], kind: "region", epic: "both" },
  { id: "thrace", name: "色雷斯", nameEn: "THRACE", coord: [25.6, 41.35], kind: "region", epic: "both" },
  { id: "peloponnese", name: "伯罗奔尼撒", nameEn: "PELOPONNESE", coord: [22.15, 37.25], kind: "region", epic: "both", mobileVisible: true },
  { id: "crete", name: "克里特岛", nameEn: "CRETE", coord: [24.85, 35.35], kind: "region", epic: "both", mobileVisible: true },
  { id: "adriatic", name: "亚得里亚海", nameEn: "ADRIATIC SEA", coord: [16.7, 42.1], kind: "sea", epic: "odyssey" },
  { id: "ionian", name: "伊奥尼亚海", nameEn: "IONIAN SEA", coord: [18.05, 37.2], kind: "sea", epic: "odyssey" },
  { id: "tyrrhenian", name: "第勒尼安海", nameEn: "TYRRHENIAN SEA", coord: [11.65, 39.05], kind: "sea", epic: "odyssey" },
  { id: "mediterranean", name: "地中海", nameEn: "MEDITERRANEAN SEA", coord: [20.6, 33.8], kind: "sea", epic: "odyssey" },
  { id: "italy", name: "意大利半岛", nameEn: "ITALIA", coord: [12.15, 42.15], kind: "region", epic: "odyssey", mobileVisible: true },
  { id: "sardinia", name: "撒丁岛", nameEn: "SARDINIA", coord: [9.05, 40.05], kind: "region", epic: "odyssey" },
  { id: "sicily", name: "西西里岛", nameEn: "SICILIA", coord: [13.25, 36.65], kind: "region", epic: "odyssey", mobileVisible: true },
  { id: "north-africa", name: "北非海岸", nameEn: "NORTH AFRICA", coord: [11.1, 33.05], kind: "region", epic: "odyssey", mobileVisible: true },
];

function routeColor(route: HomerRoute) {
  if (route.kind === "telemachy") return "#e0bd6c";
  if (route.kind === "battle") return "#f1a068";
  return route.epic === "iliad" ? "#d87952" : "#55c6c1";
}

function routeFeature(route: HomerRoute, active: boolean): Feature<LineString> | null {
  const from = PLACE_BY_ID.get(route.fromId);
  const to = PLACE_BY_ID.get(route.toId);
  if (!from || !to) return null;
  const points: Array<[number, number]> = [from.coord, ...(route.waypoints ?? []), to.coord];
  const line = smoothRouteLine(points, route.kind === "battle" ? 6 : 12);
  return {
    ...line,
    properties: {
      id: route.id,
      label: route.label,
      active,
      evidence: route.evidence,
      kind: route.kind,
      color: routeColor(route),
      width: route.kind === "battle" ? 3.2 : Math.min(4.2, 1.4 + (route.metric ?? 24) / 46),
    },
  };
}

function routeCollection(
  epic: "iliad" | "odyssey",
  book: number,
  storyStep: number,
  orderMode: "reading" | "story",
): FeatureCollection<LineString> {
  const features = HOMER_ROUTES.filter((route) => route.epic === epic)
    .map((route) => {
      const active = orderMode === "reading" ? route.book <= book : route.storyOrder <= storyStep;
      return routeFeature(route, active);
    })
    .filter((feature): feature is Feature<LineString> => feature !== null);
  return { type: "FeatureCollection", features };
}

function ensureRouteLayers(map: MapboxLike) {
  if (!map.getSource(ROUTE_SOURCE)) {
    map.addSource(ROUTE_SOURCE, {
      type: "geojson",
      data: { type: "FeatureCollection", features: [] },
    });
  }
  if (!map.getLayer(ROUTE_INACTIVE)) {
    map.addLayer({
      id: ROUTE_INACTIVE,
      type: "line",
      source: ROUTE_SOURCE,
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": ["get", "color"],
        "line-width": ["get", "width"],
        "line-opacity": ["case", ["==", ["get", "active"], true], 0.22, 0.09],
        "line-blur": 2.5,
      },
    });
  }
  if (!map.getLayer(ROUTE_SOLID)) {
    map.addLayer({
      id: ROUTE_SOLID,
      type: "line",
      source: ROUTE_SOURCE,
      filter: [
        "all",
        ["==", ["get", "active"], true],
        ["match", ["get", "evidence"], ["confirmed", "textual"], true, false],
      ],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": ["get", "color"],
        "line-width": ["get", "width"],
        "line-opacity": 0.92,
      },
    });
  }
  if (!map.getLayer(ROUTE_TRADITIONAL)) {
    map.addLayer({
      id: ROUTE_TRADITIONAL,
      type: "line",
      source: ROUTE_SOURCE,
      filter: [
        "all",
        ["==", ["get", "active"], true],
        ["==", ["get", "evidence"], "traditional"],
      ],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": ["get", "color"],
        "line-width": ["get", "width"],
        "line-opacity": 0.88,
        "line-dasharray": [2.2, 1.4],
      },
    });
  }
  if (!map.getLayer(ROUTE_MYTHIC)) {
    map.addLayer({
      id: ROUTE_MYTHIC,
      type: "line",
      source: ROUTE_SOURCE,
      filter: [
        "all",
        ["==", ["get", "active"], true],
        ["==", ["get", "evidence"], "mythic"],
      ],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": ["get", "color"],
        "line-width": ["get", "width"],
        "line-opacity": 0.8,
        "line-dasharray": [0.45, 1.6],
      },
    });
  }
}

interface HomerMapProps {
  styleId: string;
  labelsVisible: boolean;
  routesVisible?: boolean;
  mobile?: boolean;
}

export function HomerMap({ styleId, labelsVisible, routesVisible = true, mobile = false }: HomerMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapboxLike | null>(null);
  const markersRef = useRef<Array<{ remove: () => void }>>([]);
  const previousEpicRef = useRef<string | null>(null);
  const appliedStyleRef = useRef(styleId);
  const [ready, setReady] = useState(false);
  const [styleRevision, setStyleRevision] = useState(0);

  const epic = useHomerStore((state) => state.epic);
  const book = useHomerStore((state) => state.book);
  const storyStep = useHomerStore((state) => state.storyStep);
  const orderMode = useHomerStore((state) => state.orderMode);
  const selectedPlaceId = useHomerStore((state) => state.selectedPlaceId);
  const selectPlace = useHomerStore((state) => state.selectPlace);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const { map } = createMap({
      container: containerRef.current,
      center: [20.5, 38],
      zoom: 4.2,
      pitch: 0,
      bearing: 0,
      style: getStyleById(styleId).style,
      compactAttribution: mobile,
    });
    mapRef.current = map;
    let styleRetryTimer: number | undefined;

    const onLoad = () => {
      ensureRouteLayers(map);
      setReady(true);
      setStyleRevision((revision) => revision + 1);
    };
    const restoreStyleLayers = () => {
      try {
        ensureRouteLayers(map);
        setReady(true);
        setStyleRevision((revision) => revision + 1);
      } catch {
        styleRetryTimer = window.setTimeout(restoreStyleLayers, 80);
      }
    };
    const onStyleLoad = () => restoreStyleLayers();
    map.on("load", onLoad);
    map.on("style.load", onStyleLoad);

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      if (styleRetryTimer) window.clearTimeout(styleRetryTimer);
      map.off?.("load", onLoad);
      map.off?.("style.load", onStyleLoad);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || appliedStyleRef.current === styleId) return;

    appliedStyleRef.current = styleId;
    setReady(false);
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];
    let cancelled = false;
    let restored = false;
    let retryTimer: number | undefined;
    const restoreOverlays = () => {
      if (cancelled || restored) return;
      try {
        ensureRouteLayers(map);
        restored = true;
        if (retryTimer) window.clearTimeout(retryTimer);
        setReady(true);
        setStyleRevision((revision) => revision + 1);
      } catch {
        retryTimer = window.setTimeout(restoreOverlays, 80);
      }
    };

    map.once?.("styledata", restoreOverlays);
    map.setStyle(getStyleById(styleId).style);
    retryTimer = window.setTimeout(restoreOverlays, 80);

    return () => {
      cancelled = true;
      if (retryTimer) window.clearTimeout(retryTimer);
      map.off?.("styledata", restoreOverlays);
    };
  }, [styleId]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    try {
      ensureRouteLayers(map);
    } catch {
      // A style switch can briefly leave React's ready flag one frame ahead of
      // MapLibre. The style.load handler restores the overlays once available.
      return;
    }
    const source = map.getSource(ROUTE_SOURCE) as { setData?: (data: FeatureCollection) => void };
    source?.setData?.(
      routesVisible
        ? routeCollection(epic, book, storyStep, orderMode)
        : { type: "FeatureCollection", features: [] },
    );

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];
    // Both libraries expose the same Marker/Popup runtime API, but their
    // declaration types are nominally incompatible when held in one union.
    const markerLib: any = map instanceof maplibregl.Map ? maplibregl : mapboxgl;
    const places = placesForEpic(epic);
    const activePlaceIds = new Set<string>();
    HOMER_ROUTES.filter((route) => route.epic === epic).forEach((route) => {
      const active = orderMode === "reading" ? route.book <= book : route.storyOrder <= storyStep;
      if (active) {
        activePlaceIds.add(route.fromId);
        activePlaceIds.add(route.toId);
      }
    });

    if (labelsVisible) {
      GEOGRAPHY_LABELS.filter((label) => label.epic === "both" || label.epic === epic).forEach((geoLabel) => {
        const element = document.createElement("div");
        element.className = [
          "homer-geography-label",
          `homer-geography-label--${geoLabel.kind}`,
          geoLabel.primary ? "homer-geography-label--primary" : "",
          geoLabel.mobileVisible ? "homer-geography-label--mobile" : "",
        ]
          .filter(Boolean)
          .join(" ");
        element.setAttribute("aria-hidden", "true");

        const name = document.createElement("span");
        name.className = "homer-geography-label__name";
        name.textContent = geoLabel.name;
        const nameEn = document.createElement("span");
        nameEn.className = "homer-geography-label__en";
        nameEn.textContent = geoLabel.nameEn;
        element.append(name, nameEn);

        const marker = new markerLib.Marker({ element, anchor: "center" })
          .setLngLat(geoLabel.coord)
          .addTo(map);
        markersRef.current.push(marker);
      });
    }

    places.forEach((place) => {
      const element = document.createElement("button");
      element.type = "button";
      element.className = [
        "homer-map-marker",
        `homer-map-marker--${place.evidence}`,
        activePlaceIds.has(place.id) ? "is-active" : "",
        selectedPlaceId === place.id ? "is-selected" : "",
      ]
        .filter(Boolean)
        .join(" ");
      element.setAttribute("aria-label", `${place.name}，${EVIDENCE_LABELS[place.evidence].label}`);

      const dot = document.createElement("span");
      dot.className = "homer-map-marker__dot";
      const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      icon.classList.add("homer-map-marker__icon");
      icon.setAttribute("viewBox", "0 0 24 24");
      icon.setAttribute("aria-hidden", "true");
      icon.setAttribute("focusable", "false");
      const helmet = document.createElementNS("http://www.w3.org/2000/svg", "path");
      helmet.setAttribute(
        "d",
        "M19.5 8.5C18.8 5.4 16.3 3.5 13 3.5c-4.2 0-7 3.1-7 7.4 0 .8.1 1.5.4 2.2L4.8 17h3.4l1.8-2.5h3V20h3V9.6l3.5-1.1ZM9.5 9.8H16",
      );
      icon.append(helmet);
      dot.append(icon);
      const label = document.createElement("span");
      label.className = "homer-map-marker__label";
      label.textContent = place.name;
      element.append(dot, label);

      element.addEventListener("click", () => {
        selectPlace(place.id);
        map.flyTo({ center: place.coord, zoom: Math.max(map.getZoom(), epic === "iliad" ? 5 : 4.6), duration: 900 });
      });

      const popupContent = document.createElement("div");
      const popupTitle = document.createElement("strong");
      popupTitle.textContent = place.name;
      const popupMeta = document.createElement("div");
      popupMeta.className = "mt-1 text-[10px] uppercase tracking-wider opacity-65";
      popupMeta.textContent = EVIDENCE_LABELS[place.evidence].label;
      const popupBody = document.createElement("p");
      popupBody.className = "mt-2 text-xs leading-relaxed";
      popupBody.textContent = place.description;
      popupContent.append(popupTitle, popupMeta, popupBody);

      const popup = new markerLib.Popup({ closeButton: false, offset: 18 }).setDOMContent(popupContent);
      const marker = new markerLib.Marker({ element, anchor: "center" })
        .setLngLat(place.coord)
        .setPopup(popup)
        .addTo(map);
      markersRef.current.push(marker);
    });

    if (previousEpicRef.current !== epic) {
      previousEpicRef.current = epic;
      const wide = window.innerWidth >= 1180;
      const padding = mobile
        ? { top: 38, right: 28, bottom: 205, left: 28 }
        : wide
          ? { top: 80, right: 360, bottom: 140, left: 370 }
          : { top: 80, right: 45, bottom: 135, left: 45 };
      map.fitBounds(
        epic === "iliad"
          ? [[19.2, 34.4], [29.1, 41.8]]
          : [[7.2, 31.8], [28.4, 43.2]],
        { padding, duration: 1100 },
      );
    }
  }, [book, epic, labelsVisible, mobile, orderMode, ready, routesVisible, selectPlace, selectedPlaceId, storyStep, styleId, styleRevision]);

  useEffect(() => {
    if (!mobile || !ready || !selectedPlaceId) return;
    const map = mapRef.current;
    const place = PLACE_BY_ID.get(selectedPlaceId);
    if (!map || !place) return;
    map.flyTo({ center: place.coord, zoom: Math.max(map.getZoom(), epic === "iliad" ? 4.8 : 4.35), duration: 720 });
  }, [epic, mobile, ready, selectedPlaceId]);

  const styleTone = getStyleById(styleId).tone;
  const toneTint =
    styleTone === "light"
      ? "rgba(5, 15, 22, 0.15)"
      : styleTone === "sepia"
        ? "rgba(34, 17, 6, 0.13)"
        : styleTone === "dark"
          ? "rgba(1, 6, 10, 0.16)"
          : "transparent";

  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-[#07131d] ${mobile ? "homer-map--mobile" : ""} ${styleId === "satellite" ? "homer-map--satellite" : ""}`}
    >
      <div ref={containerRef} className="absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 transition-colors duration-500" style={{ backgroundColor: toneTint }} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_25%,rgba(2,9,15,0.42)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#071018]/80 to-transparent" />

      {mobile && ready && mapRef.current ? <MobileMapCompass map={mapRef.current} /> : null}

      {!ready && (
        <div className="absolute inset-0 grid place-items-center bg-[#061019]/80">
          <div className="homer-panel px-5 py-4 text-center text-sm text-[#f2dfbb]">
            <span className="mx-auto mb-2 block h-6 w-6 animate-spin rounded-full border-2 border-[#d8b46a] border-t-transparent" />
            正在展开爱琴海图卷…
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute bottom-3 left-1/2 hidden -translate-x-1/2 items-center gap-3 rounded-full border border-[#d8b46a]/25 bg-[#071018]/75 px-3 py-1.5 text-[10px] text-[#f3e4c8]/70 backdrop-blur md:flex">
        {(["confirmed", "textual", "traditional", "mythic"] as EvidenceLevel[]).map((level) => (
          <span key={level} className="flex items-center gap-1.5">
            <i className={`homer-evidence-dot homer-evidence-dot--${level}`} />
            {EVIDENCE_LABELS[level].short}
          </span>
        ))}
      </div>
    </div>
  );
}
