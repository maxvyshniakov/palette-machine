export const DEFAULT_STOPS = [
  { name: "0", L: 100, C: 0.02 },
  { name: "50", L: 95, C: 0.05 },
  { name: "100", L: 89, C: 0.11 },
  { name: "200", L: 82, C: 0.16 },
  { name: "300", L: 76, C: 0.18 },
  { name: "400", L: 69, C: 0.19 },
  { name: "500", L: 63, C: 0.21 },
  { name: "600", L: 56, C: 0.19 },
  { name: "700", L: 50, C: 0.17 },
  { name: "800", L: 43, C: 0.14 },
  { name: "900", L: 35, C: 0.1 },
  { name: "950", L: 29, C: 0.05 },
  { name: "1000", L: 25, C: 0.02 },
];

export const DEFAULT_HUES = [
  { name: "gray", H: 0, fullGray: true },
  { name: "red", H: 23, fullGray: false },
  { name: "orange", H: 45, fullGray: false },
  { name: "amber", H: 70, fullGray: false },
  { name: "yellow", H: 95, fullGray: false },
  { name: "lime", H: 125, fullGray: false },
  { name: "green", H: 145, fullGray: false },
  { name: "emerald", H: 165, fullGray: false },
  { name: "teal", H: 180, fullGray: false },
  { name: "cyan", H: 200, fullGray: false },
  { name: "sky", H: 220, fullGray: false },
  { name: "blue", H: 255, fullGray: false },
  { name: "indigo", H: 275, fullGray: false },
  { name: "violet", H: 290, fullGray: false },
  { name: "purple", H: 305, fullGray: false },
  { name: "fuchsia", H: 325, fullGray: false },
  { name: "pink", H: 350, fullGray: false },
  { name: "rose", H: 10, fullGray: false },
];

export const DEFAULT_TOKENS = {
  primary: "blue",
  danger: "red",
  warning: "amber",
  success: "green",
  neutral: "gray",
};

export const DEFAULT_SETTINGS = {
  bgColorLight: "oklch(100% 0 0)",
  bgColorDark: "oklch(25% 0 0)",
  swatchSize: 72,
  reverseInDark: true,
};

export const STORAGE_KEY = "palette-machine-config";
// Key used by earlier versions; read once and migrated to STORAGE_KEY.
export const LEGACY_STORAGE_KEY = "sirvui-palette-config";
export const MAX_HISTORY = 50;

export const EXPORT_INFO = {
  intents: `Intent colors provide semantic meaning to your UI:
• primary — Main brand/action color (buttons, links)
• danger — Destructive actions, errors
• warning — Caution states, alerts
• success — Positive feedback, confirmations
• neutral — Neutral/gray semantic color

Each intent maps to a primitive hue and includes all shades (0-1000) plus alpha variants.`,

  ground: `Ground colors define background surfaces at different elevation levels:
• ground — Base background (lowest elevation)
• ground1 — Raised surface (cards, modals)
• ground2 — Highest elevation (dropdowns, tooltips)

The base ground token is an alias to a primitive gray token in the flat palette.
In dark mode, higher elevation = lighter shade (subtle elevation cues).`,

  onColors: `On-colors ensure readable text on backgrounds:
• on-ground — Text color for all ground surfaces
• on-primary, on-danger, etc. — Text on intent backgrounds

On-colors are picked automatically (black or white) by the OKLCH lightness of the background: black at or above the threshold, white below it.`,

  stark: `Stark is the maximum contrast color against ground:
• Light mode: stark = black (#000000)
• Dark mode: stark = white (#FFFFFF)

Use stark for primary text, important icons, and high-visibility borders.
on-stark is the inverse (white on black, black on white).`,

  alphas: `Figma variables don't support opacity modifiers, so we pre-generate colors at specific alpha values.

Format: Use ranges (0-30) or individual values (35, 40, 45)
Example: "0-30,35,40,45,50,55,60,65,70-99"

Fewer alphas = smaller file, faster imports.
More alphas = finer control over transparency.`,

  exclusions: `Some token groups in uploaded files are for organization only.
Top-level groups starting with this prefix are skipped when analyzing files (default "#", e.g. "# shadow").`,

  naming: `Customize token naming conventions for your design system.
Variable IDs are preserved when renaming existing tokens.`,
};

