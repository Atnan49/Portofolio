export type StoredScheme = "light" | "dark" | null;
export type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "color-scheme";

export function getSystemTheme(matchMediaFn?: (query: string) => MediaQueryList): ResolvedTheme {
  const matcher =
    matchMediaFn ??
    (typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia.bind(window)
      : null);
  if (!matcher) return "dark";
  return matcher("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function readStoredScheme(storage?: Storage): StoredScheme {
  try {
    const store = storage ?? (typeof localStorage !== "undefined" ? localStorage : null);
    if (!store) return null;
    const raw = store.getItem(STORAGE_KEY);
    return raw === "light" || raw === "dark" ? raw : null;
  } catch {
    return null;
  }
}

export function writeStoredScheme(value: StoredScheme, storage?: Storage): void {
  try {
    const store = storage ?? (typeof localStorage !== "undefined" ? localStorage : null);
    if (!store) return;
    if (value === null) {
      store.removeItem(STORAGE_KEY);
    } else {
      store.setItem(STORAGE_KEY, value);
    }
  } catch {
    // Blocked storage still keeps in-memory DOM theme functional.
  }
}

export function resolveEffectiveTheme(stored: StoredScheme, system: ResolvedTheme): ResolvedTheme {
  return stored ?? system;
}

export function resolveNextStoredScheme(
  currentRendered: ResolvedTheme,
  system: ResolvedTheme
): StoredScheme {
  const target: ResolvedTheme = currentRendered === "dark" ? "light" : "dark";
  // Returning null removes the override so future OS theme switches resume naturally.
  return target === system ? null : target;
}

export function applyColorSchemeDocument(
  stored: StoredScheme,
  system: ResolvedTheme,
  doc: Document = document
): ResolvedTheme {
  const effective = resolveEffectiveTheme(stored, system);
  const meta = doc.querySelector('meta[name="color-scheme"]');
  if (meta) {
    meta.setAttribute("content", stored ?? "light dark");
  }
  doc.documentElement.classList.toggle("dark", effective === "dark");
  return effective;
}
