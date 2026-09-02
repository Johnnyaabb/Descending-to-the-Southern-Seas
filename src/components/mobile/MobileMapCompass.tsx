import { useEffect, useState } from "react";
import type { MapboxLike } from "../../lib/mapInstance";

interface MobileMapCompassProps {
  map: MapboxLike;
}

function normalizedBearing(value: number) {
  return ((value + 180) % 360 + 360) % 360 - 180;
}

export function MobileMapCompass({ map }: MobileMapCompassProps) {
  const [bearing, setBearing] = useState(() => normalizedBearing(map.getBearing?.() ?? 0));

  useEffect(() => {
    const updateBearing = () => setBearing(normalizedBearing(map.getBearing?.() ?? 0));
    updateBearing();
    map.on?.("rotate", updateBearing);
    map.on?.("moveend", updateBearing);
    return () => {
      map.off?.("rotate", updateBearing);
      map.off?.("moveend", updateBearing);
    };
  }, [map]);

  const northAligned = Math.abs(bearing) < 0.5;

  return (
    <button
      type="button"
      className="mobile-map-compass"
      data-aligned={northAligned ? "true" : "false"}
      aria-label={northAligned ? "地图已正北向上" : `地图偏转 ${Math.round(bearing)} 度，点击恢复正北向上`}
      onClick={() => map.easeTo?.({ bearing: 0, duration: 520, essential: true })}
    >
      <span className="mobile-map-compass__rotor" style={{ transform: `rotate(${-bearing}deg)` }} aria-hidden="true">
        <span className="mobile-map-compass__north">北</span>
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M12 3 17.5 13 12 10.7 6.5 13 12 3Z" className="mobile-map-compass__needle-north" />
          <path d="m12 21-5.5-10L12 13.3l5.5-2.3L12 21Z" className="mobile-map-compass__needle-south" />
        </svg>
      </span>
    </button>
  );
}
