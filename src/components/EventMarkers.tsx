import { useEffect, useRef } from "react";
import { EVENTS } from "../data/events";
import { useTimelineStore } from "../store/useTimelineStore";
import { maplibregl, mapboxgl, HAS_MAPBOX_TOKEN, type MapboxLike } from "../lib/mapInstance";

function MarkerCtor(): any {
  return HAS_MAPBOX_TOKEN ? mapboxgl.Marker : maplibregl.Marker;
}
function PopupCtor(): any {
  return HAS_MAPBOX_TOKEN ? mapboxgl.Popup : maplibregl.Popup;
}

interface Props {
  map: MapboxLike;
}

const categoryColor: Record<string, string> = {
  policy: "#b22222",
  war: "#9f1239",
  economic: "#c8a951",
  settlement: "#0e7490",
};

export function EventMarkers({ map }: Props) {
  const year = useTimelineStore((s) => s.year);
  const selectedId = useTimelineStore((s) => s.selectedEventId);
  const selectEvent = useTimelineStore((s) => s.selectEvent);
  const markerMap = useRef<Map<string, { marker: any; el: HTMLElement; popup: any }>>(new Map());
  /** Avoid sync selectEvent(null) when we remove popups programmatically while switching events */
  const suppressPopupCloseSync = useRef(false);

  const removeAllPopupsFromMap = () => {
    suppressPopupCloseSync.current = true;
    for (const { popup } of markerMap.current.values()) {
      popup.remove();
    }
    suppressPopupCloseSync.current = false;
  };

  useEffect(() => {
    const Marker = MarkerCtor();
    const Popup = PopupCtor();

    for (const ev of EVENTS) {
      const el = document.createElement("div");
      el.className = "cs-event-marker";
      el.style.cursor = "pointer";
      el.innerHTML = `
        <div style="
          width:18px; height:18px;
          border-radius:50%;
          background:${categoryColor[ev.category] ?? "#b22222"};
          border:2px solid #f5e6c8;
          box-shadow:0 0 0 3px rgba(178,34,34,0.2);
          transform: translate(-50%, -50%);
          display:flex; align-items:center; justify-content:center;
          font-size:10px; color:#f5e6c8; font-family:'Noto Serif SC',serif;
        ">${ev.year.toString().slice(-2)}</div>
      `;
      const popup = new Popup({ offset: 22, closeButton: true }).setHTML(
        `<div>
           <div style="display:flex; gap:6px; align-items:center; margin-bottom:6px;">
             <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${categoryColor[ev.category] ?? "#b22222"};"></span>
             <span style="font-family:'Noto Serif SC',serif; font-size:11px; color:#c8a951;">${ev.year}年 · ${ev.location}</span>
           </div>
           <div style="font-family:'Noto Serif SC',serif; font-size:16px; color:#f5e6c8; margin-bottom:6px;">${ev.title}</div>
           <div style="font-size:12px; line-height:1.55; color:#f5e6c8cc;">${ev.detail}</div>
           <div style="margin-top:8px; font-size:10px; color:#c8a95199; font-style:italic;">来源：${ev.source}</div>
         </div>`
      );
      popup.on("close", () => {
        if (suppressPopupCloseSync.current) return;
        const { selectedEventId, selectEvent: clear } = useTimelineStore.getState();
        if (selectedEventId === ev.id) clear(null);
      });
      const marker = new Marker({ element: el, anchor: "center" })
        .setLngLat(ev.coord)
        .setPopup(popup as any)
        .addTo(map as any);
      el.addEventListener("click", () => {
        selectEvent(ev.id);
        useTimelineStore.getState().setYear(ev.year);
        (map as any).flyTo({ center: ev.coord, zoom: Math.max(map.getZoom(), 4.4), speed: 0.8 });
      });
      markerMap.current.set(ev.id, { marker, el, popup });
    }
    return () => {
      removeAllPopupsFromMap();
      for (const { marker } of markerMap.current.values()) marker.remove();
      markerMap.current.clear();
    };
  }, [map, selectEvent]);

  // Exactly one map popup at a time: close others, then show the selection (if any)
  useEffect(() => {
    removeAllPopupsFromMap();
    if (!selectedId) return;
    const entry = markerMap.current.get(selectedId);
    const ev = EVENTS.find((e) => e.id === selectedId);
    if (!entry || !ev) return;
    entry.popup.setLngLat(ev.coord).addTo(map as any);
  }, [selectedId, map]);

  // Visually fade events outside the visible year range.
  useEffect(() => {
    for (const [id, entry] of markerMap.current.entries()) {
      const ev = EVENTS.find((e) => e.id === id);
      if (!ev) continue;
      const isPast = ev.year <= year;
      entry.el.style.opacity = isPast ? "1" : "0.38";
      entry.el.style.filter = ev.year === year ? "drop-shadow(0 0 8px rgba(245,230,200,0.6))" : "none";
    }
  }, [year]);

  return null;
}
