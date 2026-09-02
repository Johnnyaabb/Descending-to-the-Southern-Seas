import { useCallback, useEffect, useRef, useState, type ComponentType } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "@phosphor-icons/react/ArrowLeft";
import { BookOpenText } from "@phosphor-icons/react/BookOpenText";
import { CaretLeft } from "@phosphor-icons/react/CaretLeft";
import { CaretRight } from "@phosphor-icons/react/CaretRight";
import { ClockCounterClockwise } from "@phosphor-icons/react/ClockCounterClockwise";
import { DotsThree } from "@phosphor-icons/react/DotsThree";
import { Eye } from "@phosphor-icons/react/Eye";
import { EyeSlash } from "@phosphor-icons/react/EyeSlash";
import { MapTrifold } from "@phosphor-icons/react/MapTrifold";
import { UserCircle } from "@phosphor-icons/react/UserCircle";
import { UserFocus } from "@phosphor-icons/react/UserFocus";
import { UsersThree } from "@phosphor-icons/react/UsersThree";
import { Link } from "react-router-dom";
import type { MapboxLike } from "../lib/mapInstance";
import { MAP_STYLES } from "../lib/mapStyles";

type MobileSection = "map" | "timeline" | "people";
type EventCategory = "policy" | "war" | "economic" | "settlement";

export interface MobileHistoricalEvent {
  id: string;
  year: number;
  title: string;
  location: string;
  coord: [number, number];
  summary: string;
  detail: string;
  source: string;
  category: EventCategory;
}

export interface MobileNotablePerson {
  id: string;
  name: string;
  nameEn: string;
  yearBorn: number;
  yearDied: number;
  destinationId: string;
  emigrateYear: number;
  title: string;
  story: string;
  source: string;
}

export interface MobileMigrationPort {
  id: string;
  coord: [number, number];
}

export interface MobileMigrationPhase {
  title: string;
  highlights: string[];
}

interface MobileTimelineState {
  year: number;
  selectedEventId: string | null;
  selectedPersonId: string | null;
  setYear: (year: number) => void;
  setPlaying: (playing: boolean) => void;
  selectEvent: (id: string | null) => void;
  selectPerson: (id: string | null) => void;
}

type MobileTimelineStore = {
  <T>(selector: (state: MobileTimelineState) => T): T;
  getState: () => MobileTimelineState;
};

interface MobileMapProps {
  onMapReady?: (map: MapboxLike) => void;
  styleId: string;
  mobile?: boolean;
  routesVisible?: boolean;
}

export interface MigrationMobileConfig {
  activePath: "/nanyang" | "/chuang-guandong" | "/zou-xikou";
  featuredEventId: string;
  loadingLabel: string;
  destinationLabel: string;
  journeyVerb: string;
  routeNoun: string;
  mapZoom: number;
  events: MobileHistoricalEvent[];
  people: MobileNotablePerson[];
  ports: MobileMigrationPort[];
  destinationPorts: MobileMigrationPort[];
  timelineMin: number;
  timelineMax: number;
  cumulativeTotal: (year: number) => number;
  getPhaseByYear: (year: number) => MobileMigrationPhase;
  useTimelineStore: MobileTimelineStore;
  MapComponent: ComponentType<MobileMapProps>;
}

interface MigrationMobileExperienceProps {
  config: MigrationMobileConfig;
  mapStyleId: string;
  onMapStyleChange: (id: string) => void;
}

const THEMES = [
  { path: "/nanyang", label: "下南洋" },
  { path: "/chuang-guandong", label: "闯关东" },
  { path: "/zou-xikou", label: "走西口" },
] as const;

const EVENT_CATEGORY: Record<EventCategory, { label: string; color: string }> = {
  policy: { label: "制度变迁", color: "#d86756" },
  war: { label: "战争与灾难", color: "#d0839b" },
  economic: { label: "经济变动", color: "#d8b46a" },
  settlement: { label: "聚落形成", color: "#78d0ca" },
};

const NAV_ITEMS: Array<{ id: MobileSection; label: string; Icon: typeof MapTrifold }> = [
  { id: "map", label: "地图", Icon: MapTrifold },
  { id: "timeline", label: "时间", Icon: ClockCounterClockwise },
  { id: "people", label: "人物", Icon: UsersThree },
];

