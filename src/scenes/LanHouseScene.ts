import Phaser from 'phaser';
import { Colors } from '../config/theme';
import { ROOM_COLS, ROOM_ROWS, WALL_HEIGHT, iso } from '../config/iso';
import { AmbientBackground } from '../entities/AmbientBackground';
import { RoomBackground } from '../entities/RoomBackground';
import { RoomView } from '../entities/RoomView';
import { ASSET_KEYS } from './BootScene';
import { loadGameData } from '../systems/DataLoader';
import type { GameData } from '../types';

export class LanHouseScene extends Phaser.Scene {
  private gameData!: GameData;
  private worldRoot!: Phaser.GameObjects.Container;

  constructor() {
    super({ key: 'LanHouseScene' });
  }

  create(): void {
    this.gameData = loadGameData();
    void this.gameData;
    this.cameras.main.setBackgroundColor(Colors.voidBg);

    new AmbientBackground(this);
    this.worldRoot = this.add.container(0, 0);
    this.buildScene();

    this.scale.on('resize', this.onResize, this);
  }

  private buildScene(): void {
    this.worldRoot.removeAll(true);

    if (this.textures.exists(ASSET_KEYS.bgGarage)) {
      const bg = new RoomBackground(this, ASSET_KEYS.bgGarage);
      this.worldRoot.add(bg);
    } else {
      const room = new RoomView(this);
      this.worldRoot.add(room);
    }

    this.centerWorld();
  }

  private centerWorld(): void {
    const { width, height } = this.scale;
    const corners = [
      iso(0, 0, 0),
      iso(ROOM_COLS, 0, 0),
      iso(ROOM_COLS, ROOM_ROWS, 0),
      iso(0, ROOM_ROWS, 0),
      iso(0, 0, WALL_HEIGHT),
      iso(ROOM_COLS, 0, WALL_HEIGHT),
      iso(ROOM_COLS, ROOM_ROWS, WALL_HEIGHT),
    ];
    const minX = Math.min(...corners.map((c) => c.x));
    const maxX = Math.max(...corners.map((c) => c.x));
    const minY = Math.min(...corners.map((c) => c.y));
    const maxY = Math.max(...corners.map((c) => c.y));
    const sceneCenterX = (minX + maxX) / 2;
    const sceneCenterY = (minY + maxY) / 2;

    this.worldRoot.setPosition(width / 2 - sceneCenterX, height / 2 - sceneCenterY);
  }

  private onResize = (): void => {
    this.centerWorld();
  };
}
