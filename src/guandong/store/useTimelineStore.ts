import { create } from "zustand";
import { TIMELINE_MAX, TIMELINE_MIN } from "../data/phases";

export type PlaySpeed = 1 | 2 | 5;

interface TimelineState {
  year: number;
  playing: boolean;
  speed: PlaySpeed;
  selectedEventId: string | null;
  selectedPersonId: string | null;

  setYear: (y: number) => void;
  step: (delta: number) => void;
  togglePlay: () => void;
  setPlaying: (p: boolean) => void;
  setSpeed: (s: PlaySpeed) => void;
  selectEvent: (id: string | null) => void;
  selectPerson: (id: string | null) => void;
  reset: () => void;
}

const clamp = (n: number) => Math.max(TIMELINE_MIN, Math.min(TIMELINE_MAX, Math.round(n)));

export const useTimelineStore = create<TimelineState>((set, get) => ({
  year: TIMELINE_MIN,
  playing: false,
  speed: 1,
  selectedEventId: null,
  selectedPersonId: null,

  setYear: (y) => set({ year: clamp(y) }),
  step: (delta) => {
    const next = clamp(get().year + delta);
    if (next === TIMELINE_MAX) {
      set({ year: next, playing: false });
    } else {
      set({ year: next });
    }
  },
  togglePlay: () => {
    const { playing, year } = get();
    if (!playing && year >= TIMELINE_MAX) {
      set({ year: TIMELINE_MIN, playing: true });
    } else {
      set({ playing: !playing });
    }
  },
  setPlaying: (p) => set({ playing: p }),
  setSpeed: (s) => set({ speed: s }),
  selectEvent: (id) => set({ selectedEventId: id }),
  selectPerson: (id) => set({ selectedPersonId: id }),
  reset: () =>
    set({
      year: TIMELINE_MIN,
      playing: false,
      speed: 1,
      selectedEventId: null,
      selectedPersonId: null,
    }),
}));

/**
 * Hook 调用：在 App 挂载时启动 requestAnimationFrame 驱动播放循环
 */
export function usePlaybackEngine() {
  return null;
}
