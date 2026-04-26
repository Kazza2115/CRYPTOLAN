import Phaser from 'phaser';
import { Colors, Fonts } from '../config/theme';
import { TILE_H, TILE_W, iso } from '../config/iso';
import type { Pc } from '../types';

const DESK_DEPTH = 1.0;
const DESK_WIDTH = 1.4;
const DESK_TOP_Z = 38;

const SCREEN_HEIGHT = 56;
const SCREEN_WIDTH_PX = 60;
const SCREEN_THICKNESS = 6;

const TOWER_WIDTH = 14;
const TOWER_DEPTH = 14;
const TOWER_HEIGHT = 50;

const CHAIR_BACK_HEIGHT = 90;
const CHAIR_SEAT_Z = 28;
const CHAIR_WIDTH_PX = 38;

export type StationOrientation = 'back-wall' | 'right-wall';

interface StationConfig {
  readonly worldX: number;
  readonly worldY: number;
  readonly orientation: StationOrientation;
}

export class IsoPcStation extends Phaser.GameObjects.Container {
  private readonly graphics: Phaser.GameObjects.Graphics;
  private readonly screenGlow: Phaser.GameObjects.Graphics;
  private readonly label: Phaser.GameObjects.Text;
  private screenTween: Phaser.Tweens.Tween | null = null;
  private readonly pc: Pc;
  private readonly orientation: StationOrientation;

  constructor(scene: Phaser.Scene, pc: Pc, config: StationConfig) {
    const { worldX, worldY, orientation } = config;
    const screen = iso(worldX, worldY);
    super(scene, screen.x, screen.y);

    this.pc = pc;
    this.orientation = orientation;
    this.setDepth((worldX + worldY) * 1000);

    this.graphics = scene.add.graphics();
    this.screenGlow = scene.add.graphics();
    this.add([this.screenGlow, this.graphics]);

    this.label = scene.add.text(0, TILE_H * 0.9, `PC ${pc.slotIndex + 1}`, {
      fontFamily: Fonts.body,
      fontSize: '12px',
      fontStyle: '700',
      color: pc.locked ? '#64748b' : '#94a3b8',
    });
    this.label.setOrigin(0.5, 0);
    this.add(this.label);

    if (pc.locked) {
      this.drawLockedFootprint();
    } else {
      this.drawDesk();
      this.drawTower();
      this.drawChair();
      this.drawScreen();
      this.startIdleAnimations();
    }

    scene.add.existing(this);
  }

  private localPoint(wx: number, wy: number, wz = 0): { x: number; y: number } {
    const p = iso(wx, wy, wz);
    return { x: p.x - this.x, y: p.y - this.y };
  }

  private drawLockedFootprint(): void {
    const g = this.graphics;
    const halfW = DESK_WIDTH / 2;
    const halfD = DESK_DEPTH / 2;

    const a = this.localPoint(-halfW, -halfD);
    const b = this.localPoint(halfW, -halfD);
    const c = this.localPoint(halfW, halfD);
    const d = this.localPoint(-halfW, halfD);

    const dashPattern = (start: { x: number; y: number }, end: { x: number; y: number }) => {
      const dashLen = 8;
      const gapLen = 6;
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const len = Math.hypot(dx, dy);
      const ux = dx / len;
      const uy = dy / len;
      let traveled = 0;
      while (traveled < len) {
        const remaining = Math.min(dashLen, len - traveled);
        g.lineBetween(
          start.x + ux * traveled,
          start.y + uy * traveled,
          start.x + ux * (traveled + remaining),
          start.y + uy * (traveled + remaining),
        );
        traveled += dashLen + gapLen;
      }
    };

    g.lineStyle(2, Colors.function.success, 0.55);
    dashPattern(a, b);
    dashPattern(b, c);
    dashPattern(c, d);
    dashPattern(d, a);

    g.fillStyle(Colors.function.success, 0.06);
    g.beginPath();
    g.moveTo(a.x, a.y);
    g.lineTo(b.x, b.y);
    g.lineTo(c.x, c.y);
    g.lineTo(d.x, d.y);
    g.closePath();
    g.fillPath();

    const center = this.localPoint(0, 0);
    g.fillStyle(Colors.function.success, 0.85);
    g.fillCircle(center.x, center.y, 14);
    g.fillStyle(Colors.bgPrimary, 1);
    const plus = 6;
    g.fillRect(center.x - plus, center.y - 1.5, plus * 2, 3);
    g.fillRect(center.x - 1.5, center.y - plus, 3, plus * 2);

    this.label.setText('Construire');
    this.label.setColor('#22c55e');
  }

