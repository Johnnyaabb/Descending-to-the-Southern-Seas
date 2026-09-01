export type EpicId = "iliad" | "odyssey";
export type EvidenceLevel = "confirmed" | "textual" | "traditional" | "mythic";
export type PersonKind = "mortal" | "deity" | "creature" | "shade";
export type Faction = "achaean" | "trojan" | "ithacan" | "divine" | "other";

export interface HomerPhase {
  id: string;
  epic: EpicId;
  bookStart: number;
  bookEnd: number;
  title: string;
  subtitle: string;
  color: string;
  narrative: string;
  highlights: string[];
  sourceIds: string[];
}

export interface HomerPlace {
  id: string;
  name: string;
  nameGreek?: string;
  modernName?: string;
  coord: [number, number];
  evidence: EvidenceLevel;
  epic: "both" | EpicId;
  description: string;
  sourceIds: string[];
}

export interface HomerPerson {
  id: string;
  name: string;
  nameEn: string;
  epithet: string;
  kind: PersonKind;
  faction: Faction;
  homePlaceId?: string;
  relatedIds: string[];
  description: string;
  sourceIds: string[];
}

export interface HomerEpisode {
  id: string;
  epic: EpicId;
  book: number;
  lines: string;
  storyOrder: number;
  title: string;
  summary: string;
  placeId?: string;
  personIds: string[];
  themes: string[];
  evidence: EvidenceLevel;
  sourceIds: string[];
}

export type RouteKind = "expedition" | "voyage" | "battle" | "telemachy";

export interface HomerRoute {
  id: string;
  epic: EpicId;
  fromId: string;
  toId: string;
  book: number;
  storyOrder: number;
  kind: RouteKind;
  evidence: EvidenceLevel;
  label: string;
  metric?: number;
  waypoints?: Array<[number, number]>;
  sourceIds: string[];
}

export interface ContextMilestone {
  id: string;
  dateLabel: string;
  title: string;
  description: string;
  sourceIds: string[];
}

