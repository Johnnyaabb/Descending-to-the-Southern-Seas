/**
 * Coordinates rebuilding migration arc / particle overlays after `map.setStyle()`.
 *
 * `setStyle` runs from MapView's effect and can wipe child-added sources/layers
 * **after** MigrationArcs has mounted. Notifying subscribers from MapView guarantees
 * a rebuild even when duplicate style URLs suppress some style events.
 */

const subscribers = new Set<() => void>();

export function registerMigrationOverlayRestore(fn: () => void): () => void {
  subscribers.add(fn);
  return () => subscribers.delete(fn);
}

/** Fire after native map work; double rAF gives MapLibre time to finalize the swap. */
export function notifyMigrationOverlayRestore(): void {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      for (const fn of subscribers) {
        try {
          fn();
        } catch {
          /* ignore overlay teardown races */
        }
      }
    });
  });
}
