import { LEGACY_STORAGE_KEY, STORAGE_KEY } from "../config/constants";

const isNumber = (v) => typeof v === "number" && Number.isFinite(v);

const assertUniqueNames = (items, label) => {
  const seen = new Set();
  items.forEach(({ name }) => {
    if (seen.has(name)) throw new Error(`Duplicate ${label} name "${name}"`);
    seen.add(name);
  });
};

const normalizeStops = (stops) => {
  if (!Array.isArray(stops) || stops.length === 0) {
    throw new Error("stops must be a non-empty array");
  }
  const result = stops.map((stop, i) => {
    const name = stop?.name;
    if (typeof name !== "string" && !isNumber(name)) {
      throw new Error(`stops[${i}].name must be a string`);
    }
    if (!isNumber(stop.L)) throw new Error(`stops[${i}].L must be a number`);
    if (!isNumber(stop.C)) throw new Error(`stops[${i}].C must be a number`);
    return { name: String(name), L: stop.L, C: stop.C };
  });
  assertUniqueNames(result, "stop");
  return result;
};

const normalizeHues = (hues) => {
  if (!Array.isArray(hues) || hues.length === 0) {
    throw new Error("hues must be a non-empty array");
  }
  const result = hues.map((hue, i) => {
    if (typeof hue?.name !== "string" || !hue.name) {
      throw new Error(`hues[${i}].name must be a non-empty string`);
    }
    if (!isNumber(hue.H)) throw new Error(`hues[${i}].H must be a number`);
    return { name: hue.name, H: hue.H, fullGray: Boolean(hue.fullGray) };
  });
  assertUniqueNames(result, "hue");
  return result;
};

const normalizeSettings = (settings) => {
  if (!settings || typeof settings !== "object") return undefined;
  const result = {};
  if (typeof settings.bgColorLight === "string") result.bgColorLight = settings.bgColorLight;
  if (typeof settings.bgColorDark === "string") result.bgColorDark = settings.bgColorDark;
  if (isNumber(settings.swatchSize)) {
    result.swatchSize = Math.min(100, Math.max(56, settings.swatchSize));
  }
  if (typeof settings.reverseInDark === "boolean") result.reverseInDark = settings.reverseInDark;
  return result;
};

/**
 * Validate a palette config ({ stops, hues, tokens, settings }) coming from
 * user input or localStorage. Every field is optional; present fields must be valid.
 * @throws {Error} with a human-readable message when a field is invalid
 */
export const normalizeConfig = (config) => {
  if (!config || typeof config !== "object" || Array.isArray(config)) {
    throw new Error("Config must be a JSON object");
  }
  const result = {};
  if (config.stops !== undefined) result.stops = normalizeStops(config.stops);
  if (config.hues !== undefined) result.hues = normalizeHues(config.hues);
  if (config.tokens && typeof config.tokens === "object") result.tokens = config.tokens;
  const settings = normalizeSettings(config.settings);
  if (settings) result.settings = settings;
  return result;
};

/**
 * Read the raw saved config, moving it from the legacy key to STORAGE_KEY
 * when only the legacy key holds one.
 */
const readSavedRaw = () => {
  const current = localStorage.getItem(STORAGE_KEY);
  const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
  if (legacy === null) return current;
  if (current === null) localStorage.setItem(STORAGE_KEY, legacy);
  localStorage.removeItem(LEGACY_STORAGE_KEY);
  return current ?? legacy;
};

/** Read the saved config from localStorage, ignoring anything invalid. */
export const loadSavedConfig = () => {
  try {
    const saved = readSavedRaw();
    return saved ? normalizeConfig(JSON.parse(saved)) : {};
  } catch (e) {
    console.warn("Ignoring saved palette config:", e);
    return {};
  }
};

export const saveConfig = (config) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    // Storage can be unavailable (private mode, quota) - persistence is best-effort
  }
};
