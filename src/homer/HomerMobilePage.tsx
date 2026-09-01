import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "@phosphor-icons/react/ArrowLeft";
import { Bank } from "@phosphor-icons/react/Bank";
import { BookOpenText } from "@phosphor-icons/react/BookOpenText";
import { CaretLeft } from "@phosphor-icons/react/CaretLeft";
import { CaretRight } from "@phosphor-icons/react/CaretRight";
import { DotsThree } from "@phosphor-icons/react/DotsThree";
import { Eye } from "@phosphor-icons/react/Eye";
import { EyeSlash } from "@phosphor-icons/react/EyeSlash";
import { MapTrifold } from "@phosphor-icons/react/MapTrifold";
import { Scroll } from "@phosphor-icons/react/Scroll";
import { Link } from "react-router-dom";
import { MAP_STYLES } from "../lib/mapStyles";
import {
  EVIDENCE_LABELS,
  EPISODE_BY_ID,
  episodesForEpic,
  type EpicId,
  type HomerEpisode,
} from "./data";
import { HomerContextPanel } from "./components/HomerContextPanel";
import { HomerMap } from "./components/HomerMap";
import { HomerSourcesDrawer } from "./components/HomerSourcesDrawer";
import { useHomerStore, type HomerOrderMode } from "./useHomerStore";

type MobileSection = "map" | "story" | "knowledge";

interface HomerMobilePageProps {
  mapStyleId: string;
  onMapStyleChange: (id: string) => void;
  labelsVisible: boolean;
  onLabelsVisibleChange: (visible: boolean) => void;
  sourcesOpen: boolean;
  onSourcesOpenChange: (open: boolean) => void;
}

function timeLabel(episode: HomerEpisode): string {
  if (episode.epic === "iliad") return `战争第十年 · 第 ${episode.book} 卷`;
  if (episode.storyOrder <= 11) return `战争结束后 · 第 ${episode.book} 卷`;
  if (episode.storyOrder === 12) return `滞留七年 · 第 ${episode.book} 卷`;
  if (episode.storyOrder <= 14) return `离家第二十年 · 第 ${episode.book} 卷`;
  return `归途第十年 · 第 ${episode.book} 卷`;
}

function orderEpisodes(epic: EpicId, mode: HomerOrderMode): HomerEpisode[] {
  const episodes = [...episodesForEpic(epic)];
  return episodes.sort((a, b) =>
    mode === "story" ? a.storyOrder - b.storyOrder : a.book - b.book || a.storyOrder - b.storyOrder,
  );
}

function EpicSwitch({ epic, onChange }: { epic: EpicId; onChange: (epic: EpicId) => void }) {
  return (
    <div className="homer-mobile-epic-switch" aria-label="选择史诗">
      <button type="button" aria-pressed={epic === "iliad"} onClick={() => onChange("iliad")}>
        伊利亚特
      </button>
      <button type="button" aria-pressed={epic === "odyssey"} onClick={() => onChange("odyssey")}>
        奥德赛
      </button>
    </div>
  );
}

