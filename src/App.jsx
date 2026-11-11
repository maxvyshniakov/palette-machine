import React from 'react';
import {
  Monitor,
  RotateCcw,
  Undo2,
  Redo2,
  Eye,
  Sun,
  Moon,
} from 'lucide-react';

import { PaletteProvider, usePalette } from './context/PaletteContext';
import { Tooltip } from './components/UI';
import ErrorBoundary from './components/ErrorBoundary';

// Tab components
import PaletteTab from './components/tabs/PaletteTab';
import ShadesTab from './components/tabs/ShadesTab';
import HuesTab from './components/tabs/HuesTab';
import JsonTab from './components/tabs/JsonTab';
import FigmaTab from './components/tabs/FigmaTab';

function AppContent() {
  const ctx = usePalette();
  const {
    theme,
    paletteData,
    display,
    history,
    handleUndo,
    handleRedo,
    resetToDefaults,
    activeTab,
    setActiveTab,
  } = ctx;

  const {
    isDark,
    currentBg,
    textColor,
    textMuted,
    borderColor,
    nativeColorSpace,
    previewColorSpace,
    setPreviewColorSpace,
  } = theme;

  const { grayscalePreview, setGrayscalePreview } = display;
  const { stats } = paletteData;
  const { canUndo, canRedo } = history;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: currentBg, color: textColor }}
    >
      <div className="flex flex-col h-screen">
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-2 flex-shrink-0"
          style={{ backgroundColor: isDark ? '#1f1f1f' : '#f5f5f5' }}
        >
          <div className="flex items-center gap-3">
            <h1 className="text-base font-bold">Palette Machine</h1>
            <span
              className="text-xs px-2 py-0.5 rounded"
              style={{
                backgroundColor: isDark ? '#333' : '#f0f0f0',
                color: textMuted,
              }}
            >
              {stats.hueCount}×{stats.shadeCount} = {stats.totalColors} colors
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* Undo/Redo */}
            <div className="flex items-center gap-0.5 mr-2">
              <Tooltip content="Undo (⌘Z)" isDark={isDark}>
                <button
                  onClick={handleUndo}
                  disabled={!canUndo}
                  className="p-1.5 rounded hover:bg-gray-500/20 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Undo2 className="w-4 h-4" style={{ color: textMuted }} />
                </button>
              </Tooltip>
              <Tooltip content="Redo (⌘⇧Z)" isDark={isDark}>
                <button
                  onClick={handleRedo}
                  disabled={!canRedo}
                  className="p-1.5 rounded hover:bg-gray-500/20 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Redo2 className="w-4 h-4" style={{ color: textMuted }} />
                </button>
              </Tooltip>
            </div>

            <Tooltip content="Reset to defaults" isDark={isDark}>
              <button
                onClick={resetToDefaults}
                className="p-1.5 rounded hover:bg-gray-500/20"
              >
                <RotateCcw className="w-4 h-4" style={{ color: textMuted }} />
              </button>
            </Tooltip>

            <div
              className="w-px h-5 mx-1"
              style={{ backgroundColor: borderColor }}
            />

            {/* Gamut selector */}
            <div className="flex items-center gap-1.5 text-xs">
              <Monitor className="w-4 h-4" style={{ color: textMuted }} />
              <select
                value={previewColorSpace}
                onChange={(e) => setPreviewColorSpace(e.target.value)}
                className="bg-transparent border-none text-xs cursor-pointer pr-4"
                style={{ color: textMuted }}
              >
                <option value="native">
                  Native ({nativeColorSpace === 'p3' ? 'P3' : 'sRGB'})
                </option>
                <option value="srgb">Force sRGB</option>
                {nativeColorSpace === 'p3' && (
                  <option value="p3">Force P3</option>
                )}
              </select>
            </div>

            {/* Grayscale preview toggle */}
            <Tooltip
              content={grayscalePreview ? 'Color preview' : 'Grayscale preview'}
              isDark={isDark}
            >
              <button
                onClick={() => setGrayscalePreview(!grayscalePreview)}
                className={`p-1.5 rounded hover:bg-gray-500/20 ${
                  grayscalePreview ? 'bg-gray-500/20' : ''
                }`}
              >
                <Eye
                  className="w-4 h-4"
                  style={{ color: grayscalePreview ? textColor : textMuted }}
                />
              </button>
            </Tooltip>

            {/* Theme toggle */}
            <Tooltip
              content={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              isDark={isDark}
            >
              <button
                onClick={() => theme.setMode(isDark ? 'light' : 'dark')}
                className="p-1.5 rounded hover:bg-gray-500/20"
              >
                {isDark ? (
                  <Sun className="w-4 h-4" style={{ color: textMuted }} />
                ) : (
                  <Moon className="w-4 h-4" style={{ color: textMuted }} />
                )}
              </button>
            </Tooltip>

            {/* Tab buttons */}
            <div className="flex gap-1.5">
              {['palette', 'shades', 'hues', 'json', 'figma'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 text-xs font-medium rounded capitalize ${
                    activeTab === tab ? 'bg-blue-600 text-white' : ''
                  }`}
                  style={{
                    color: activeTab === tab ? undefined : textColor,
                    backgroundColor:
                      activeTab === tab
                        ? undefined
                        : isDark
                        ? 'rgba(255,255,255,0.08)'
                        : 'rgba(0,0,0,0.05)',
                  }}
                >
                  {tab === 'json' ? 'JSON' : tab === 'figma' ? 'Figma' : tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <ErrorBoundary resetKey={activeTab}>
          {activeTab === 'palette' && <PaletteTab />}
          {activeTab === 'shades' && <ShadesTab />}
          {activeTab === 'hues' && <HuesTab />}
          {activeTab === 'json' && <JsonTab />}
          {activeTab === 'figma' && <FigmaTab />}
        </ErrorBoundary>
      </div>
    </div>
  );
}

function App() {
  return (
    <PaletteProvider>
      <AppContent />
    </PaletteProvider>
  );
}

export default App;
