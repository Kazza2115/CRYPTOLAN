export const Colors = {
  bgPrimary: 0x1a1a2e,
  bgSecondary: 0x16213e,
  bgTertiary: 0x0f0f1a,
  bgPanel: 0x1f2747,
  bgPanelLight: 0x2a3358,

  textPrimary: 0xf8fafc,
  textSecondary: 0x94a3b8,
  textMuted: 0x64748b,

  rarity: {
    noob: 0x8a8a9a,
    gamer: 0x4ade80,
    pro: 0x3b82f6,
    esport: 0xa855f7,
    legend: 0xf59e0b,
  },

  function: {
    coin: 0x22d3ee,
    energy: 0xa855f7,
    streetCred: 0xf59e0b,
    bust: 0xef4444,
    primary: 0x6366f1,
    success: 0x22c55e,
    danger: 0xdc2626,
  },

  surface: {
    floorDark: 0x12182e,
    floorLight: 0x1c2545,
    deskTop: 0x2a3358,
    deskTopLight: 0x3a466e,
    deskFront: 0x1a2042,
    chairBack: 0x252d4f,
    chairSeat: 0x1a2042,
    pcTowerLight: 0x2a3358,
    pcTowerDark: 0x141a30,
    screenFrame: 0x0c1024,
  },
} as const;

export const ColorsHex = {
  bgPrimary: '#1a1a2e',
  bgSecondary: '#16213e',
  textPrimary: '#f8fafc',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  coin: '#22d3ee',
  energy: '#a855f7',
  streetCred: '#f59e0b',
} as const;

export const Fonts = {
  body: '"Nunito", sans-serif',
  mono: '"JetBrains Mono", monospace',
} as const;

export const Layout = {
  hudHeight: 88,
  hudPadding: 24,
  pcSpacing: 220,
  floorTopRatio: 0.55,
} as const;
