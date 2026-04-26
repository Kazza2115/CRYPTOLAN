import Phaser from 'phaser';

export const ASSET_KEYS = {
  bgGarage: 'bg-garage',
} as const;

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    const base = import.meta.env.BASE_URL;
    this.load.image(ASSET_KEYS.bgGarage, `${base}assets/bg/bg-room-garage.png`);

    this.load.on('loaderror', (file: Phaser.Loader.File) => {
      console.warn(`[crypto-lan] asset manquant: ${file.key} (${file.url}) — fallback line-art actif`);
    });
  }

  create(): void {
    this.scene.start('LanHouseScene');
  }
}
