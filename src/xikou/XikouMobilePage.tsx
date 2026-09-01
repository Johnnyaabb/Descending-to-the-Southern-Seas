import { MigrationMobileExperience, type MigrationMobileConfig } from "../chineseMigration/MigrationMobileExperience";
import { MapView } from "./components/MapView";
import { EVENTS } from "./data/events";
import { cumulativeTotal } from "./data/flows";
import { PEOPLE } from "./data/people";
import { ALL_PORTS, DESTINATION_PORTS } from "./data/ports";
import { getPhaseByYear, TIMELINE_MAX, TIMELINE_MIN } from "./data/phases";
import { useTimelineStore } from "./store/useTimelineStore";

interface XikouMobilePageProps {
  mapStyleId: string;
  onMapStyleChange: (id: string) => void;
}

const XIKOU_CONFIG: MigrationMobileConfig = {
  activePath: "/zou-xikou",
  featuredEventId: "dingwu-famine",
  loadingLabel: "正在展开西口商路图…",
  destinationLabel: "口外节点",
  journeyVerb: "出关",
  routeNoun: "路线",
  mapZoom: 5.5,
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

export function XikouMobilePage({ mapStyleId, onMapStyleChange }: XikouMobilePageProps) {
  return (
    <MigrationMobileExperience
      config={XIKOU_CONFIG}
      mapStyleId={mapStyleId}
      onMapStyleChange={onMapStyleChange}
    />
  );
}
