import Phaser from 'phaser';
import { Colors } from '../config/theme';
import { ROOM_COLS, ROOM_ROWS, TILE_H, TILE_W, WALL_HEIGHT, iso } from '../config/iso';

export class RoomView extends Phaser.GameObjects.Container {
  private readonly graphics: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0);
    scene.add.existing(this);
    this.graphics = scene.add.graphics();
    this.add(this.graphics);
    this.draw();
  }

  private draw(): void {
    this.drawWalls();
    this.drawFloor();
    this.drawWallTrim();
    this.drawHexDecor();
  }

  private drawWalls(): void {
    const g = this.graphics;

    const backTopFar = iso(0, 0, WALL_HEIGHT);
    const backTopNear = iso(ROOM_COLS, 0, WALL_HEIGHT);
    const backBotNear = iso(ROOM_COLS, 0, 0);
    const backBotFar = iso(0, 0, 0);

    g.fillGradientStyle(
      0x141a30,
      0x141a30,
      Colors.bgSecondary,
      Colors.bgSecondary,
      1,
      1,
      1,
      1,
    );
    g.beginPath();
    g.moveTo(backTopFar.x, backTopFar.y);
    g.lineTo(backTopNear.x, backTopNear.y);
    g.lineTo(backBotNear.x, backBotNear.y);
    g.lineTo(backBotFar.x, backBotFar.y);
    g.closePath();
    g.fillPath();
    g.lineStyle(1.5, Colors.bgPanelLight, 0.45);
    g.strokePath();

    const rightTopFar = iso(ROOM_COLS, 0, WALL_HEIGHT);
    const rightTopNear = iso(ROOM_COLS, ROOM_ROWS, WALL_HEIGHT);
    const rightBotNear = iso(ROOM_COLS, ROOM_ROWS, 0);
    const rightBotFar = iso(ROOM_COLS, 0, 0);

    g.fillGradientStyle(
      Colors.bgSecondary,
      Colors.bgSecondary,
      0x0e1326,
      0x0e1326,
      1,
      1,
      1,
      1,
    );
    g.beginPath();
    g.moveTo(rightTopFar.x, rightTopFar.y);
    g.lineTo(rightTopNear.x, rightTopNear.y);
    g.lineTo(rightBotNear.x, rightBotNear.y);
    g.lineTo(rightBotFar.x, rightBotFar.y);
    g.closePath();
    g.fillPath();
    g.lineStyle(1.5, Colors.bgPanelLight, 0.35);
    g.strokePath();
  }

  private drawFloor(): void {
    const g = this.graphics;

    const a = iso(0, 0);
    const b = iso(ROOM_COLS, 0);
    const c = iso(ROOM_COLS, ROOM_ROWS);
    const d = iso(0, ROOM_ROWS);

    g.fillGradientStyle(
      0x141a30,
      Colors.surface.floorLight,
      0x12182e,
      Colors.surface.floorDark,
      1,
      1,
      1,
      1,
    );
    g.beginPath();
    g.moveTo(a.x, a.y);
    g.lineTo(b.x, b.y);
    g.lineTo(c.x, c.y);
    g.lineTo(d.x, d.y);
    g.closePath();
    g.fillPath();

    g.lineStyle(1, Colors.bgPanelLight, 0.18);
    for (let col = 1; col < ROOM_COLS; col++) {
      const p1 = iso(col, 0);
      const p2 = iso(col, ROOM_ROWS);
      g.lineBetween(p1.x, p1.y, p2.x, p2.y);
    }
    for (let row = 1; row < ROOM_ROWS; row++) {
      const p1 = iso(0, row);
      const p2 = iso(ROOM_COLS, row);
      g.lineBetween(p1.x, p1.y, p2.x, p2.y);
    }

    g.lineStyle(2, Colors.bgPanelLight, 0.55);
    g.beginPath();
    g.moveTo(a.x, a.y);
    g.lineTo(b.x, b.y);
    g.lineTo(c.x, c.y);
    g.lineTo(d.x, d.y);
    g.closePath();
    g.strokePath();
  }

  private drawWallTrim(): void {
    const g = this.graphics;

    const trimHeight = 6;

    const backLeft = iso(0, 0, trimHeight);
    const backRight = iso(ROOM_COLS, 0, trimHeight);
    g.lineStyle(2, Colors.function.primary, 0.5);
    g.lineBetween(backLeft.x, backLeft.y, backRight.x, backRight.y);

    const rightStart = iso(ROOM_COLS, 0, trimHeight);
    const rightEnd = iso(ROOM_COLS, ROOM_ROWS, trimHeight);
    g.lineBetween(rightStart.x, rightStart.y, rightEnd.x, rightEnd.y);

    g.lineStyle(1, Colors.function.coin, 0.25);
    const ceilingZ = WALL_HEIGHT - 8;
    const cBackL = iso(0, 0, ceilingZ);
    const cBackR = iso(ROOM_COLS, 0, ceilingZ);
    const cRightR = iso(ROOM_COLS, ROOM_ROWS, ceilingZ);
    g.lineBetween(cBackL.x, cBackL.y, cBackR.x, cBackR.y);
    g.lineBetween(cBackR.x, cBackR.y, cRightR.x, cRightR.y);
  }

  private drawHexDecor(): void {
    const g = this.graphics;

    const baseWorldX = ROOM_COLS * 0.55;
    const baseZ = WALL_HEIGHT * 0.62;
    const hexRadius = 14;
    const hexSpacing = 30;

    const positions: readonly { dx: number; dz: number; alpha: number }[] = [
      { dx: 0, dz: 0, alpha: 0.85 },
      { dx: 1, dz: 0, alpha: 0.7 },
      { dx: 2, dz: 0, alpha: 0.55 },
      { dx: 0.5, dz: 1, alpha: 0.7 },
      { dx: 1.5, dz: 1, alpha: 0.85 },
      { dx: 2.5, dz: 1, alpha: 0.6 },
      { dx: 1, dz: -1, alpha: 0.55 },
      { dx: 2, dz: -1, alpha: 0.45 },
      { dx: 0, dz: 2, alpha: 0.4 },
      { dx: 1.5, dz: 2, alpha: 0.55 },
    ];

    positions.forEach((p) => {
      const wx = baseWorldX + p.dx * 0.6;
      const z = baseZ + p.dz * hexSpacing;
      const screen = iso(wx, 0, z);
      this.drawHex(g, screen.x, screen.y, hexRadius, Colors.function.primary, p.alpha);
    });
  }

  private drawHex(
    g: Phaser.GameObjects.Graphics,
    cx: number,
    cy: number,
    r: number,
    color: number,
    alpha: number,
  ): void {
    g.lineStyle(1.5, color, alpha);
    g.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      const px = cx + Math.cos(angle) * r;
      const py = cy + Math.sin(angle) * r;
      if (i === 0) g.moveTo(px, py);
      else g.lineTo(px, py);
    }
    g.closePath();
    g.strokePath();
  }

  static getRoomCenterScreen(): { x: number; y: number } {
    const center = iso(ROOM_COLS / 2, ROOM_ROWS / 2);
    return center;
  }

  static getTileSize(): { w: number; h: number } {
    return { w: TILE_W, h: TILE_H };
  }
}
