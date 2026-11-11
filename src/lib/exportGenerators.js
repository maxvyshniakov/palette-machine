/**
 * Export Generators
 * Generate palette exports in various formats (JSON, CSS, Tailwind, SCSS)
 */

/**
 * Generate palette export in specified format
 * @param {Array} palette - Generated palette data
 * @param {Array} stops - Shade stops
 * @param {Object} tokens - Semantic token mappings
 * @param {string} format - Export format (json-srgb, json-p3, json-oklch, css, tailwind, tailwind-v4, scss)
 * @returns {string} Formatted export string
 */
export const generateExport = (palette, stops, tokens, format) => {
  const isP3 = format.includes("p3");
  const isOklch = format.includes("oklch");
  const getVal = (c) => (isOklch ? c.oklch : isP3 ? c.hexP3 : c.hex);

  if (format.startsWith("json")) {
    return JSON.stringify(
      {
        name: "Palette Machine",
        hues: palette.map((p) => ({
          name: p.name,
          hue: p.H,
          colors: p.colors.map((c) => getVal(c)),
        })),
        tones: stops.map((s) => s.name),
        tokens: Object.fromEntries(
          Object.entries(tokens).map(([k, v]) => [
            k,
            palette.find((p) => p.name === v)?.colors.map((c) => getVal(c)) ||
              [],
          ])
        ),
      },
      null,
      2
    );
  }

  if (format === "css") {
    return exportToCSS(palette, tokens);
  }

  if (format === "tailwind") {
    return exportToTailwind(palette);
  }

  if (format === "tailwind-v4") {
    return exportToTailwindTheme(palette);
  }

  if (format === "scss") {
    return exportToSCSS(palette, tokens);
  }

  return "";
};

/**
 * Export palette to CSS custom properties
 * @param {Array} palette - Generated palette
 * @param {Object} tokens - Semantic tokens
 * @returns {string} CSS string
 */
export const exportToCSS = (palette, tokens) => {
  let css = ":root {\n";

  // Color variables
  palette.forEach((hue) => {
    hue.colors.forEach((c) => {
      css += `  --color-${hue.name}-${c.stop}: ${c.hex};\n`;
    });
  });

  // Semantic token variables
  css += "\n  /* Semantic tokens */\n";
  Object.entries(tokens).forEach(([token, hueName]) => {
    const hue = palette.find((p) => p.name === hueName);
    if (hue) {
      hue.colors.forEach((c) => {
        css += `  --${token}-${c.stop}: var(--color-${hueName}-${c.stop});\n`;
      });
    }
  });

  css += "}\n";
  return css;
};

/**
 * Export palette to Tailwind config
 * @param {Array} palette - Generated palette
 * @returns {string} Tailwind config string
 */
export const exportToTailwind = (palette) => {
  const colors = {};
  palette.forEach((hue) => {
    colors[hue.name] = {};
    hue.colors.forEach((c) => {
      colors[hue.name][c.stop] = c.hex;
    });
  });

  const colorsJs = JSON.stringify(colors, null, 2)
    .replace(/"/g, "'")
    .replace(/\n/g, "\n      ");

  return `module.exports = {
  theme: {
    extend: {
      colors: ${colorsJs},
    },
  },
};
`;
};

/**
 * Export palette as a Tailwind CSS v4 @theme block (OKLCH values)
 * @param {Array} palette - Generated palette
 * @returns {string} CSS string
 */
export const exportToTailwindTheme = (palette) => {
  let css = "@theme {\n";
  palette.forEach((hue) => {
    hue.colors.forEach((c) => {
      css += `  --color-${hue.name}-${c.stop}: ${c.oklch};\n`;
    });
  });
  css += "}\n";
  return css;
};

/**
 * Export palette to SCSS variables
 * @param {Array} palette - Generated palette
 * @param {Object} tokens - Semantic tokens
 * @returns {string} SCSS string
 */
export const exportToSCSS = (palette, tokens) => {
  let scss = "// Color palette\n";

  // Color variables
  palette.forEach((hue) => {
    hue.colors.forEach((c) => {
      scss += `$${hue.name}-${c.stop}: ${c.hex};\n`;
    });
    scss += "\n";
  });

  // Semantic token variables
  scss += "// Semantic tokens\n";
  Object.entries(tokens).forEach(([token, hueName]) => {
    const hue = palette.find((p) => p.name === hueName);
    if (hue) {
      hue.colors.forEach((c) => {
        scss += `$${token}-${c.stop}: $${hueName}-${c.stop};\n`;
      });
    }
  });

  return scss;
};