function MobileHeader({ onMenuOpen }: { onMenuOpen: () => void }) {
  const epic = useHomerStore((state) => state.epic);
  const setEpic = useHomerStore((state) => state.setEpic);

  return (
    <header className="homer-mobile-header">
      <Link to="/" aria-label="返回主页" className="homer-mobile-icon-button">
        <ArrowLeft aria-hidden="true" size={22} weight="bold" />
      </Link>
      <h1>荷马史诗</h1>
      <EpicSwitch epic={epic} onChange={setEpic} />
      <button type="button" aria-label="打开更多设置" className="homer-mobile-icon-button" onClick={onMenuOpen}>
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
  labelsVisible,
  onLabelsVisibleChange,
  onSourcesOpen,
}: {
  open: boolean;
  onClose: () => void;
  mapStyleId: string;
  onMapStyleChange: (id: string) => void;
  labelsVisible: boolean;
  onLabelsVisibleChange: (visible: boolean) => void;
  onSourcesOpen: () => void;
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
      {open && (
        <div className="fixed inset-0 z-[70]">
          <motion.button
            type="button"
            aria-label="关闭更多设置"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#02070c]/65 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="地图与资料设置"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="homer-mobile-menu"
          >
            <div className="homer-mobile-menu__title">地图风格</div>
            <div className="grid grid-cols-2 gap-2">
              {MAP_STYLES.map((style) => (
                <button
                  key={style.id}
                  type="button"
                  aria-pressed={style.id === mapStyleId}
                  onClick={() => {
                    onMapStyleChange(style.id);
                    onClose();
                  }}
                  className="homer-mobile-menu__style"
                >
                  <MapTrifold aria-hidden="true" size={18} weight={style.id === mapStyleId ? "fill" : "regular"} />
                  <span>{style.label}</span>
                </button>
              ))}
            </div>
            <div className="mt-3 border-t border-white/10 pt-2">
              <button
                type="button"
                role="switch"
                aria-checked={labelsVisible}
                className="homer-mobile-menu__row"
                onClick={() => onLabelsVisibleChange(!labelsVisible)}
              >
                {labelsVisible ? <Eye aria-hidden="true" size={20} /> : <EyeSlash aria-hidden="true" size={20} />}
                <span>中文地理标注</span>
                <strong>{labelsVisible ? "已显示" : "已隐藏"}</strong>
              </button>
              <button
                type="button"
                className="homer-mobile-menu__row"
                onClick={() => {
                  onClose();
                  onSourcesOpen();
                }}
              >
                <Scroll aria-hidden="true" size={20} />
                <span>史实边界与来源</span>
                <CaretRight aria-hidden="true" size={17} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function RouteToggle({ visible, onChange }: { visible: boolean; onChange: (visible: boolean) => void }) {
  return (
    <button type="button" className="homer-mobile-route-toggle" aria-pressed={visible} onClick={() => onChange(!visible)}>
      {visible ? <Eye aria-hidden="true" size={18} /> : <EyeSlash aria-hidden="true" size={18} />}
      {visible ? "隐藏路线" : "显示路线"}
    </button>
  );
}

function JourneyCard({ onRead }: { onRead: () => void }) {
  const epic = useHomerStore((state) => state.epic);
  const orderMode = useHomerStore((state) => state.orderMode);
  const selectedEpisodeId = useHomerStore((state) => state.selectedEpisodeId);
  const selectEpisode = useHomerStore((state) => state.selectEpisode);
  const episodes = useMemo(() => orderEpisodes(epic, orderMode), [epic, orderMode]);
  const currentIndex = Math.max(0, episodes.findIndex((episode) => episode.id === selectedEpisodeId));
  const episode = EPISODE_BY_ID.get(selectedEpisodeId) ?? episodes[currentIndex];
  if (!episode) return null;

  const move = (delta: number) => {
    const nextIndex = Math.min(episodes.length - 1, Math.max(0, currentIndex + delta));
    selectEpisode(episodes[nextIndex].id);
  };
  const evidence = EVIDENCE_LABELS[episode.evidence];
  const previousEpisode = episodes[currentIndex - 1];
  const nextEpisode = episodes[currentIndex + 1];

  const renderPeek = (neighbor: (typeof episodes)[number] | undefined, side: "left" | "right") => {
    if (!neighbor) return null;
    return (
      <article aria-hidden="true" className={`homer-mobile-journey-peek homer-mobile-journey-peek--${side}`}>
        <span>{timeLabel(neighbor)}</span>
        <strong>{neighbor.title}</strong>
        <p>{neighbor.summary}</p>
      </article>
    );
  };

  return (
    <div className="homer-mobile-carousel" aria-live="polite">
      {renderPeek(previousEpisode, "left")}
      {renderPeek(nextEpisode, "right")}
      <button
        type="button"
        aria-label="上一段故事"
        className="homer-mobile-carousel__arrow homer-mobile-carousel__arrow--left"
        disabled={currentIndex === 0}
        onClick={() => move(-1)}
      >
        <CaretLeft aria-hidden="true" size={23} weight="bold" />
      </button>
      <motion.article
        key={episode.id}
        initial={{ opacity: 0.55, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="homer-mobile-journey-card"
      >
        <div className="homer-mobile-journey-card__meta">
          <span>{timeLabel(episode)}</span>
          <span>{currentIndex + 1} / {episodes.length}</span>
        </div>
        <h2>{episode.title}</h2>
        <span className="homer-mobile-evidence-chip" style={{ color: evidence.color, borderColor: `${evidence.color}75` }}>
          {evidence.short}
        </span>
        <p>{episode.summary}</p>
        <button type="button" className="homer-mobile-primary" onClick={onRead}>
          <BookOpenText aria-hidden="true" size={20} weight="bold" />
          阅读故事
        </button>
      </motion.article>
      <button
        type="button"
        aria-label="下一段故事"
        className="homer-mobile-carousel__arrow homer-mobile-carousel__arrow--right"
        disabled={currentIndex === episodes.length - 1}
        onClick={() => move(1)}
      >
        <CaretRight aria-hidden="true" size={23} weight="bold" />
      </button>
    </div>
  );
}

function StoryView({ onShowMap }: { onShowMap: () => void }) {
  const epic = useHomerStore((state) => state.epic);
  const orderMode = useHomerStore((state) => state.orderMode);
  const selectedEpisodeId = useHomerStore((state) => state.selectedEpisodeId);
  const setOrderMode = useHomerStore((state) => state.setOrderMode);
  const selectEpisode = useHomerStore((state) => state.selectEpisode);
  const episodes = useMemo(() => orderEpisodes(epic, orderMode), [epic, orderMode]);
  const selected = EPISODE_BY_ID.get(selectedEpisodeId) ?? episodes[0];

  return (
    <section className="homer-mobile-scroll-view homer-mobile-story-view">
      <div className="homer-mobile-section-heading">
        <div>
          <span>Time × Story</span>
          <h2>时间与故事</h2>
        </div>
        <div className="homer-mobile-order-switch">
          <button type="button" aria-pressed={orderMode === "story"} onClick={() => setOrderMode("story")}>故事时序</button>
          <button type="button" aria-pressed={orderMode === "reading"} onClick={() => setOrderMode("reading")}>卷次顺序</button>
        </div>
      </div>

      {selected && (
        <article className="homer-mobile-story-lead">
          <div className="homer-mobile-story-lead__meta">{timeLabel(selected)} · {selected.lines}</div>
          <h3>{selected.title}</h3>
          <p>{selected.summary}</p>
          <div className="flex flex-wrap gap-2">
            {selected.themes.map((theme) => <span key={theme}>{theme}</span>)}
          </div>
          <button type="button" className="homer-mobile-primary" onClick={onShowMap}>
            <MapTrifold aria-hidden="true" size={20} weight="bold" />
            在地图中查看
          </button>
        </article>
      )}

      <div className="homer-mobile-story-list">
        {episodes.map((episode, index) => {
          const selectedRow = episode.id === selectedEpisodeId;
          return (
            <button
              key={episode.id}
              type="button"
              aria-current={selectedRow ? "step" : undefined}
              className={selectedRow ? "is-selected" : ""}
              onClick={() => selectEpisode(episode.id)}
            >
              <span className="homer-mobile-story-list__index">{String(index + 1).padStart(2, "0")}</span>
              <span className="min-w-0 flex-1">
                <small>{timeLabel(episode)}</small>
                <strong>{episode.title}</strong>
              </span>
              <CaretRight aria-hidden="true" size={18} />
            </button>
          );
        })}
      </div>
    </section>
  );
}

function KnowledgeView({ onSourcesOpen }: { onSourcesOpen: () => void }) {
  return (
    <section className="homer-mobile-scroll-view homer-mobile-knowledge-view">
      <div className="homer-mobile-section-heading">
        <div>
          <span>People × Place × Evidence</span>
          <h2>知识与证据</h2>
        </div>
        <button type="button" className="homer-mobile-source-button" onClick={onSourcesOpen}>
          <Scroll aria-hidden="true" size={19} />
          来源
        </button>
      </div>
      <div className="homer-mobile-knowledge-panel">
        <HomerContextPanel />
      </div>
    </section>
  );
}

const NAV_ITEMS: Array<{ id: MobileSection; label: string; Icon: typeof MapTrifold }> = [
  { id: "map", label: "地图", Icon: MapTrifold },
  { id: "story", label: "故事", Icon: BookOpenText },
  { id: "knowledge", label: "知识", Icon: Bank },
];

function MobileNavigation({ active, onChange }: { active: MobileSection; onChange: (section: MobileSection) => void }) {
  return (
    <nav className="homer-mobile-navigation" aria-label="手机端主导航">
      {NAV_ITEMS.map(({ id, label, Icon }) => (
        <button key={id} type="button" aria-current={active === id ? "page" : undefined} onClick={() => onChange(id)}>
          <span className="homer-mobile-navigation__icon">
            <Icon aria-hidden="true" size={23} weight={active === id ? "fill" : "regular"} />
          </span>
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

export function HomerMobilePage({
  mapStyleId,
  onMapStyleChange,
  labelsVisible,
  onLabelsVisibleChange,
  sourcesOpen,
  onSourcesOpenChange,
}: HomerMobilePageProps) {
  const [activeSection, setActiveSection] = useState<MobileSection>("map");
  const [menuOpen, setMenuOpen] = useState(false);
  const [routesVisible, setRoutesVisible] = useState(true);

  return (
    <div className="homer-page homer-mobile-shell">
      <MobileHeader onMenuOpen={() => setMenuOpen(true)} />

      <main className="relative min-h-0 flex-1 overflow-hidden">
        {activeSection === "map" && (
          <>
            <div className="absolute inset-0">
              <HomerMap styleId={mapStyleId} labelsVisible={labelsVisible} routesVisible={routesVisible} mobile />
            </div>
            <div className="absolute inset-x-0 bottom-[185px] z-20 flex justify-center">
              <RouteToggle visible={routesVisible} onChange={setRoutesVisible} />
            </div>
            <JourneyCard onRead={() => setActiveSection("story")} />
          </>
        )}

        {activeSection === "story" && <StoryView onShowMap={() => setActiveSection("map")} />}
        {activeSection === "knowledge" && <KnowledgeView onSourcesOpen={() => onSourcesOpenChange(true)} />}
      </main>

      <MobileNavigation active={activeSection} onChange={setActiveSection} />

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        mapStyleId={mapStyleId}
        onMapStyleChange={onMapStyleChange}
        labelsVisible={labelsVisible}
        onLabelsVisibleChange={onLabelsVisibleChange}
        onSourcesOpen={() => onSourcesOpenChange(true)}
      />

      <HomerSourcesDrawer open={sourcesOpen} onClose={() => onSourcesOpenChange(false)} />
    </div>
  );
}