function formatCount(value: number) {
  if (value >= 10_000) return `${(value / 10_000).toFixed(value >= 1_000_000 ? 0 : 1)} 万`;
  return value.toLocaleString("zh-CN");
}

function ThemeSwitch({ activePath }: { activePath: MigrationMobileConfig["activePath"] }) {
  return (
    <nav className="migration-mobile-theme-switch" aria-label="选择迁徙主题">
      {THEMES.map((theme) => (
        <Link key={theme.path} to={theme.path} aria-current={theme.path === activePath ? "page" : undefined}>
          {theme.label}
        </Link>
      ))}
    </nav>
  );
}

function MobileHeader({ activePath, onMenuOpen }: { activePath: MigrationMobileConfig["activePath"]; onMenuOpen: () => void }) {
  return (
    <header className="migration-mobile-header">
      <Link to="/" aria-label="返回主页" className="migration-mobile-icon-button">
        <ArrowLeft aria-hidden="true" size={22} weight="bold" />
      </Link>
      <h1>华人迁徙</h1>
      <ThemeSwitch activePath={activePath} />
      <button type="button" aria-label="打开更多设置" className="migration-mobile-icon-button" onClick={onMenuOpen}>
        <DotsThree aria-hidden="true" size={24} weight="bold" />
      </button>
    </header>
  );
}

function MobileMenu({
  open,
  onClose,
  mapStyleId,
  onMapStyleChange,
  onShowTimeline,
  timelineMin,
  timelineMax,
}: {
  open: boolean;
  onClose: () => void;
  mapStyleId: string;
  onMapStyleChange: (id: string) => void;
  onShowTimeline: () => void;
  timelineMin: number;
  timelineMax: number;
}) {
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose, open]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[70]">
          <motion.button
            type="button"
            aria-label="关闭更多设置"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#03070b]/70 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="地图与资料设置"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="migration-mobile-menu"
          >
            <div className="migration-mobile-menu__title">地图风格</div>
            <div className="grid grid-cols-2 gap-2">
              {MAP_STYLES.map((style) => (
                <button
                  key={style.id}
                  type="button"
                  aria-pressed={style.id === mapStyleId}
                  className="migration-mobile-menu__style"
                  onClick={() => {
                    onMapStyleChange(style.id);
                    onClose();
                  }}
                >
                  <MapTrifold aria-hidden="true" size={18} weight={style.id === mapStyleId ? "fill" : "regular"} />
                  <span>{style.label}</span>
                </button>
              ))}
            </div>
            <div className="mt-3 border-t border-white/10 pt-2">
              <button
                type="button"
                className="migration-mobile-menu__row"
                onClick={() => {
                  onClose();
                  onShowTimeline();
                }}
              >
                <ClockCounterClockwise aria-hidden="true" size={20} />
                <span>史料与事件年表</span>
                <CaretRight aria-hidden="true" size={17} />
              </button>
              <div className="migration-mobile-menu__range">
                <span>历史范围</span>
                <strong>{timelineMin}–{timelineMax}</strong>
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

function RouteToggle({
  visible,
  routeNoun,
  onChange,
}: {
  visible: boolean;
  routeNoun: string;
  onChange: (visible: boolean) => void;
}) {
  return (
    <button type="button" className="migration-mobile-route-toggle" aria-pressed={visible} onClick={() => onChange(!visible)}>
      {visible ? <Eye aria-hidden="true" size={18} /> : <EyeSlash aria-hidden="true" size={18} />}
      {visible ? `隐藏${routeNoun}` : `显示${routeNoun}`}
    </button>
  );
}

