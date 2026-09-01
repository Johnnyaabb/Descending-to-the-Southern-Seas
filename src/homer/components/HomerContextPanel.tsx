import { motion } from "framer-motion";
import {
  EVIDENCE_LABELS,
  EPISODE_BY_ID,
  FACTION_LABELS,
  PERSON_BY_ID,
  PLACE_BY_ID,
  SOURCE_BY_ID,
} from "../data";
import { useHomerStore } from "../useHomerStore";

function StatCard({ value, label, accent }: { value: string; label: string; accent: string }) {
  return (
    <div className="rounded-lg border border-[#d8b46a]/16 bg-black/20 px-2.5 py-2 text-center">
      <div className="font-display text-lg font-bold leading-none" style={{ color: accent }}>{value}</div>
      <div className="mt-1 text-[9px] tracking-wider text-[#f4e5c9]/40">{label}</div>
    </div>
  );
}

export function HomerContextPanel() {
  const epic = useHomerStore((state) => state.epic);
  const selectedEpisodeId = useHomerStore((state) => state.selectedEpisodeId);
  const selectedPersonId = useHomerStore((state) => state.selectedPersonId);
  const selectedPlaceId = useHomerStore((state) => state.selectedPlaceId);
  const selectPerson = useHomerStore((state) => state.selectPerson);
  const selectPlace = useHomerStore((state) => state.selectPlace);

  const episode = EPISODE_BY_ID.get(selectedEpisodeId);
  const person = selectedPersonId ? PERSON_BY_ID.get(selectedPersonId) : undefined;
  const place = selectedPlaceId ? PLACE_BY_ID.get(selectedPlaceId) : episode?.placeId ? PLACE_BY_ID.get(episode.placeId) : undefined;
  if (!episode) return null;
  const evidence = EVIDENCE_LABELS[episode.evidence];
  const relatedPeople = person?.relatedIds.map((id) => PERSON_BY_ID.get(id)).filter(Boolean) ?? [];
  const episodeSources = episode.sourceIds.map((id) => SOURCE_BY_ID.get(id)).filter(Boolean);

  return (
    <motion.aside
      key={episode.id}
      initial={{ opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="homer-panel scrollbar-thin flex max-h-full w-[318px] flex-col overflow-y-auto"
    >
      <div className="grid grid-cols-3 gap-1.5 border-b border-[#d8b46a]/16 p-3">
        {epic === "iliad" ? (
          <>
            <StatCard value="24" label="卷" accent="#e6c47a" />
            <StatCard value="≈50" label="叙事日数" accent="#d87952" />
            <StatCard value="1,186" label="诗中舰船" accent="#f0a776" />
          </>
        ) : (
          <>
            <StatCard value="24" label="卷" accent="#e6c47a" />
            <StatCard value="10" label="归途年数" accent="#55c6c1" />
            <StatCard value="12→1" label="舰船→幸存者" accent="#7ed3cf" />
          </>
        )}
      </div>

      <section className="px-4 pb-4 pt-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d8b46a]">
              第 {episode.book} 卷 · {episode.lines}
            </div>
            <h2 className="mt-1.5 font-display text-lg font-bold leading-snug text-[#f5e5c7]">{episode.title}</h2>
          </div>
          <span
            className="mt-0.5 shrink-0 rounded-full border px-2 py-1 text-[9px]"
            style={{ color: evidence.color, borderColor: `${evidence.color}55`, background: `${evidence.color}14` }}
          >
            {evidence.short}
          </span>
        </div>
        <p className="mt-3 text-[12px] leading-[1.75] text-[#f2e5ce]/72">{episode.summary}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {episode.themes.map((theme) => (
            <span key={theme} className="rounded-full border border-[#d8b46a]/20 bg-[#d8b46a]/7 px-2 py-0.5 text-[9px] text-[#e8c988]/76">
              {theme}
            </span>
          ))}
        </div>
      </section>

      <section className="border-t border-[#d8b46a]/14 px-4 py-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d8b46a]">出场人物</h3>
          <span className="text-[9px] text-[#f2e5ce]/30">点击查看关系</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {episode.personIds.map((personId) => {
            const item = PERSON_BY_ID.get(personId);
            if (!item) return null;
            const selected = personId === selectedPersonId;
            return (
              <button
                key={personId}
                type="button"
                onClick={() => selectPerson(personId)}
                className={`rounded-md border px-2 py-1 text-[10px] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b46a] ${
                  selected
                    ? "border-[#d8b46a]/55 bg-[#d8b46a]/15 text-[#ffedc7]"
                    : "border-white/10 bg-white/[0.025] text-[#f2e5ce]/60 hover:border-[#d8b46a]/30 hover:text-[#f2e5ce]"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        {person && (
          <motion.div
            key={person.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 rounded-xl border border-[#d8b46a]/20 bg-black/20 p-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-display text-base font-bold text-[#f7e6c5]">{person.name}</h4>
                <p className="mt-0.5 text-[9px] uppercase tracking-[0.15em] text-[#d8b46a]/65">{person.nameEn}</p>
              </div>
              <span className="rounded border border-white/10 px-1.5 py-0.5 text-[8px] text-[#f2e5ce]/45">
                {FACTION_LABELS[person.faction]}
              </span>
            </div>
            <p className="mt-2 text-[10px] italic text-[#71c7c1]/70">“{person.epithet}”</p>
            <p className="mt-2 text-[11px] leading-relaxed text-[#f2e5ce]/62">{person.description}</p>
            {relatedPeople.length > 0 && (
              <div className="mt-2 border-t border-white/7 pt-2 text-[9px] text-[#f2e5ce]/35">
                关系：{relatedPeople.map((item) => item?.name).join(" · ")}
              </div>
            )}
          </motion.div>
        )}
      </section>

      {place && (
        <section className="border-t border-[#d8b46a]/14 px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d8b46a]">当前地点</h3>
            <button
              type="button"
              onClick={() => selectPlace(null)}
              className="text-[9px] text-[#f2e5ce]/30 hover:text-[#f2e5ce]/60"
            >
              清除定位
            </button>
          </div>
          <div className="mt-2 rounded-lg border border-white/8 bg-white/[0.025] p-3">
            <div className="flex items-center gap-2">
              <i className={`homer-evidence-dot homer-evidence-dot--${place.evidence}`} />
              <strong className="font-display text-sm text-[#f2e1c0]">{place.name}</strong>
            </div>
            {(place.nameGreek || place.modernName) && (
              <p className="mt-1 text-[9px] text-[#f2e5ce]/38">{place.nameGreek} · {place.modernName}</p>
            )}
            <p className="mt-2 text-[10px] leading-relaxed text-[#f2e5ce]/55">{place.description}</p>
          </div>
        </section>
      )}

      <section className="border-t border-[#d8b46a]/14 px-4 py-3">
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d8b46a]">本事件来源</h3>
        <div className="mt-2 space-y-1.5">
          {episodeSources.map((source) =>
            source ? (
              <a
                key={source.id}
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="block text-[9px] leading-relaxed text-[#75c9c4]/60 underline decoration-[#75c9c4]/20 underline-offset-2 hover:text-[#8ee0da]"
              >
                {source.organization} ↗
              </a>
            ) : null,
          )}
        </div>
      </section>
    </motion.aside>
  );
}