export const DEFAULT_ALPHA_CONFIG = {
  // Grounds group
  ground: "0-30,35,40,45,50,55,60,65,70-99",
  onGround: "5,10,15,20,25,30,40,50,60,70,80,90",

  // Stark group
  stark: "0-30,35,40,45,50,55,60,65,70-99",
  onStark: "5,10,15,20,25,30,40,50,60,70,80,90",

  // Black/White
  blackWhite: "5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95",

  // Semantic intents (primary, danger, warning, success, neutral)
  semanticDefault: "0-30,35,40,45,50,55,60,65,70-99",
  onSemanticDefault: "5,10,15,20,25,30,40,50,60,70,80,90",
  semanticShades: {
    0: "",
    50: "",
    100: "",
    200: "",
    300: "60",
    400: "10",
    500: "",
    600: "60",
    700: "",
    800: "5,10,15,20,30,40,50,60,70,80,85,90,95",
    900: "",
    950: "",
    1000: "",
  },
  onSemanticShades: {
    0: "",
    50: "",
    100: "",
    200: "",
    300: "",
    400: "",
    500: "",
    600: "",
    700: "",
    800: "",
    900: "",
    950: "",
    1000: "",
  },

  // Primitive intents (palette hues: blue, gray, red, etc.)
  primitiveDefault: "",
  onPrimitiveDefault: "",
  primitiveShades: {
    0: "",
    50: "",
    100: "",
    200: "",
    300: "",
    400: "",
    500: "",
    600: "",
    700: "",
    800: "",
    900: "",
    950: "",
    1000: "",
  },
  onPrimitiveShades: {
    0: "",
    50: "",
    100: "",
    200: "",
    300: "",
    400: "",
    500: "",
    600: "",
    700: "",
    800: "",
    900: "",
    950: "",
    1000: "",
  },
};

/** Defaults for the Figma Variables export (see useFigmaConfig) */
export const DEFAULT_FIGMA_OPTIONS = {
  // Ground shade per elevation (light mode)
  figmaGroundLight: {
    ground: "0",
    ground1: "0",
    ground2: "0",
  },
  // Ground shade per elevation (dark mode)
  figmaGroundDark: {
    ground: "1000",
    ground1: "950",
    ground2: "900",
  },
  // Semantic intent -> palette hue
  figmaIntentMap: {
    primary: "blue",
    danger: "red",
    warning: "amber",
    success: "green",
    neutral: "gray",
  },
  // Shade used for intent root tokens (e.g. primary = primary/shade/500)
  figmaDefaultShade: "500",
  // "srgb" or "p3"
  figmaColorProfile: "p3",
  // Token naming convention
  namingConfig: {
    elevation0: "ground",
    elevation1: "ground1",
    elevation2: "ground2",
    foregroundPosition: "prefix",
    foregroundModifier: "on/",
    foregroundSyntax: "on-",
    shadeGroupName: "shade",
  },
  // OKLCH lightness at or above which on-colors are black
  onColorThreshold: 75,
  // Custom ground colors (used when refType is "custom")
  groundCustomColors: {
    light: { ground: null, ground1: null, ground2: null },
    dark: { ground: null, ground1: null, ground2: null },
  },
  // "primitive" | "theme" | "custom"
  groundRefType: {
    light: { ground: "primitive", ground1: "primitive", ground2: "primitive" },
    dark: { ground: "primitive", ground1: "primitive", ground2: "primitive" },
  },
  // refType: "primitive" (palette reference), "auto", "black", "white", "custom"
  onGroundColor: {
    light: { refType: "primitive", hue: "gray", shade: "1000" },
    dark: { refType: "primitive", hue: "gray", shade: "0" },
  },
  // Stark (max contrast vs ground) scale
  starkShades: {
    light: {
      0: "oklch(100% 0 0)",
      50: "oklch(97% 0 0)",
      100: "oklch(93% 0 0)",
      200: "oklch(85% 0 0)",
      300: "oklch(73% 0 0)",
      400: "oklch(55% 0 0)",
      500: "oklch(40% 0 0)",
      600: "oklch(30% 0 0)",
      700: "oklch(22% 0 0)",
      800: "oklch(15% 0 0)",
      900: "oklch(10% 0 0)",
      950: "oklch(5% 0 0)",
      1000: "oklch(0% 0 0)",
    },
    dark: {
      0: "oklch(0% 0 0)",
      50: "oklch(5% 0 0)",
      100: "oklch(10% 0 0)",
      200: "oklch(18% 0 0)",
      300: "oklch(28% 0 0)",
      400: "oklch(45% 0 0)",
      500: "oklch(60% 0 0)",
      600: "oklch(72% 0 0)",
      700: "oklch(82% 0 0)",
      800: "oklch(90% 0 0)",
      900: "oklch(95% 0 0)",
      950: "oklch(98% 0 0)",
      1000: "oklch(100% 0 0)",
    },
  },
  // Stark shade used for the stark root token
  starkDefaultShade: {
    light: "1000",
    dark: "1000",
  },
};
