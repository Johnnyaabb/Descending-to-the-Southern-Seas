import { useEffect, useRef, useState } from "react";
import { createMap, HAS_MAPBOX_TOKEN, type MapboxLike } from "../../lib/mapInstance";
import { notifyMigrationOverlayRestore } from "../../lib/migrationOverlayBus";
import { MigrationArcs } from "./MigrationArcs";
import { PortMarkers } from "./PortMarkers";
import { EventMarkers } from "./EventMarkers";
import { getStyleById } from "../../lib/mapStyles";
import { MobileMapCompass } from "../../components/mobile/MobileMapCompass";

interface Props {
  onMapReady?: (map: MapboxLike) => void;
  styleId: string;
  mobile?: boolean;
  routesVisible?: boolean;
}

export function MapView({ onMapReady, styleId, mobile = false, routesVisible = true }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapboxLike | null>(null);
  const initialStyleRef = useRef(styleId);
  const appliedStyleRef = useRef(styleId);
  const [, force] = useState(0); // re-render after map is ready so children can use it

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const { map } = createMap({
      container: containerRef.current,
      center: [121.8, 43.8],
      zoom: 4.4,
      bearing: 0,
      pitch: 0,
      style: HAS_MAPBOX_TOKEN ? undefined : getStyleById(initialStyleRef.current).style,
      compactAttribution: mobile,
    });
    mapRef.current = map;

    const fitToScope = () => {
      // 华北平原 — 辽东半岛 — 三江平原示意范围
      (map as any).fitBounds(
        mobile
          ? [
              [115.5, 36.5],
              [133.8, 49.3],
            ]
          : [
              [112.8, 36.8],
              [134.8, 49.8],
            ],
        {
          padding: mobile
            ? { top: 46, right: 22, bottom: 205, left: 22 }
            : { top: 60, right: 360, bottom: 180, left: 360 },
          duration: 0,
        }
      );
    };

    map.on("load", () => {
      fitToScope();
      force((n) => n + 1);
      onMapReady?.(map);
    });
    map.on("style.load", () => force((n) => n + 1));

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [mobile, onMapReady]);

  // Swap basemap style when the user picks a new one. `setStyle` clears any
  // sources/layers added by children, and that effect can run *after* child
  // mount — so we explicitly notify MigrationArcs to rebuild (see migrationOverlayBus).
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (HAS_MAPBOX_TOKEN) return; // when using a Mapbox token, that style wins
    if (appliedStyleRef.current === styleId) return;
    appliedStyleRef.current = styleId;
    const spec = getStyleById(styleId).style;
    try {
      (map as any).setStyle(spec as any);
    } catch {
      /* ignore style swap errors – previous style remains */
    }

    notifyMigrationOverlayRestore();

    const onStyleLoad = () => notifyMigrationOverlayRestore();
    map.on("style.load", onStyleLoad);

    let idleFired = false;
    const onIdle = () => {
      if (idleFired) return;
      idleFired = true;
      map.off?.("idle", onIdle);
      notifyMigrationOverlayRestore();
    };
    map.on?.("idle", onIdle);

    return () => {
      map.off?.("style.load", onStyleLoad);
      map.off?.("idle", onIdle);
    };
  }, [styleId]);

  const style = getStyleById(styleId);

  return (
    <div className={`relative h-full w-full ${mobile ? "migration-map--mobile" : ""}`}>
      <div ref={containerRef} className="absolute inset-0" />
      {/* Optional translucent tint to ensure arcs/ships read well on bright basemaps */}
      {style.tone === "light" || style.tone === "sepia" ? (
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              style.tone === "sepia"
                ? "linear-gradient(180deg, rgba(60, 30, 0, 0.10), rgba(40, 20, 0, 0.18))"
                : "linear-gradient(180deg, rgba(15, 18, 22, 0.18), rgba(15, 18, 22, 0.26))",
            mixBlendMode: "multiply",
          }}
        />
      ) : null}
      {/* Layers: rendered only after map.load */}
      {mapRef.current && (
        <>
          <MigrationArcs map={mapRef.current} mobile={mobile} visible={routesVisible} />
          <PortMarkers map={mapRef.current} mobile={mobile} />
          <EventMarkers map={mapRef.current} mobile={mobile} />
          {mobile ? <MobileMapCompass map={mapRef.current} /> : null}
        </>
      )}
    </div>
  );
}
