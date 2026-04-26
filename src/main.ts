import Phaser from 'phaser';
import { ColorsHex } from './config/theme';
import { BootScene } from './scenes/BootScene';
import { LanHouseScene } from './scenes/LanHouseScene';

const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: ColorsHex.bgPrimary,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
  },
  render: {
    antialias: true,
    pixelArt: false,
    roundPixels: false,
  },
  scene: [BootScene, LanHouseScene],
};

new Phaser.Game(config);