  private drawDesk(): void {
    const g = this.graphics;
    const halfW = DESK_WIDTH / 2;
    const halfD = DESK_DEPTH / 2;

    const topNW = this.localPoint(-halfW, -halfD, DESK_TOP_Z);
    const topNE = this.localPoint(halfW, -halfD, DESK_TOP_Z);
    const topSE = this.localPoint(halfW, halfD, DESK_TOP_Z);
    const topSW = this.localPoint(-halfW, halfD, DESK_TOP_Z);

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
    g.moveTo(topNW.x, topNW.y);
    g.lineTo(topNE.x, topNE.y);
    g.lineTo(topSE.x, topSE.y);
    g.lineTo(topSW.x, topSW.y);
    g.closePath();
    g.fillPath();

    g.lineStyle(1, Colors.bgPanelLight, 0.4);
    g.strokePath();

    const botSW = this.localPoint(-halfW, halfD, 0);
    const botSE = this.localPoint(halfW, halfD, 0);
    g.fillStyle(Colors.surface.deskFront, 1);
    g.beginPath();
    g.moveTo(topSW.x, topSW.y);
    g.lineTo(topSE.x, topSE.y);
    g.lineTo(botSE.x, botSE.y);
    g.lineTo(botSW.x, botSW.y);
    g.closePath();
    g.fillPath();

    const botNE = this.localPoint(halfW, -halfD, 0);
    g.fillStyle(0x0e1326, 1);
    g.beginPath();
    g.moveTo(topNE.x, topNE.y);
    g.lineTo(topSE.x, topSE.y);
    g.lineTo(botSE.x, botSE.y);
    g.lineTo(botNE.x, botNE.y);
    g.closePath();
    g.fillPath();

    g.lineStyle(1, Colors.bgPanelLight, 0.25);
    g.lineBetween(topSW.x, topSW.y, botSW.x, botSW.y);
    g.lineBetween(topSE.x, topSE.y, botSE.x, botSE.y);
  }

