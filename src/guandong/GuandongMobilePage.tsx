import { MigrationMobileExperience, type MigrationMobileConfig } from "../chineseMigration/MigrationMobileExperience";
import { MapView } from "./components/MapView";
import { EVENTS } from "./data/events";
import { cumulativeTotal } from "./data/flows";
import { PEOPLE } from "./data/people";
import { ALL_PORTS, DESTINATION_PORTS } from "./data/ports";
import { getPhaseByYear, TIMELINE_MAX, TIMELINE_MIN } from "./data/phases";
import { useTimelineStore } from "./store/useTimelineStore";

interface GuandongMobilePageProps {
  mapStyleId: string;
  onMapStyleChange: (id: string) => void;
}

const GUANDONG_CONFIG: MigrationMobileConfig = {
  activePath: "/chuang-guandong",
  featuredEventId: "russo-japanese-war-mukden",
  loadingLabel: "正在展开关东迁徙图…",
  destinationLabel: "关东节点",
  journeyVerb: "北上",
  routeNoun: "路线",
  mapZoom: 5.2,
  events: [...EVENTS].sort((a, b) => a.year - b.year),
  people: PEOPLE,
  ports: ALL_PORTS,
  destinationPorts: DESTINATION_PORTS,
  timelineMin: TIMELINE_MIN,
  timelineMax: TIMELINE_MAX,
  cumulativeTotal,
  getPhaseByYear,
  useTimelineStore,
  MapComponent: MapView,
};

export function GuandongMobilePage({ mapStyleId, onMapStyleChange }: GuandongMobilePageProps) {
  return (
    <MigrationMobileExperience
      config={GUANDONG_CONFIG}
      mapStyleId={mapStyleId}
      onMapStyleChange={onMapStyleChange}
    />
  );
}
