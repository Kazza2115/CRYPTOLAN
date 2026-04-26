import Phaser from 'phaser';
import { Colors, Stroke } from '../config/theme';
import { iso } from '../config/iso';

const COUNTER_W = 1.8;
const COUNTER_D = 1.2;
const COUNTER_H = 76;

export class CounterDesk extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, worldX: number, worldY: number) {
    const screen = iso(worldX, worldY);
    super(scene, screen.x, screen.y);
    this.setDepth((worldX + worldY) * 1000 - 100);

    const g = scene.add.graphics();
    this.add(g);
    g.lineStyle(Stroke.medium, Colors.ink, 1);

    const halfW = COUNTER_W / 2;
    const halfD = COUNTER_D / 2;

    const local = (wx: number, wy: number, wz = 0): { x: number; y: number } => {
      const p = iso(worldX + wx, worldY + wy, wz);
      return { x: p.x - this.x, y: p.y - this.y };
    };

    const tNW = local(-halfW, -halfD, COUNTER_H);
    const tNE = local(halfW, -halfD, COUNTER_H);
    const tSE = local(halfW, halfD, COUNTER_H);
    const tSW = local(-halfW, halfD, COUNTER_H);

    g.beginPath();
    g.moveTo(tNW.x, tNW.y);
    g.lineTo(tNE.x, tNE.y);
    g.lineTo(tSE.x, tSE.y);
    g.lineTo(tSW.x, tSW.y);
    g.closePath();
    g.strokePath();

    const front = 30;
    const bSW = { x: tSW.x, y: tSW.y + front };
    const bSE = { x: tSE.x, y: tSE.y + front };
    g.beginPath();
    g.moveTo(tSW.x, tSW.y);
    g.lineTo(bSW.x, bSW.y);
    g.lineTo(bSE.x, bSE.y);
    g.lineTo(tSE.x, tSE.y);
    g.closePath();
    g.strokePath();

    const bNE = { x: tNE.x, y: tNE.y + front };
    g.beginPath();
    g.moveTo(tNE.x, tNE.y);
    g.lineTo(bNE.x, bNE.y);
    g.lineTo(bSE.x, bSE.y);
    g.closePath();
    g.strokePath();

    const monitorAnchor = local(halfW * 0.35, -halfD * 0.45, COUNTER_H);
    g.fillStyle(Colors.ink, 1);
    g.fillRect(monitorAnchor.x - 12, monitorAnchor.y - 22, 24, 18);
    g.lineStyle(Stroke.thin, Colors.ink, 1);
    g.fillStyle(Colors.bgPrimary, 1);
    g.fillRect(monitorAnchor.x - 1.5, monitorAnchor.y - 4, 3, 4);

    const boxAnchor = local(-halfW * 0.4, -halfD * 0.3, COUNTER_H);
    g.lineStyle(Stroke.medium, Colors.ink, 1);
    g.strokeRect(boxAnchor.x - 9, boxAnchor.y - 9, 18, 11);
    g.lineBetween(boxAnchor.x - 9, boxAnchor.y - 4, boxAnchor.x + 9, boxAnchor.y - 4);

    scene.add.existing(this);
  }
}
