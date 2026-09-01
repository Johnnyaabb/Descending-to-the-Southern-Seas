import { useEffect, useRef } from "react";
import { useTimelineStore } from "../store/useTimelineStore";
import { DESTINATION_PORTS, ORIGIN_PORTS, type Port } from "../data/ports";
import { cumulativeAtDestination } from "../data/flows";
import { maplibregl, mapboxgl, HAS_MAPBOX_TOKEN, type MapboxLike } from "../../lib/mapInstance";

interface Props {
  map: MapboxLike;
  mobile?: boolean;
}

interface MarkerEntry {
  port: Port;
  marker: any;
  el: HTMLElement;
}

function MarkerCtor(): any {
  return HAS_MAPBOX_TOKEN ? mapboxgl.Marker : maplibregl.Marker;
}
function PopupCtor(): any {
  return HAS_MAPBOX_TOKEN ? mapboxgl.Popup : maplibregl.Popup;
}

const ALWAYS_LABELED_ORIGINS = new Set(["taiyuan", "datong"]);

function markerLabel(port: Port, mobile: boolean) {
  return mobile ? port.name.split(/[（·]/)[0].trim() : port.name;
}

function createOriginEl(port: Port, mobile: boolean): HTMLElement {
  const el = document.createElement("div");
  el.className = "cs-origin-marker";
  const showLabel = ALWAYS_LABELED_ORIGINS.has(port.id);
  const size = port.id === "taiyuan" || port.id === "datong" ? 30 : 18;
  el.innerHTML = `
    <div class="relative flex flex-col items-center" style="transform: translateY(-50%);">
      <svg width="${size}" height="${size}" viewBox="0 0 64 64" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.6));">
        <rect x="10" y="28" width="44" height="18" rx="2" fill="#5c3d1f" stroke="#1a0c04" stroke-width="1.2"/>
        <circle cx="18" cy="46" r="4" fill="#2a1a0f" stroke="#1a0c04" stroke-width="0.8"/>
        <circle cx="32" cy="46" r="4" fill="#2a1a0f" stroke="#1a0c04" stroke-width="0.8"/>
        <circle cx="46" cy="46" r="4" fill="#2a1a0f" stroke="#1a0c04" stroke-width="0.8"/>
        <path d="M14 28 Q32 8 50 28" fill="none" stroke="#6b7280" stroke-width="2.5" stroke-linecap="round"/>
        <rect x="26" y="14" width="12" height="10" rx="1" fill="#b22222" stroke="#3a0a0a" stroke-width="0.9"/>
      </svg>
      ${showLabel ? `<div style="margin-top:2px; padding:1px 6px; border-radius:3px; background:rgba(92,111,74,0.95); color:#f5e6c8; font-size:10px; font-family:'Noto Serif SC',serif; white-space:nowrap; box-shadow:0 1px 3px rgba(0,0,0,0.6);">${markerLabel(port, mobile)}</div>` : ""}
    </div>
  `;
  return el;
}

function createDestinationEl(port: Port, mobile: boolean): HTMLElement {
  const el = document.createElement("div");
  el.className = "cs-dest-marker";
  el.innerHTML = `
    <div class="relative" style="transform: translate(-50%, -50%);">
      <div class="cs-ring" style="
        width: 16px; height: 16px;
        border-radius:50%;
        background: radial-gradient(circle at 50% 50%, rgba(245,230,200,0.95), rgba(178,34,34,0.85) 65%, rgba(178,34,34,0) 80%);
        box-shadow: 0 0 0 1px rgba(245,230,200,0.5);
      "></div>
      <div style="
        position:absolute; left: 14px; top:-2px;
        padding:1px 6px; border-radius:3px;
        background:rgba(20,12,8,0.78);
        color:#f5e6c8; font-size:10px; font-family:'Noto Serif SC',serif;
        white-space:nowrap; box-shadow:0 1px 3px rgba(0,0,0,0.6);
      ">${markerLabel(port, mobile)}</div>
    </div>
  `;
  return el;
}

