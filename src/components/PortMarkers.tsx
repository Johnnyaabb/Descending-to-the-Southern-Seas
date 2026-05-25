import { useEffect, useRef } from "react";
import { useTimelineStore } from "../store/useTimelineStore";
import { DESTINATION_PORTS, ORIGIN_PORTS, type Port } from "../data/ports";
import { cumulativeAtDestination } from "../data/flows";
import { maplibregl, mapboxgl, HAS_MAPBOX_TOKEN, type MapboxLike } from "../lib/mapInstance";

interface Props {
  map: MapboxLike;
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

const ALWAYS_LABELED_ORIGINS = new Set(["shanhaiguan", "yantai"]);

function createOriginEl(port: Port): HTMLElement {
  const el = document.createElement("div");
  el.className = "cs-origin-marker";
  const showLabel = ALWAYS_LABELED_ORIGINS.has(port.id);
  const size = port.id === "shanhaiguan" || port.id === "yantai" ? 30 : 18;
  el.innerHTML = `
    <div class="relative flex flex-col items-center" style="transform: translateY(-50%);">
      <svg width="${size}" height="${size}" viewBox="0 0 64 64" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.6));">
        <path d="M6 42h52l-6 12H12L6 42z" fill="#1e3a8a"/>
        <path d="M10 40h44l-2-6H12l-2 6z" fill="#b22222"/>
        <rect x="30" y="10" width="4" height="26" fill="#3b2f1f"/>
        <path d="M34 12l16 8-16 6V12z" fill="#f5e6c8"/>
        <path d="M30 14l-12 6 12 4V14z" fill="#f5e6c8"/>
      </svg>
      ${showLabel ? `<div style="margin-top:2px; padding:1px 6px; border-radius:3px; background:rgba(178,34,34,0.92); color:#f5e6c8; font-size:10px; font-family:'Noto Serif SC',serif; white-space:nowrap; box-shadow:0 1px 3px rgba(0,0,0,0.6);">${port.name}</div>` : ""}
    </div>
  `;
  return el;
}

function createDestinationEl(port: Port): HTMLElement {
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
      ">${port.name}</div>
    </div>
  `;
  return el;
}

export function PortMarkers({ map }: Props) {
  const markers = useRef<MarkerEntry[]>([]);
  const year = useTimelineStore((s) => s.year);

  // Build markers once.
  useEffect(() => {
    const Marker = MarkerCtor();
    const Popup = PopupCtor();

    // Origin
    for (const port of ORIGIN_PORTS) {
      const el = createOriginEl(port);
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
      const el = createDestinationEl(port);
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
               <div style="font-size:12px; color:#c8a951; margin-bottom:6px;">${port.country}${port.established ? ` · 设港 ${port.established}` : ""}</div>
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
  }, [map]);

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