  private drawTower(): void {
    const g = this.graphics;
    const towerSide = this.orientation === 'back-wall' ? 1 : -1;
    const tx = (DESK_WIDTH / 2 - 0.18) * towerSide;
    const ty = -DESK_DEPTH / 2 + 0.3;

    const baseZ = DESK_TOP_Z;
    const topZ = DESK_TOP_Z + TOWER_HEIGHT;

    const halfW = TOWER_WIDTH / TILE_W;
    const halfD = TOWER_DEPTH / TILE_H;

    const topFL = this.localPoint(tx - halfW, ty - halfD, topZ);
    const topFR = this.localPoint(tx + halfW, ty - halfD, topZ);
    const topBR = this.localPoint(tx + halfW, ty + halfD, topZ);
    const topBL = this.localPoint(tx - halfW, ty + halfD, topZ);
    const botBL = this.localPoint(tx - halfW, ty + halfD, baseZ);
    const botBR = this.localPoint(tx + halfW, ty + halfD, baseZ);
    const botFR = this.localPoint(tx + halfW, ty - halfD, baseZ);

    g.fillStyle(Colors.surface.pcTowerLight, 1);
    g.beginPath();
    g.moveTo(topFL.x, topFL.y);
    g.lineTo(topFR.x, topFR.y);
    g.lineTo(topBR.x, topBR.y);
    g.lineTo(topBL.x, topBL.y);
    g.closePath();
    g.fillPath();

    g.fillStyle(Colors.surface.pcTowerDark, 1);
    g.beginPath();
    g.moveTo(topFR.x, topFR.y);
    g.lineTo(topBR.x, topBR.y);
    g.lineTo(botBR.x, botBR.y);
    g.lineTo(botFR.x, botFR.y);
    g.closePath();
    g.fillPath();

    g.fillStyle(0x0a0e1c, 1);
    g.beginPath();
    g.moveTo(topBL.x, topBL.y);
    g.lineTo(topBR.x, topBR.y);
    g.lineTo(botBR.x, botBR.y);
    g.lineTo(botBL.x, botBL.y);
    g.closePath();
    g.fillPath();

    g.lineStyle(1, Colors.bgPanelLight, 0.4);
    g.lineBetween(topFL.x, topFL.y, topFR.x, topFR.y);
    g.lineBetween(topFR.x, topFR.y, topBR.x, topBR.y);
    g.lineBetween(topBR.x, topBR.y, botBR.x, botBR.y);

    const ledOffset = 8;
    g.fillStyle(Colors.function.coin, 1);
    g.fillCircle(
      (topFR.x + topBR.x) / 2,
      (topFR.y + topBR.y) / 2 + ledOffset,
      2,
    );
  }

  private drawChair(): void {
    const g = this.graphics;
    const halfW = DESK_WIDTH / 2;
    const halfD = DESK_DEPTH / 2;

    const cx = 0;
    const cy = halfD + 0.6;

    const baseScreen = this.localPoint(cx, cy, 0);
    g.fillStyle(0x0a0e1c, 1);
    g.fillEllipse(baseScreen.x, baseScreen.y + 4, CHAIR_WIDTH_PX + 6, 14);

    g.lineStyle(1.5, Colors.bgPanelLight, 0.45);
    for (let i = 0; i < 5; i++) {
      const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
      const lx = baseScreen.x + Math.cos(angle) * 22;
      const ly = baseScreen.y + Math.sin(angle) * 11;
      g.lineBetween(baseScreen.x, baseScreen.y, lx, ly);
      g.fillStyle(Colors.bgPanelLight, 1);
      g.fillCircle(lx, ly, 2);
    }

    const seatScreen = this.localPoint(cx, cy, CHAIR_SEAT_Z);
    g.fillStyle(0x161b32, 1);
    g.fillEllipse(seatScreen.x, seatScreen.y, CHAIR_WIDTH_PX, 14);
    g.lineStyle(1, Colors.bgPanelLight, 0.4);
    g.strokeEllipse(seatScreen.x, seatScreen.y, CHAIR_WIDTH_PX, 14);

    const backTopZ = CHAIR_SEAT_Z + CHAIR_BACK_HEIGHT;
    const backBotZ = CHAIR_SEAT_Z + 6;

    const backWidth = halfW * 0.95;
    const backNearY = cy + 0.05;

    const tlA = this.localPoint(-backWidth, backNearY, backTopZ);
    const trA = this.localPoint(backWidth, backNearY, backTopZ);
    const blA = this.localPoint(-backWidth, backNearY, backBotZ);
    const brA = this.localPoint(backWidth, backNearY, backBotZ);

    g.fillGradientStyle(0x12172c, 0x12172c, 0x1c2143, 0x1c2143, 1, 1, 1, 1);
    g.beginPath();
    g.moveTo(tlA.x, tlA.y);
    g.lineTo(trA.x, trA.y);
    g.lineTo(brA.x, brA.y);
    g.lineTo(blA.x, blA.y);
    g.closePath();
    g.fillPath();

    g.lineStyle(1.5, Colors.bgPanelLight, 0.45);
    g.strokePath();

    const wingW = 6;
    g.fillStyle(0x0c1024, 1);
    g.fillRect(tlA.x - 1, tlA.y, wingW, blA.y - tlA.y);
    g.fillRect(trA.x - wingW + 1, trA.y, wingW, brA.y - trA.y);

    const accent = pcAccentColor(this.pc);
    g.fillStyle(accent, 0.8);
    g.fillRect(tlA.x + 4, tlA.y + 2, 2, blA.y - tlA.y - 4);
    g.fillRect(trA.x - 6, trA.y + 2, 2, brA.y - trA.y - 4);

    const headTopZ = backTopZ + 12;
    const headBotZ = backTopZ - 4;
    const headWidth = backWidth * 0.55;
    const htlA = this.localPoint(-headWidth, backNearY, headTopZ);
    const htrA = this.localPoint(headWidth, backNearY, headTopZ);
    const hblA = this.localPoint(-headWidth, backNearY, headBotZ);
    const hbrA = this.localPoint(headWidth, backNearY, headBotZ);
    g.fillStyle(0x0c1024, 1);
    g.beginPath();
    g.moveTo(htlA.x, htlA.y);
    g.lineTo(htrA.x, htrA.y);
    g.lineTo(hbrA.x, hbrA.y);
    g.lineTo(hblA.x, hblA.y);
    g.closePath();
    g.fillPath();
    g.lineStyle(1, Colors.bgPanelLight, 0.4);
    g.strokePath();
  }

