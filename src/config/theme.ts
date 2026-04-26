export const Colors = {
  bgPrimary: 0xffffff,
  bgSecondary: 0xf5f5f5,
  bgTertiary: 0xeeeeee,
  bgPanel: 0xffffff,
  bgPanelLight: 0xfafafa,

  voidBg: 0x15182a,

  ink: 0x111111,
  inkSoft: 0x444444,
  inkMuted: 0x888888,
  inkGhost: 0xcccccc,

  textPrimary: 0x111111,
  textSecondary: 0x555555,
  textMuted: 0x888888,

  rarity: {
    noob: 0x8a8a9a,
    gamer: 0x4ade80,
    pro: 0x3b82f6,
    esport: 0xa855f7,
    legend: 0xf59e0b,
  },

  function: {
    coin: 0x111111,
    energy: 0x111111,
    streetCred: 0x111111,
    bust: 0xef4444,
    primary: 0x111111,
    success: 0x22c55e,
    danger: 0xdc2626,
  },

  surface: {
    floorDark: 0xffffff,
    floorLight: 0xffffff,
    deskTop: 0xffffff,
    deskTopLight: 0xffffff,
    deskFront: 0xffffff,
    chairBack: 0xffffff,
    chairSeat: 0xffffff,
    pcTowerLight: 0xffffff,
    pcTowerDark: 0xffffff,
    screenFrame: 0x111111,
  },
} as const;

export const ColorsHex = {
  bgPrimary: '#ffffff',
  bgSecondary: '#f5f5f5',
  textPrimary: '#111111',
  textSecondary: '#555555',
  textMuted: '#888888',
  coin: '#111111',
  energy: '#111111',
  streetCred: '#111111',
} as const;

export const Fonts = {
  body: '"Nunito", sans-serif',
  mono: '"JetBrains Mono", monospace',
} as const;

export const Layout = {
  hudHeight: 64,
  hudPadding: 24,
  pcSpacing: 220,
  floorTopRatio: 0.55,
} as const;

export const Stroke = {
  thick: 2.5,
  medium: 1.8,
  thin: 1.2,
  dashed: 1.5,
} as const;
