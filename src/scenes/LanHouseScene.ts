import Phaser from 'phaser';
import { Colors } from '../config/theme';
import { AmbientBackground } from '../entities/AmbientBackground';
import { RoomBackground } from '../entities/RoomBackground';
import { RoomView } from '../entities/RoomView';
import { ASSET_KEYS } from './BootScene';
import { loadGameData } from '../systems/DataLoader';
import type { GameData } from '../types';

export class LanHouseScene extends Phaser.Scene {
  private gameData!: GameData;

  constructor() {
    super({ key: 'LanHouseScene' });
  }

  create(): void {
    this.gameData = loadGameData();
    void this.gameData;
    this.cameras.main.setBackgroundColor(Colors.voidBg);

    new AmbientBackground(this);

    if (this.textures.exists(ASSET_KEYS.bgGarage)) {
      new RoomBackground(this, ASSET_KEYS.bgGarage);
    } else {
      new RoomView(this);
    }
  }
}
