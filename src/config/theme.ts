export const Colors = {
  bgPrimary: 0x1a1a2e,
  bgSecondary: 0x16213e,
  bgTertiary: 0x0f0f1a,

  textPrimary: 0xf8fafc,
  textSecondary: 0x94a3b8,

  rarity: {
    noob: 0x8a8a9a,
    gamer: 0x4ade80,
    pro: 0x3b82f6,
    esport: 0xa855f7,
    legend: 0xf59e0b,
  },

  function: {
    coin: 0x22d3ee,
    bust: 0xef4444,
    primary: 0x6366f1,
    success: 0x22c55e,
    danger: 0xdc2626,
  },
} as const;

export const ColorsHex = {
  bgPrimary: '#1a1a2e',
  bgSecondary: '#16213e',
  textPrimary: '#f8fafc',
  textSecondary: '#94a3b8',
} as const;

export const Fonts = {
  body: '"Nunito", sans-serif',
  mono: '"JetBrains Mono", monospace',
} as const;
