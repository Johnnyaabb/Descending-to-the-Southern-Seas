import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MAP_STYLES, type MapStyleOption } from "../../lib/mapStyles";

interface Props {
  currentId: string;
  onChange: (id: string) => void;
}

export function MapStyleSwitcher({ currentId, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const current: MapStyleOption =
    MAP_STYLES.find((s) => s.id === currentId) ?? MAP_STYLES[0];

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-auto relative"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="chip flex items-center gap-2 px-3 py-1.5 transition hover:border-oldgold/70 hover:text-oldgold"
        title="切换地图样式"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span
          className="inline-block h-2.5 w-2.5 rounded-full border border-black/30"
          style={{
            background: current.swatch,
            boxShadow: `0 0 6px ${current.swatch}88`,
          }}
        />
        <span className="font-display tracking-wider">{current.label}</span>
        <svg
          width="10"
          height="10"
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
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-30 mt-2 w-60 overflow-hidden rounded-lg border border-oldgold/30 bg-black/90 shadow-2xl shadow-black/60 backdrop-blur"
          >
            {MAP_STYLES.map((s) => {
              const selected = s.id === currentId;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      onChange(s.id);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 px-3 py-2 text-left transition ${
                      selected
                        ? "bg-chaored/25 text-oldgold"
                        : "text-ricepaper/85 hover:bg-oldgold/10 hover:text-ricepaper"
                    }`}
                  >
                    <span
                      className="inline-block h-3 w-3 shrink-0 rounded-full border border-black/40"
                      style={{
                        background: s.swatch,
                        boxShadow: `0 0 6px ${s.swatch}66`,
                      }}
                    />
                    <span className="flex-1">
                      <span className="block font-display text-[13px] tracking-wider">
                        {s.label}
                      </span>
                      <span className="block text-[10.5px] leading-tight text-ricepaper/50">
                        {s.tagline}
                      </span>
                    </span>
                    {selected && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M9 16.2l-3.5-3.6L4 14.1l5 5 11-11-1.4-1.4z" />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
