/** 当前部署主题标识（各分支构建前一致，由 CI 子路径区分站点） */
export type SiteTheme = "nanyang" | "chuang-guandong";

/** 闯关东分支使用此常量；nanyang 分支镜像文件内为 "nanyang" */
export const CURRENT_THEME: SiteTheme = "chuang-guandong";

const REPO_SLUG = "Descending-to-the-Southern-Seas";

function repoRoot(): string {
  if (import.meta.env.DEV) return "/";
  const base = import.meta.env.BASE_URL.replace(/\/?$/, "");
  // BASE 形如 /Repo/chuang-guandong/ → 取 /Repo
  const parts = base.split("/").filter(Boolean);
  if (parts.length >= 2 && (parts[1] === "nanyang" || parts[1] === "chuang-guandong")) {
    return `/${parts[0]}/`;
  }
  if (parts.length === 1) return `/${parts[0]}/`;
  return "/";
}

export interface ThemeEntry {
  id: SiteTheme;
  label: string;
  subtitle: string;
  href: string;
}

export function themeEntries(): ThemeEntry[] {
  const root = repoRoot();
  return [
    {
      id: "nanyang",
      label: "潮汕下南洋",
      subtitle: "1684–1949 · 红头船与南洋港口",
      href: `${root}nanyang/`,
    },
    {
      id: "chuang-guandong",
      label: "闯关东",
      subtitle: "1644–1949 · 华北→关东移民走廊",
      href: `${root}chuang-guandong/`,
    },
  ];
}

export function siblingTheme(): ThemeEntry | null {
  return themeEntries().find((t) => t.id !== CURRENT_THEME) ?? null;
}

export function portalUrl(): string {
  return repoRoot();
}
