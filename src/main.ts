import Phaser from 'phaser';
import { ColorsHex } from './config/theme';
import { BootScene } from './scenes/BootScene';
import { LanHouseScene } from './scenes/LanHouseScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: ColorsHex.bgPrimary,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  render: {
    antialias: true,
    antialiasGL: true,
    pixelArt: false,
    roundPixels: false,
    powerPreference: 'high-performance',
  },
  scene: [BootScene, LanHouseScene],
};

const game = new Phaser.Game(config);

const applyHiDpi = (): void => {
  const dpr = window.devicePixelRatio || 1;
  const canvas = game.canvas;
  if (!canvas) return;
  const cssWidth = window.innerWidth;
  const cssHeight = window.innerHeight;
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssHeight}px`;
  game.scale.resize(cssWidth * dpr, cssHeight * dpr);
  const root = document.documentElement;
  root.style.setProperty('--dpr', String(dpr));
};

applyHiDpi();
window.addEventListener('resize', applyHiDpi);
