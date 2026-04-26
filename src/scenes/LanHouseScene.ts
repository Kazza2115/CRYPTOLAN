import Phaser from 'phaser';
import { Colors, Fonts, Layout } from '../config/theme';
import { ROOM_COLS, ROOM_ROWS } from '../config/iso';
import { AmbientBackground } from '../entities/AmbientBackground';
import { CounterDesk } from '../entities/CounterDesk';
import { HudPanel } from '../entities/HudPanel';
import { IsoPcStation, type StationOrientation } from '../entities/IsoPcStation';
import { RoomView } from '../entities/RoomView';
import { loadGameData } from '../systems/DataLoader';
import type { GameData } from '../types';

interface StationLayout {
  readonly worldX: number;
  readonly worldY: number;
  readonly orientation: StationOrientation;
}

const BACK_WALL_STATIONS: readonly StationLayout[] = [
  { worldX: 1.2, worldY: 0.7, orientation: 'back-wall' },
  { worldX: 2.7, worldY: 0.7, orientation: 'back-wall' },
  { worldX: 4.2, worldY: 0.7, orientation: 'back-wall' },
  { worldX: 5.7, worldY: 0.7, orientation: 'back-wall' },
  { worldX: 7.2, worldY: 0.7, orientation: 'back-wall' },
];

const RIGHT_WALL_STATIONS: readonly StationLayout[] = [
  { worldX: 9.0, worldY: 1.5, orientation: 'right-wall' },
  { worldX: 9.0, worldY: 2.7, orientation: 'right-wall' },
  { worldX: 9.0, worldY: 3.9, orientation: 'right-wall' },
  { worldX: 9.0, worldY: 5.1, orientation: 'right-wall' },
  { worldX: 9.0, worldY: 6.2, orientation: 'right-wall' },
];

export class LanHouseScene extends Phaser.Scene {
  private gameData!: GameData;
  private ambient!: AmbientBackground;
  private worldRoot!: Phaser.GameObjects.Container;
  private zoneLabel!: Phaser.GameObjects.Text;
  private subtitle!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'LanHouseScene' });
  }

  create(): void {
    this.gameData = loadGameData();
    this.cameras.main.setBackgroundColor(Colors.bgPrimary);

    this.ambient = new AmbientBackground(this);
    this.worldRoot = this.add.container(0, 0);
    this.buildScene();

    new HudPanel(this);
    this.drawZoneCaption();

    this.scale.on('resize', this.onResize, this);
  }

  override update(time: number): void {
    this.ambient.update(time);
  }

  private buildScene(): void {
    this.worldRoot.removeAll(true);

    const room = new RoomView(this);
    this.worldRoot.add(room);

    const counter = new CounterDesk(this, ROOM_COLS / 2 + 0.4, ROOM_ROWS / 2 + 0.2);
    this.worldRoot.add(counter);

    const layouts: readonly StationLayout[] = [
      ...BACK_WALL_STATIONS,
      ...RIGHT_WALL_STATIONS,
    ];

    this.gameData.pcs.forEach((pc, index) => {
      const layout = layouts[index];
      if (!layout) return;
      const station = new IsoPcStation(this, pc, layout);
      this.worldRoot.add(station);

      station.alpha = 0;
      this.tweens.add({
        targets: station,
        alpha: 1,
        duration: 420,
        ease: 'Sine.easeOut',
        delay: 60 * index,
      });
    });

    this.centerWorld();
  }

  private centerWorld(): void {
    const { width, height } = this.scale;
    const targetX = width / 2;
    const targetY = (height + Layout.hudHeight) / 2 - 40;
    this.worldRoot.setPosition(targetX, targetY - 80);
  }

  private drawZoneCaption(): void {
    const { width } = this.scale;

    this.zoneLabel = this.add
      .text(width / 2, Layout.hudHeight + 26, 'Garage', {
        fontFamily: Fonts.body,
        fontSize: '30px',
        fontStyle: '800',
        color: '#f8fafc',
      })
      .setOrigin(0.5, 0.5);
    this.zoneLabel.setLetterSpacing(1);

    this.subtitle = this.add
      .text(
        width / 2,
        Layout.hudHeight + 56,
        '5 PCs en service · 5 emplacements a construire',
        {
          fontFamily: Fonts.body,
          fontSize: '13px',
          fontStyle: '600',
          color: '#94a3b8',
        },
      )
      .setOrigin(0.5, 0.5);
    this.subtitle.setAlpha(0.85);
  }

  private onResize = (gameSize: Phaser.Structs.Size): void => {
    const { width } = gameSize;
    this.zoneLabel.setPosition(width / 2, Layout.hudHeight + 26);
    this.subtitle.setPosition(width / 2, Layout.hudHeight + 56);
    this.centerWorld();
  };
}
