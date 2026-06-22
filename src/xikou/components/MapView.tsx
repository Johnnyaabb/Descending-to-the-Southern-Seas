import { useEffect, useRef, useState } from "react";
import { createMap, HAS_MAPBOX_TOKEN, type MapboxLike } from "../../lib/mapInstance";
import { notifyMigrationOverlayRestore } from "../../lib/migrationOverlayBus";
import { MigrationArcs } from "./MigrationArcs";
import { PortMarkers } from "./PortMarkers";
import { EventMarkers } from "./EventMarkers";
import { getStyleById } from "../../lib/mapStyles";

interface Props {
  onMapReady?: (map: MapboxLike) => void;
  styleId: string;
}

export function MapView({ onMapReady, styleId }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapboxLike | null>(null);
  const [, force] = useState(0); // re-render after map is ready so children can use it

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const { map } = createMap({
      container: containerRef.current,
      center: [111.2, 41],
      zoom: 4.6,
      bearing: 0,
      pitch: 0,
    });
    mapRef.current = map;

    const fitToScope = () => {
      // 晋陕冀—漠南—河套走廊
      (map as any).fitBounds(
        [
          [96, 36],
          [119.5, 44.5],
        ],
        { padding: { top: 60, right: 360, bottom: 180, left: 360 }, duration: 0 }
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
  }, [onMapReady]);

  // Swap basemap style when the user picks a new one. `setStyle` clears any
  // sources/layers added by children, and that effect can run *after* child
  // mount — so we explicitly notify MigrationArcs to rebuild (see migrationOverlayBus).
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (HAS_MAPBOX_TOKEN) return; // when using a Mapbox token, that style wins
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
    <div className="relative h-full w-full">
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
          <MigrationArcs map={mapRef.current} />
          <PortMarkers map={mapRef.current} />
          <EventMarkers map={mapRef.current} />
        </>
      )}
    </div>
  );
}
