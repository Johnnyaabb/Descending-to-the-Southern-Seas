import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MAP_STYLES, type MapStyleOption } from "../../lib/mapStyles";

interface HomerMapStyleSwitcherProps {
  currentId: string;
  onChange: (id: string) => void;
  labelsVisible: boolean;
  onLabelsVisibleChange: (visible: boolean) => void;
}

export function HomerMapStyleSwitcher({
  currentId,
  onChange,
  labelsVisible,
  onLabelsVisibleChange,
}: HomerMapStyleSwitcherProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const current: MapStyleOption = MAP_STYLES.find((style) => style.id === currentId) ?? MAP_STYLES[0];

  useEffect(() => {
    if (!open) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("mousedown", closeOnOutsideClick);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("mousedown", closeOnOutsideClick);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="pointer-events-auto relative">
      <button
        type="button"
        aria-label={`切换地图风格，当前为${current.label}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        title={`地图风格：${current.label}`}
        onClick={() => setOpen((value) => !value)}
        className="flex h-[30px] items-center gap-1.5 rounded-md border border-[#70c9c4]/22 bg-[#07131d]/55 px-2 text-[9px] tracking-wide text-[#9ddbd7]/72 transition hover:border-[#70c9c4]/50 hover:bg-[#70c9c4]/8 hover:text-[#b8f1ed] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70c9c4]"
      >
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full border border-white/20"
          style={{ background: current.swatch, boxShadow: `0 0 7px ${current.swatch}88` }}
        />
        <span className="hidden whitespace-nowrap xl:inline">{current.label}</span>
        <svg
          aria-hidden="true"
          width="9"
          height="9"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label="地图风格"
            initial={{ opacity: 0, y: -5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.98 }}
            transition={{ duration: 0.14 }}
            className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-[#70c9c4]/24 bg-[#061019]/95 p-1.5 shadow-2xl shadow-black/65 backdrop-blur-xl sm:w-64"
          >
            <li className="px-2 pb-1.5 pt-1 text-[8px] uppercase tracking-[0.2em] text-[#70c9c4]/45">
              Basemap · 地图风格
            </li>
            {MAP_STYLES.map((style) => {
              const selected = style.id === currentId;
              return (
                <li key={style.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      onChange(style.id);
                      setOpen(false);
                    }}
                    className={`group flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#70c9c4] ${
                      selected
                        ? "bg-[#70c9c4]/12 text-[#c8f0ed]"
                        : "text-[#f2e5ce]/68 hover:bg-white/6 hover:text-[#f2e5ce]"
                    }`}
                  >
                    <span
                      className="h-3.5 w-3.5 shrink-0 rounded-full border border-white/18"
                      style={{ background: style.swatch, boxShadow: `0 0 8px ${style.swatch}66` }}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-[11px] tracking-[0.12em]">{style.label}</span>
                      <span className="mt-0.5 hidden truncate text-[9px] text-[#f2e5ce]/35 sm:block">{style.tagline}</span>
                    </span>
                    <span className={`text-xs text-[#70c9c4] transition-opacity ${selected ? "opacity-100" : "opacity-0"}`} aria-hidden="true">
                      ✓
                    </span>
                  </button>
                </li>
              );
            })}
            <li className="mt-1 border-t border-white/8 pt-1">
              <button
                type="button"
                role="switch"
                aria-checked={labelsVisible}
                onClick={() => onLabelsVisibleChange(!labelsVisible)}
                className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-[#f2e5ce]/68 transition hover:bg-white/6 hover:text-[#f2e5ce] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#70c9c4]"
              >
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[11px] tracking-[0.12em]">中文地理标注</span>
                  <span className="mt-0.5 hidden text-[9px] text-[#f2e5ce]/35 sm:block">海域与现实区域名称</span>
                </span>
                <span
                  aria-hidden="true"
                  className={`relative h-4 w-7 shrink-0 rounded-full border transition ${
                    labelsVisible ? "border-[#70c9c4]/55 bg-[#2f8e91]/45" : "border-white/15 bg-white/5"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-2.5 w-2.5 rounded-full transition-transform ${
                      labelsVisible ? "translate-x-3 bg-[#b8f1ed]" : "translate-x-0.5 bg-white/35"
                    }`}
                  />
                </span>
              </button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
