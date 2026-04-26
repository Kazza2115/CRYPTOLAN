import Phaser from 'phaser';
import { Colors, Fonts, Layout } from '../config/theme';
import { ROOM_COLS, ROOM_ROWS, WALL_HEIGHT, iso } from '../config/iso';
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

const BACK_ORIGIN_Y = 0.45;
const RIGHT_ORIGIN_X = 12.55;

const BACK_WALL_STATIONS: readonly StationLayout[] = [
  { worldX: 1.5, worldY: BACK_ORIGIN_Y, orientation: 'back-wall' },
  { worldX: 2.9, worldY: BACK_ORIGIN_Y, orientation: 'back-wall' },
  { worldX: 4.3, worldY: BACK_ORIGIN_Y, orientation: 'back-wall' },
  { worldX: 5.7, worldY: BACK_ORIGIN_Y, orientation: 'back-wall' },
  { worldX: 7.1, worldY: BACK_ORIGIN_Y, orientation: 'back-wall' },
];

const RIGHT_WALL_STATIONS: readonly StationLayout[] = [
  { worldX: RIGHT_ORIGIN_X, worldY: 2.4, orientation: 'right-wall' },
  { worldX: RIGHT_ORIGIN_X, worldY: 3.8, orientation: 'right-wall' },
  { worldX: RIGHT_ORIGIN_X, worldY: 5.2, orientation: 'right-wall' },
  { worldX: RIGHT_ORIGIN_X, worldY: 6.6, orientation: 'right-wall' },
  { worldX: RIGHT_ORIGIN_X, worldY: 8.0, orientation: 'right-wall' },
];

export class LanHouseScene extends Phaser.Scene {
  private gameData!: GameData;
  private worldRoot!: Phaser.GameObjects.Container;
  private zoneLabel!: Phaser.GameObjects.Text;
  private subtitle!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'LanHouseScene' });
  }

  create(): void {
    this.gameData = loadGameData();
    this.cameras.main.setBackgroundColor(Colors.bgPrimary);

    new AmbientBackground(this);
    this.worldRoot = this.add.container(0, 0);
    this.buildScene();

    new HudPanel(this);
    this.drawZoneCaption();

    this.scale.on('resize', this.onResize, this);
  }

  private buildScene(): void {
    this.worldRoot.removeAll(true);

    const room = new RoomView(this);
    this.worldRoot.add(room);

    const counter = new CounterDesk(this, 5.5, 4.3);
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
        duration: 320,
        ease: 'Sine.easeOut',
        delay: 40 * index,
      });
    });

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

    const availableTop = Layout.hudHeight + 92;
    const availableBottom = height - 40;
    const availableHeight = availableBottom - availableTop;
    const targetCenterY = availableTop + availableHeight / 2;

    this.worldRoot.setPosition(width / 2 - sceneCenterX, targetCenterY - sceneCenterY);
  }

  private drawZoneCaption(): void {
    const { width } = this.scale;

    this.zoneLabel = this.add
      .text(width / 2, Layout.hudHeight + 30, 'Garage', {
        fontFamily: Fonts.body,
        fontSize: '26px',
        fontStyle: '800',
        color: '#111111',
      })
      .setOrigin(0.5, 0.5);
    this.zoneLabel.setLetterSpacing(1);

    this.subtitle = this.add
      .text(
        width / 2,
        Layout.hudHeight + 58,
        '5 PCs en service · 5 emplacements a construire',
        {
          fontFamily: Fonts.body,
          fontSize: '12px',
          fontStyle: '600',
          color: '#888888',
        },
      )
      .setOrigin(0.5, 0.5);
  }

  private onResize = (gameSize: Phaser.Structs.Size): void => {
    const { width } = gameSize;
    this.zoneLabel.setPosition(width / 2, Layout.hudHeight + 30);
    this.subtitle.setPosition(width / 2, Layout.hudHeight + 58);
    this.centerWorld();
  };
}
