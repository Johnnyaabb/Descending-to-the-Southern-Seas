import { create } from "zustand";
import { EPISODE_BY_ID, episodesForEpic, type EpicId } from "./data";

export type HomerOrderMode = "reading" | "story";

interface HomerState {
  epic: EpicId;
  orderMode: HomerOrderMode;
  book: number;
  storyStep: number;
  selectedEpisodeId: string;
  selectedPersonId: string | null;
  selectedPlaceId: string | null;
  playing: boolean;
  setEpic: (epic: EpicId) => void;
  setOrderMode: (mode: HomerOrderMode) => void;
  setBook: (book: number) => void;
  setStoryStep: (step: number) => void;
  selectEpisode: (episodeId: string) => void;
  selectPerson: (personId: string | null) => void;
  selectPlace: (placeId: string | null) => void;
  togglePlaying: () => void;
  step: (delta: number) => void;
  reset: () => void;
}

function storyEpisodes(epic: EpicId) {
  return [...episodesForEpic(epic)].sort((a, b) => a.storyOrder - b.storyOrder);
}

function episodeForReadingPosition(epic: EpicId, book: number) {
  const episodes = [...episodesForEpic(epic)].sort((a, b) => a.book - b.book);
  const exact = episodes.find((episode) => episode.book === book);
  if (exact) return exact;
  return [...episodes].reverse().find((episode) => episode.book < book) ?? episodes[0];
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

const firstEpisode = episodesForEpic("iliad")[0];

export const useHomerStore = create<HomerState>((set, get) => ({
  epic: "iliad",
  orderMode: "reading",
  book: 1,
  storyStep: 1,
  selectedEpisodeId: firstEpisode.id,
  selectedPersonId: firstEpisode.personIds[0] ?? null,
  selectedPlaceId: firstEpisode.placeId ?? null,
  playing: false,
  setEpic: (epic) => {
    const orderMode = get().orderMode;
    const first = orderMode === "story" ? storyEpisodes(epic)[0] : episodeForReadingPosition(epic, 1);
    set({
      epic,
      book: orderMode === "reading" ? 1 : first.book,
      storyStep: 1,
      selectedEpisodeId: first.id,
      selectedPersonId: first.personIds[0] ?? null,
      selectedPlaceId: first.placeId ?? null,
      playing: false,
    });
  },
  setOrderMode: (orderMode) => {
    const { epic, book, selectedEpisodeId } = get();
    const ordered = storyEpisodes(epic);
    const selectedIndex = ordered.findIndex((episode) => episode.id === selectedEpisodeId);
    const nearest = episodeForReadingPosition(epic, book);
    const nearestIndex = ordered.findIndex((episode) => episode.id === nearest.id);
    set({
      orderMode,
      storyStep: Math.max(1, (selectedIndex >= 0 ? selectedIndex : nearestIndex) + 1),
      book: orderMode === "reading" ? nearest.book : book,
      playing: false,
    });
  },
  setBook: (book) => {
    const epic = get().epic;
    const nextBook = clamp(Math.round(book), 1, 24);
    const episode = episodeForReadingPosition(epic, nextBook);
    const ordered = storyEpisodes(epic);
    const storyStep = ordered.findIndex((item) => item.id === episode.id) + 1;
    set({
      book: nextBook,
      storyStep: Math.max(1, storyStep),
      selectedEpisodeId: episode.id,
      selectedPersonId: episode.personIds[0] ?? null,
      selectedPlaceId: episode.placeId ?? null,
    });
  },
  setStoryStep: (step) => {
    const epic = get().epic;
    const ordered = storyEpisodes(epic);
    const nextStep = clamp(Math.round(step), 1, ordered.length);
    const episode = ordered[nextStep - 1];
    set({
      storyStep: nextStep,
      book: episode.book,
      selectedEpisodeId: episode.id,
      selectedPersonId: episode.personIds[0] ?? null,
      selectedPlaceId: episode.placeId ?? null,
    });
  },
  selectEpisode: (episodeId) => {
    const episode = EPISODE_BY_ID.get(episodeId);
    if (!episode || episode.epic !== get().epic) return;
    const ordered = storyEpisodes(episode.epic);
    const storyStep = ordered.findIndex((item) => item.id === episodeId) + 1;
    set({
      book: episode.book,
      storyStep: Math.max(1, storyStep),
      selectedEpisodeId: episode.id,
      selectedPersonId: episode.personIds[0] ?? null,
      selectedPlaceId: episode.placeId ?? null,
      playing: false,
    });
  },
  selectPerson: (selectedPersonId) => set({ selectedPersonId }),
  selectPlace: (selectedPlaceId) => set({ selectedPlaceId }),
  togglePlaying: () => set((state) => ({ playing: !state.playing })),
  step: (delta) => {
    const { orderMode, book, storyStep, epic } = get();
    if (orderMode === "reading") {
      const next = book + delta;
      if (next > 24) {
        set({ playing: false });
        return;
      }
      get().setBook(next);
      return;
    }
    const max = storyEpisodes(epic).length;
    const next = storyStep + delta;
    if (next > max) {
      set({ playing: false });
      return;
    }
    get().setStoryStep(next);
  },
  reset: () => {
    const { epic, orderMode } = get();
    const first = orderMode === "story" ? storyEpisodes(epic)[0] : episodeForReadingPosition(epic, 1);
    set({
      book: orderMode === "reading" ? 1 : first.book,
      storyStep: 1,
      selectedEpisodeId: first.id,
      selectedPersonId: first.personIds[0] ?? null,
      selectedPlaceId: first.placeId ?? null,
      playing: false,
    });
  },
}));
