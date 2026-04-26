import Phaser from 'phaser';
import { Colors, Stroke } from '../config/theme';
import { ROOM_COLS, ROOM_ROWS, WALL_HEIGHT, iso } from '../config/iso';

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
    this.drawRoomShell();
    this.drawHexDecor();
  }

  private drawRoomShell(): void {
    const g = this.graphics;
    g.lineStyle(Stroke.medium, Colors.ink, 1);

    const floorNW = iso(0, 0, 0);
    const floorNE = iso(ROOM_COLS, 0, 0);
    const floorSE = iso(ROOM_COLS, ROOM_ROWS, 0);
    const floorSW = iso(0, ROOM_ROWS, 0);

    g.beginPath();
    g.moveTo(floorNW.x, floorNW.y);
    g.lineTo(floorNE.x, floorNE.y);
    g.lineTo(floorSE.x, floorSE.y);
    g.lineTo(floorSW.x, floorSW.y);
    g.closePath();
    g.strokePath();

    const wallNW = iso(0, 0, WALL_HEIGHT);
    const wallNE = iso(ROOM_COLS, 0, WALL_HEIGHT);
    const wallSE = iso(ROOM_COLS, ROOM_ROWS, WALL_HEIGHT);

    g.beginPath();
    g.moveTo(floorNW.x, floorNW.y);
    g.lineTo(wallNW.x, wallNW.y);
    g.lineTo(wallNE.x, wallNE.y);
    g.lineTo(floorNE.x, floorNE.y);
    g.closePath();
    g.strokePath();

    g.beginPath();
    g.moveTo(floorNE.x, floorNE.y);
    g.lineTo(wallNE.x, wallNE.y);
    g.lineTo(wallSE.x, wallSE.y);
    g.lineTo(floorSE.x, floorSE.y);
    g.closePath();
    g.strokePath();

    g.lineStyle(Stroke.thin, Colors.ink, 1);
    g.lineBetween(wallNW.x, wallNW.y, wallNE.x, wallNE.y);
    g.lineBetween(wallNE.x, wallNE.y, wallSE.x, wallSE.y);
  }

  private drawHexDecor(): void {
    const g = this.graphics;

    const baseWorldX = ROOM_COLS * 0.62;
    const baseZ = WALL_HEIGHT * 0.62;
    const hexRadius = 11;
    const hexSpacing = 26;

    const positions: readonly { dx: number; dz: number }[] = [
      { dx: 0, dz: 0 },
      { dx: 1, dz: 0 },
      { dx: 2, dz: 0 },
      { dx: 0.5, dz: 1 },
      { dx: 1.5, dz: 1 },
      { dx: 2.5, dz: 1 },
      { dx: 1, dz: -1 },
      { dx: 2, dz: -1 },
      { dx: 0, dz: 2 },
      { dx: 1.5, dz: 2 },
    ];

    positions.forEach((p) => {
      const wx = baseWorldX + p.dx * 0.55;
      const z = baseZ + p.dz * hexSpacing;
      const screen = iso(wx, 0, z);
      this.drawHex(g, screen.x, screen.y, hexRadius);
    });
  }

  private drawHex(
    g: Phaser.GameObjects.Graphics,
    cx: number,
    cy: number,
    r: number,
  ): void {
    g.lineStyle(Stroke.thin, Colors.ink, 1);
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
}