function EventCarousel({ config, onRead }: { config: MigrationMobileConfig; onRead: () => void }) {
  const useStore = config.useTimelineStore;
  const selectedEventId = useStore((state) => state.selectedEventId);
  const selectEvent = useStore((state) => state.selectEvent);
  const setYear = useStore((state) => state.setYear);
  const events = config.events;
  const currentIndex = Math.max(0, events.findIndex((event) => event.id === selectedEventId));
  const event = events.find((item) => item.id === selectedEventId) ?? events[currentIndex];
  const swipeStartRef = useRef<number | null>(null);
  const [dragX, setDragX] = useState(0);
  if (!event) return null;

  const choose = (next: MobileHistoricalEvent) => {
    selectEvent(next.id);
    setYear(next.year);
  };
  const move = (delta: number) => {
    const nextIndex = Math.min(events.length - 1, Math.max(0, currentIndex + delta));
    choose(events[nextIndex]);
  };
  const finishSwipe = (clientX: number) => {
    const startX = swipeStartRef.current;
    swipeStartRef.current = null;
    setDragX(0);
    if (startX === null) return;
    const delta = clientX - startX;
    if (delta < -44) move(1);
    else if (delta > 44) move(-1);
  };
  const category = EVENT_CATEGORY[event.category];
  const renderPeek = (neighbor: MobileHistoricalEvent | undefined, side: "left" | "right") => {
    if (!neighbor) return null;
    return (
      <article aria-hidden="true" className={`migration-mobile-event-peek migration-mobile-event-peek--${side}`}>
        <span>{neighbor.year} 年</span>
        <strong>{neighbor.title}</strong>
        <p>{neighbor.summary}</p>
      </article>
    );
  };

  return (
    <div className="migration-mobile-carousel" aria-live="polite">
      {renderPeek(events[currentIndex - 1], "left")}
      {renderPeek(events[currentIndex + 1], "right")}
      <button
        type="button"
        aria-label="上一个历史事件"
        className="migration-mobile-carousel__arrow migration-mobile-carousel__arrow--left"
        disabled={currentIndex === 0}
        onClick={() => move(-1)}
      >
        <CaretLeft aria-hidden="true" size={23} weight="bold" />
      </button>
      <motion.article
        key={event.id}
        initial={{ opacity: 0.55, y: 8 }}
        animate={{ opacity: 1, y: 0, x: dragX }}
        transition={dragX === 0 ? { type: "spring", stiffness: 420, damping: 34 } : { duration: 0 }}
        onPointerDown={(event) => {
          if ((event.target as HTMLElement).closest?.("button")) return;
          swipeStartRef.current = event.clientX;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (swipeStartRef.current === null) return;
          setDragX(Math.max(-90, Math.min(90, event.clientX - swipeStartRef.current)));
        }}
        onPointerUp={(event) => {
          finishSwipe(event.clientX);
          if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={() => { swipeStartRef.current = null; setDragX(0); }}
        className="migration-mobile-event-card"
      >
        <div className="migration-mobile-event-card__meta">
          <span>{event.year} 年 · {config.getPhaseByYear(event.year).title}</span>
          <span>{currentIndex + 1} / {events.length}</span>
        </div>
        <h2>{event.title}</h2>
        <span className="migration-mobile-category-chip" style={{ color: category.color, borderColor: `${category.color}88` }}>
          {category.label}
        </span>
        <p>{event.summary}</p>
        <button type="button" className="migration-mobile-primary" onClick={onRead}>
          <BookOpenText aria-hidden="true" size={20} weight="bold" />
          查看时间线
        </button>
      </motion.article>
      <button
        type="button"
        aria-label="下一个历史事件"
        className="migration-mobile-carousel__arrow migration-mobile-carousel__arrow--right"
        disabled={currentIndex === events.length - 1}
        onClick={() => move(1)}
      >
        <CaretRight aria-hidden="true" size={23} weight="bold" />
      </button>
    </div>
  );
}

function TimelineView({ config, onShowMap }: { config: MigrationMobileConfig; onShowMap: () => void }) {
  const useStore = config.useTimelineStore;
  const selectedEventId = useStore((state) => state.selectedEventId);
  const selectEvent = useStore((state) => state.selectEvent);
  const setYear = useStore((state) => state.setYear);
  const event = config.events.find((item) => item.id === selectedEventId) ?? config.events[0];
  if (!event) return null;
  const phase = config.getPhaseByYear(event.year);

  const chooseEvent = (next: MobileHistoricalEvent) => {
    selectEvent(next.id);
    setYear(next.year);
  };

  return (
    <section className="migration-mobile-scroll-view migration-mobile-timeline-view">
      <div className="migration-mobile-section-heading">
        <div>
          <span>Time × Story</span>
          <h2>时间与故事</h2>
        </div>
        <div className="migration-mobile-year-range">{config.timelineMin}–{config.timelineMax}</div>
      </div>

      <article className="migration-mobile-story-lead">
        <div className="migration-mobile-story-lead__meta">{event.year} 年 · {event.location} · {phase.title}</div>
        <h3>{event.title}</h3>
        <p>{event.detail}</p>
        <div className="migration-mobile-highlight-list">
          {phase.highlights.slice(0, 3).map((highlight) => <span key={highlight}>{highlight}</span>)}
        </div>
        <div className="migration-mobile-source-line">来源：{event.source}</div>
        <button type="button" className="migration-mobile-primary" onClick={onShowMap}>
          <MapTrifold aria-hidden="true" size={20} weight="bold" />
          在地图中查看
        </button>
      </article>

      <div className="migration-mobile-event-list">
        {config.events.map((item) => {
          const selected = item.id === event.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-current={selected ? "step" : undefined}
              className={selected ? "is-selected" : ""}
              onClick={() => chooseEvent(item)}
            >
              <span className="migration-mobile-event-list__year">{item.year}</span>
              <span className="min-w-0 flex-1">
                <small>{item.location} · {EVENT_CATEGORY[item.category].label}</small>
                <strong>{item.title}</strong>
              </span>
              <CaretRight aria-hidden="true" size={18} />
            </button>
          );
        })}
      </div>
    </section>
  );
}

function PeopleView({ config, onLocate }: { config: MigrationMobileConfig; onLocate: (person: MobileNotablePerson) => void }) {
  const useStore = config.useTimelineStore;
  const year = useStore((state) => state.year);
  const selectedPersonId = useStore((state) => state.selectedPersonId);
  const selectPerson = useStore((state) => state.selectPerson);
  const selectedPerson = config.people.find((person) => person.id === selectedPersonId);
  const total = config.cumulativeTotal(year);

  return (
    <section className="migration-mobile-scroll-view migration-mobile-people-view">
      <div className="migration-mobile-section-heading">
        <div>
          <span>People × Data × Place</span>
          <h2>人物与迁徙</h2>
        </div>
        <UsersThree aria-hidden="true" size={28} />
      </div>

      <div className="migration-mobile-stat-grid">
        <div><strong>{formatCount(total)}</strong><span>累计人次</span></div>
        <div><strong>{config.people.length}</strong><span>代表人物</span></div>
        <div><strong>{config.destinationPorts.length}</strong><span>{config.destinationLabel}</span></div>
      </div>

      {selectedPerson ? (
        <article className="migration-mobile-person-lead">
          <div className="migration-mobile-person-lead__eyebrow">{selectedPerson.nameEn}</div>
          <h3>{selectedPerson.name}</h3>
          <div className="migration-mobile-person-lead__meta">
            {selectedPerson.yearBorn}–{selectedPerson.yearDied} · {selectedPerson.title}
          </div>
          <p>{selectedPerson.story}</p>
          <div className="migration-mobile-source-line">来源：{selectedPerson.source}</div>
          <button type="button" className="migration-mobile-primary" onClick={() => onLocate(selectedPerson)}>
            <UserFocus aria-hidden="true" size={20} weight="bold" />
            定位迁徙地点
          </button>
        </article>
      ) : null}

      <div className="migration-mobile-people-list">
        {config.people.map((person) => {
          const selected = person.id === selectedPersonId;
          return (
            <button
              key={person.id}
              type="button"
              aria-pressed={selected}
              className={selected ? "is-selected" : ""}
              onClick={() => selectPerson(selected ? null : person.id)}
            >
              <span className="migration-mobile-person-avatar">
                <UserCircle aria-hidden="true" size={25} weight={selected ? "fill" : "regular"} />
              </span>
              <span className="min-w-0 flex-1">
                <strong>{person.name}</strong>
                <small>{person.title} · {config.journeyVerb} {person.emigrateYear}</small>
              </span>
              <CaretRight aria-hidden="true" size={18} />
            </button>
          );
        })}
      </div>
    </section>
  );
}

function MobileNavigation({
  active,
  activePath,
  onChange,
}: {
  active: MobileSection;
  activePath: MigrationMobileConfig["activePath"];
  onChange: (section: MobileSection) => void;
}) {
  const activeTheme = THEMES.find((theme) => theme.path === activePath)?.label ?? "华人迁徙";
  return (
    <nav className="migration-mobile-navigation" aria-label={`${activeTheme}手机端主导航`}>
      {NAV_ITEMS.map(({ id, label, Icon }) => (
        <button key={id} type="button" aria-current={active === id ? "page" : undefined} onClick={() => onChange(id)}>
          <span className="migration-mobile-navigation__icon">
            <Icon aria-hidden="true" size={23} weight={active === id ? "fill" : "regular"} />
          </span>
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

export function MigrationMobileExperience({ config, mapStyleId, onMapStyleChange }: MigrationMobileExperienceProps) {
  const [activeSection, setActiveSection] = useState<MobileSection>("map");
  const [menuOpen, setMenuOpen] = useState(false);
  const [routesVisible, setRoutesVisible] = useState(true);
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef<MapboxLike | null>(null);
  const pendingFocusRef = useRef<[number, number] | null>(null);
  const orderedEvents = config.events;

  useEffect(() => {
    const featured = orderedEvents.find((event) => event.id === config.featuredEventId) ?? orderedEvents[0];
    if (!featured) return;
    const store = config.useTimelineStore.getState();
    store.setPlaying(false);
    store.setYear(featured.year);
    store.selectEvent(featured.id);
  }, [config, orderedEvents]);

  const handleMapReady = useCallback((map: MapboxLike) => {
    mapRef.current = map;
    setMapReady(true);
    const destination = pendingFocusRef.current;
    if (destination) {
      map.flyTo({ center: destination, zoom: Math.max(map.getZoom(), config.mapZoom), duration: 850 });
      pendingFocusRef.current = null;
    }
  }, [config.mapZoom]);

  const locatePerson = useCallback((person: MobileNotablePerson) => {
    const destination = config.ports.find((port) => port.id === person.destinationId);
    config.useTimelineStore.getState().setYear(person.emigrateYear);
    pendingFocusRef.current = destination?.coord ?? null;
    mapRef.current = null;
    setMapReady(false);
    setActiveSection("map");
  }, [config]);

  const MapComponent = config.MapComponent;

  return (
    <div className="migration-mobile-shell">
      <MobileHeader activePath={config.activePath} onMenuOpen={() => setMenuOpen(true)} />

      <main className="relative min-h-0 flex-1 overflow-hidden">
        {activeSection === "map" ? (
          <>
            <div className="absolute inset-0">
              <MapComponent onMapReady={handleMapReady} styleId={mapStyleId} mobile routesVisible={routesVisible} />
            </div>
            <div className="absolute inset-x-0 bottom-[157px] z-20 flex justify-center">
              <RouteToggle visible={routesVisible} routeNoun={config.routeNoun} onChange={setRoutesVisible} />
            </div>
            <EventCarousel config={config} onRead={() => setActiveSection("timeline")} />
            {!mapReady ? (
              <div className="migration-mobile-map-loading">
                <MapTrifold aria-hidden="true" size={26} weight="duotone" />
                <span>{config.loadingLabel}</span>
              </div>
            ) : null}
          </>
        ) : null}

        {activeSection === "timeline" ? <TimelineView config={config} onShowMap={() => setActiveSection("map")} /> : null}
        {activeSection === "people" ? <PeopleView config={config} onLocate={locatePerson} /> : null}
      </main>

      <MobileNavigation active={activeSection} activePath={config.activePath} onChange={setActiveSection} />
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        mapStyleId={mapStyleId}
        onMapStyleChange={onMapStyleChange}
        onShowTimeline={() => setActiveSection("timeline")}
        timelineMin={config.timelineMin}
        timelineMax={config.timelineMax}
      />
    </div>
  );
}
