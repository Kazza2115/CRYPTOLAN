import Phaser from 'phaser';
import { Colors } from '../config/theme';
import { iso } from '../config/iso';

const COUNTER_W = 1.6;
const COUNTER_D = 1.0;
const COUNTER_H = 70;

export class CounterDesk extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, worldX: number, worldY: number) {
    const screen = iso(worldX, worldY);
    super(scene, screen.x, screen.y);
    this.setDepth((worldX + worldY) * 1000 - 100);

    const g = scene.add.graphics();
    this.add(g);

    const halfW = COUNTER_W / 2;
    const halfD = COUNTER_D / 2;

    const local = (wx: number, wy: number, wz = 0) => {
      const p = iso(worldX + wx, worldY + wy, wz);
      return { x: p.x - this.x, y: p.y - this.y };
    };

    const tNW = local(-halfW, -halfD, COUNTER_H);
    const tNE = local(halfW, -halfD, COUNTER_H);
    const tSE = local(halfW, halfD, COUNTER_H);
    const tSW = local(-halfW, halfD, COUNTER_H);

    g.fillGradientStyle(
      Colors.surface.deskTopLight,
      Colors.surface.deskTop,
      Colors.surface.deskTop,
      Colors.surface.deskFront,
      1,
      1,
      1,
      1,
    );
    g.beginPath();
    g.moveTo(tNW.x, tNW.y);
    g.lineTo(tNE.x, tNE.y);
    g.lineTo(tSE.x, tSE.y);
    g.lineTo(tSW.x, tSW.y);
    g.closePath();
    g.fillPath();
    g.lineStyle(1, Colors.bgPanelLight, 0.4);
    g.strokePath();

    const bSW = local(-halfW, halfD, 0);
    const bSE = local(halfW, halfD, 0);
    g.fillStyle(Colors.surface.deskFront, 1);
    g.beginPath();
    g.moveTo(tSW.x, tSW.y);
    g.lineTo(tSE.x, tSE.y);
    g.lineTo(bSE.x, bSE.y);
    g.lineTo(bSW.x, bSW.y);
    g.closePath();
    g.fillPath();

    const bNE = local(halfW, -halfD, 0);
    g.fillStyle(0x0e1326, 1);
    g.beginPath();
    g.moveTo(tNE.x, tNE.y);
    g.lineTo(tSE.x, tSE.y);
    g.lineTo(bSE.x, bSE.y);
    g.lineTo(bNE.x, bNE.y);
    g.closePath();
    g.fillPath();

    const monitorAnchor = local(halfW * 0.4, -halfD * 0.5, COUNTER_H);
    g.fillStyle(0x0a0e1c, 1);
    g.fillRect(monitorAnchor.x - 18, monitorAnchor.y - 30, 36, 26);
    g.fillStyle(Colors.function.primary, 0.55);
    g.fillRect(monitorAnchor.x - 16, monitorAnchor.y - 28, 32, 22);

    const boxAnchor = local(-halfW * 0.4, -halfD * 0.4, COUNTER_H);
    g.fillStyle(Colors.surface.deskFront, 1);
    g.fillRect(boxAnchor.x - 10, boxAnchor.y - 10, 20, 12);
    g.lineStyle(1, Colors.bgPanelLight, 0.5);
    g.strokeRect(boxAnchor.x - 10, boxAnchor.y - 10, 20, 12);

    if (scene.renderer.type === Phaser.WEBGL) {
      g.postFX?.addGlow(Colors.function.primary, 0.6, 0, false, 0.1, 6);
    }

    scene.add.existing(this);
  }
}