export function PortMarkers({ map, mobile = false }: Props) {
  const markers = useRef<MarkerEntry[]>([]);
  const year = useTimelineStore((s) => s.year);

  // Build markers once.
  useEffect(() => {
    const Marker = MarkerCtor();
    const Popup = PopupCtor();

    // Origin
    for (const port of ORIGIN_PORTS) {
      const el = createOriginEl(port, mobile);
      const marker = new Marker({ element: el, anchor: "bottom" })
        .setLngLat(port.coord)
        .setPopup(
          new Popup({ offset: 18, closeButton: false }).setHTML(
            `<div>
               <div style="font-family:'Noto Serif SC',serif; font-size:15px; color:#f5e6c8; margin-bottom:4px;">
                 <span style="color:#b22222;">●</span> ${port.name} <span style="font-size:11px; opacity:0.7;">(${port.nameEn})</span>
               </div>
               <div style="font-size:12px; color:#c8a951; margin-bottom:6px;">${port.country}${port.established ? ` · ${port.established}` : ""}</div>
               <div style="font-size:12px; line-height:1.5; color:#f5e6c8cc;">${port.description}</div>
               <div style="margin-top:6px; font-size:10px; color:#c8a95199; font-style:italic;">来源：${port.source}</div>
             </div>`
          )
        )
        .addTo(map as any);
      markers.current.push({ port, marker, el });
    }

    // Destination
    for (const port of DESTINATION_PORTS) {
      const el = createDestinationEl(port, mobile);
      const marker = new Marker({ element: el, anchor: "center" })
        .setLngLat(port.coord)
        .addTo(map as any);
      markers.current.push({ port, marker, el });

      // Hover popup whose contents we'll regenerate on demand
      el.addEventListener("mouseenter", () => {
        const cum = cumulativeAtDestination(port.id, useTimelineStore.getState().year);
        const popup = new Popup({ offset: 18, closeButton: false, anchor: "left" })
          .setLngLat(port.coord)
          .setHTML(
            `<div>
               <div style="font-family:'Noto Serif SC',serif; font-size:15px; color:#f5e6c8; margin-bottom:4px;">
                 <span style="color:#c8a951;">◆</span> ${port.name} <span style="font-size:11px; opacity:0.7;">(${port.nameEn})</span>
               </div>
               <div style="font-size:12px; color:#c8a951; margin-bottom:6px;">${port.country}${port.established ? ` · 节点 ${port.established}` : ""}</div>
               <div style="font-size:12px; line-height:1.5; color:#f5e6c8cc;">${port.description}</div>
               <div style="margin-top:8px; padding:6px 8px; background:rgba(178,34,34,0.18); border-radius:4px;">
                 <div style="font-size:10px; color:#c8a951; margin-bottom:2px;">截至 ${useTimelineStore.getState().year} 年累计抵达</div>
                 <div style="font-size:18px; font-family:'Noto Serif SC',serif; color:#f5e6c8;">${formatNumber(cum)} <span style="font-size:11px; opacity:0.7;">人次</span></div>
               </div>
               <div style="margin-top:6px; font-size:10px; color:#c8a95199; font-style:italic;">来源：${port.source}</div>
             </div>`
          )
          .addTo(map as any);
        const remove = () => {
          popup.remove();
          el.removeEventListener("mouseleave", remove);
        };
        el.addEventListener("mouseleave", remove);
      });
    }

    return () => {
      for (const m of markers.current) m.marker.remove();
      markers.current = [];
    };
  }, [map, mobile]);

  // Resize destination rings based on cumulative count per year.
  useEffect(() => {
    for (const entry of markers.current) {
      if (entry.port.kind !== "destination") continue;
      const ring = entry.el.querySelector(".cs-ring") as HTMLDivElement | null;
      if (!ring) continue;
      const cum = cumulativeAtDestination(entry.port.id, year);
      // log-scale: dest with 5M cum shows ~36px, dest with 50k cum shows ~14px
      const size = cum > 0 ? Math.min(38, 8 + Math.log10(cum + 10) * 4.6) : 6;
      ring.style.width = `${size}px`;
      ring.style.height = `${size}px`;
      ring.style.opacity = cum > 0 ? "1" : "0.3";
    }
  }, [year]);

  return null;
}

function formatNumber(n: number): string {
  if (n >= 10_000) return `${(n / 10_000).toFixed(n >= 100_000 ? 0 : 1)} 万`;
  return n.toLocaleString();
}