  private drawScreen(): void {
    const g = this.graphics;
    const glow = this.screenGlow;

    const screenAnchor = this.localPoint(0, -DESK_DEPTH / 2 + 0.18, DESK_TOP_Z);
    const standBaseY = screenAnchor.y;
    const standTopY = standBaseY - 14;

    g.fillStyle(0x0c1024, 1);
    g.fillRect(screenAnchor.x - 8, standTopY, 16, 4);
    g.fillRect(screenAnchor.x - 2, standTopY - 14, 4, 14);

    const sx = screenAnchor.x - SCREEN_WIDTH_PX / 2;
    const sy = standTopY - 14 - SCREEN_HEIGHT;

    g.fillStyle(0x0a0e1c, 1);
    g.fillRoundedRect(sx - SCREEN_THICKNESS, sy - SCREEN_THICKNESS, SCREEN_WIDTH_PX + SCREEN_THICKNESS * 2, SCREEN_HEIGHT + SCREEN_THICKNESS * 2, 4);

    const accent = pcAccentColor(this.pc);
    g.fillGradientStyle(accent, accent, 0x0c1024, 0x0c1024, 0.55, 0.55, 1, 1);
    g.fillRoundedRect(sx, sy, SCREEN_WIDTH_PX, SCREEN_HEIGHT, 2);

    g.fillStyle(0xf8fafc, 0.18);
    g.fillRect(sx + 4, sy + 4, SCREEN_WIDTH_PX - 8, 2);

    glow.clear();
    glow.fillStyle(accent, 0.22);
    glow.fillRoundedRect(sx - 12, sy - 12, SCREEN_WIDTH_PX + 24, SCREEN_HEIGHT + 24, 8);

    if (this.scene.renderer.type === Phaser.WEBGL) {
      this.graphics.postFX?.addGlow(accent, 0.6, 0, false, 0.1, 6);
    }
  }

  private startIdleAnimations(): void {
    this.screenTween?.stop();
    this.screenGlow.alpha = 0.6;
    this.screenTween = this.scene.tweens.add({
      targets: this.screenGlow,
      alpha: { from: 0.35, to: 0.85 },
      duration: 1800 + Math.random() * 600,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
    });
  }

  override destroy(fromScene?: boolean): void {
    this.screenTween?.stop();
    super.destroy(fromScene);
  }
}

function pcAccentColor(pc: Pc): number {
  if (pc.locked) return Colors.bgPanelLight;
  switch (pc.tier) {
    case 'pro':
      return Colors.rarity.legend;
    case 'rgb':
      return Colors.rarity.esport;
    case 'gamer':
      return Colors.rarity.pro;
    default:
      return Colors.function.coin;
  }
}
