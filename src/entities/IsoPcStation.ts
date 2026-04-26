import Phaser from 'phaser';
import { Colors, Fonts, Stroke } from '../config/theme';
import { iso } from '../config/iso';
import type { Pc } from '../types';

const DESK_DEPTH = 1.0;
const DESK_WIDTH = 1.5;
const DESK_TOP_Z = 38;
const DESK_FRONT_DEPTH = 30;

const SCREEN_WIDTH_PX = 56;
const SCREEN_HEIGHT_PX = 36;
const SCREEN_STAND_HEIGHT = 12;

const TOWER_WIDTH_W = 0.18;
const TOWER_DEPTH_W = 0.18;
const TOWER_HEIGHT = 46;

const CHAIR_BACK_HEIGHT = 92;
const CHAIR_SEAT_Z = 26;

export type StationOrientation = 'back-wall' | 'right-wall';

interface StationConfig {
  readonly worldX: number;
  readonly worldY: number;
  readonly orientation: StationOrientation;
}

export class IsoPcStation extends Phaser.GameObjects.Container {
  private readonly graphics: Phaser.GameObjects.Graphics;
  private readonly label: Phaser.GameObjects.Text;
  private readonly pc: Pc;
  private readonly orientation: StationOrientation;

  constructor(scene: Phaser.Scene, pc: Pc, config: StationConfig) {
    const { worldX, worldY, orientation } = config;
    const screen = iso(worldX, worldY);
    super(scene, screen.x, screen.y);

    this.pc = pc;
    void this.pc;
    this.orientation = orientation;
    this.setDepth((worldX + worldY) * 1000);

    this.graphics = scene.add.graphics();
    this.add(this.graphics);

    this.label = scene.add.text(0, 64, '', {
      fontFamily: Fonts.body,
      fontSize: '11px',
      fontStyle: '600',
      color: pc.locked ? '#888888' : '#111111',
    });
    this.label.setOrigin(0.5, 0);
    this.add(this.label);

    if (pc.locked) {
      this.drawLockedFootprint();
      this.label.setText(`Construire`);
    } else {
      this.drawDesk();
      this.drawTower();
      this.drawScreen();
      this.drawChair();
      this.label.setText(`PC ${pc.slotIndex + 1}`);
    }

    scene.add.existing(this);
  }

  private localPoint(wx: number, wy: number, wz = 0): { x: number; y: number } {
    const p = iso(wx, wy, wz);
    return { x: p.x - this.x, y: p.y - this.y };
  }

  private quadPath(
    g: Phaser.GameObjects.Graphics,
    p0: { x: number; y: number },
    cp: { x: number; y: number },
    p1: { x: number; y: number },
    segments = 14,
  ): { x: number; y: number } {
    let prev = p0;
    for (let i = 1; i <= segments; i++) {
      const t = i / segments;
      const omt = 1 - t;
      const x = omt * omt * p0.x + 2 * omt * t * cp.x + t * t * p1.x;
      const y = omt * omt * p0.y + 2 * omt * t * cp.y + t * t * p1.y;
      g.lineBetween(prev.x, prev.y, x, y);
      prev = { x, y };
    }
    return prev;
  }

  private drawLockedFootprint(): void {
    const g = this.graphics;
    const halfW = DESK_WIDTH / 2;
    const halfD = DESK_DEPTH / 2;

    const a = this.localPoint(-halfW, -halfD);
    const b = this.localPoint(halfW, -halfD);
    const c = this.localPoint(halfW, halfD);
    const d = this.localPoint(-halfW, halfD);

    const dashed = (start: { x: number; y: number }, end: { x: number; y: number }): void => {
      const dash = 7;
      const gap = 5;
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const len = Math.hypot(dx, dy);
      const ux = dx / len;
      const uy = dy / len;
      let traveled = 0;
      g.lineStyle(Stroke.dashed, Colors.inkGhost, 1);
      while (traveled < len) {
        const remaining = Math.min(dash, len - traveled);
        g.lineBetween(
          start.x + ux * traveled,
          start.y + uy * traveled,
          start.x + ux * (traveled + remaining),
          start.y + uy * (traveled + remaining),
        );
        traveled += dash + gap;
      }
    };

    dashed(a, b);
    dashed(b, c);
    dashed(c, d);
    dashed(d, a);

    const center = this.localPoint(0, 0);
    g.lineStyle(Stroke.medium, Colors.inkMuted, 1);
    g.strokeCircle(center.x, center.y, 11);
    const plus = 5;
    g.lineBetween(center.x - plus, center.y, center.x + plus, center.y);
    g.lineBetween(center.x, center.y - plus, center.x, center.y + plus);
  }

  private drawDesk(): void {
    const g = this.graphics;
    g.lineStyle(Stroke.medium, Colors.ink, 1);

    const halfW = DESK_WIDTH / 2;
    const halfD = DESK_DEPTH / 2;

    const topNW = this.localPoint(-halfW, -halfD, DESK_TOP_Z);
    const topNE = this.localPoint(halfW, -halfD, DESK_TOP_Z);
    const topSE = this.localPoint(halfW, halfD, DESK_TOP_Z);
    const topSW = this.localPoint(-halfW, halfD, DESK_TOP_Z);

    g.beginPath();
    g.moveTo(topNW.x, topNW.y);
    g.lineTo(topNE.x, topNE.y);
    g.lineTo(topSE.x, topSE.y);
    g.lineTo(topSW.x, topSW.y);
    g.closePath();
    g.strokePath();

    const botSW = { x: topSW.x, y: topSW.y + DESK_FRONT_DEPTH };
    const botSE = { x: topSE.x, y: topSE.y + DESK_FRONT_DEPTH };
    g.beginPath();
    g.moveTo(topSW.x, topSW.y);
    g.lineTo(botSW.x, botSW.y);
    g.lineTo(botSE.x, botSE.y);
    g.lineTo(topSE.x, topSE.y);
    g.closePath();
    g.strokePath();

    const supportSide = this.orientation === 'back-wall' ? -1 : 1;
    const supX = (DESK_WIDTH / 2 - 0.18) * supportSide;
    const supportTop = this.localPoint(supX, halfD - 0.05, 0);
    const supportBottom = this.localPoint(supX, halfD + 0.18, 0);
    g.beginPath();
    g.moveTo(supportTop.x, supportTop.y - 4);
    g.lineTo(supportTop.x, supportTop.y + 14);
    g.lineTo(supportBottom.x, supportBottom.y + 14);
    g.lineTo(supportBottom.x, supportBottom.y - 4);
    g.closePath();
    g.strokePath();
  }

  private drawTower(): void {
    const g = this.graphics;
    g.lineStyle(Stroke.medium, Colors.ink, 1);

    const towerSide = this.orientation === 'back-wall' ? 1 : -1;
    const tx = (DESK_WIDTH / 2 - 0.15) * towerSide;
    const ty = -DESK_DEPTH / 2 + 0.25;

    const baseZ = DESK_TOP_Z;
    const topZ = DESK_TOP_Z + TOWER_HEIGHT;
    const halfW = TOWER_WIDTH_W;
    const halfD = TOWER_DEPTH_W;

    const topFL = this.localPoint(tx - halfW, ty - halfD, topZ);
    const topFR = this.localPoint(tx + halfW, ty - halfD, topZ);
    const topBR = this.localPoint(tx + halfW, ty + halfD, topZ);
    const topBL = this.localPoint(tx - halfW, ty + halfD, topZ);
    const botBR = this.localPoint(tx + halfW, ty + halfD, baseZ);
    const botFR = this.localPoint(tx + halfW, ty - halfD, baseZ);
    const botFL = this.localPoint(tx - halfW, ty - halfD, baseZ);
    g.beginPath();
    g.moveTo(topFL.x, topFL.y);
    g.lineTo(topFR.x, topFR.y);
    g.lineTo(topBR.x, topBR.y);
    g.lineTo(topBL.x, topBL.y);
    g.closePath();
    g.strokePath();
    g.beginPath();
    g.moveTo(topFL.x, topFL.y);
    g.lineTo(botFL.x, botFL.y);
    g.lineTo(botFR.x, botFR.y);
    g.lineTo(topFR.x, topFR.y);
    g.closePath();
    g.strokePath();
    g.beginPath();
    g.moveTo(topFR.x, topFR.y);
    g.lineTo(botFR.x, botFR.y);
    g.lineTo(botBR.x, botBR.y);
    g.lineTo(topBR.x, topBR.y);
    g.closePath();
    g.strokePath();
  }

  private drawScreen(): void {
    const g = this.graphics;
    g.fillStyle(Colors.ink, 1);

    const screenAnchor = this.localPoint(0, -DESK_DEPTH / 2 + 0.18, DESK_TOP_Z);
    const standBaseY = screenAnchor.y;
    const standTopY = standBaseY - SCREEN_STAND_HEIGHT;

    g.lineStyle(Stroke.thin, Colors.ink, 1);
    g.fillRect(screenAnchor.x - 9, standTopY, 18, 3);
    g.fillRect(screenAnchor.x - 1.5, standTopY - SCREEN_STAND_HEIGHT, 3, SCREEN_STAND_HEIGHT);

    const sx = screenAnchor.x - SCREEN_WIDTH_PX / 2;
    const sy = standTopY - SCREEN_STAND_HEIGHT - SCREEN_HEIGHT_PX;
    g.fillRect(sx, sy, SCREEN_WIDTH_PX, SCREEN_HEIGHT_PX);

    g.lineStyle(Stroke.medium, Colors.ink, 1);
    g.strokeRect(sx, sy, SCREEN_WIDTH_PX, SCREEN_HEIGHT_PX);
  }

  private drawChair(): void {
    const g = this.graphics;
    g.lineStyle(Stroke.medium, Colors.ink, 1);

    const cy = DESK_DEPTH / 2 + 0.55;
    const baseScreen = this.localPoint(0, cy, 0);

    const baseRX = 28;
    const baseRY = 9;
    g.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
      const lx = baseScreen.x + Math.cos(angle) * baseRX;
      const ly = baseScreen.y + Math.sin(angle) * baseRY;
      g.moveTo(baseScreen.x, baseScreen.y);
      g.lineTo(lx, ly);
      g.fillStyle(Colors.ink, 1);
      g.fillCircle(lx, ly, 2);
    }
    g.strokePath();

    const stemBottom = this.localPoint(0, cy, 4);
    const stemTop = this.localPoint(0, cy, CHAIR_SEAT_Z - 4);
    g.lineBetween(stemBottom.x, stemBottom.y, stemTop.x, stemTop.y);

    const seatScreen = this.localPoint(0, cy, CHAIR_SEAT_Z);
    g.beginPath();
    g.strokeEllipse(seatScreen.x, seatScreen.y, 36, 12);

    const backNearY = cy - 0.05;
    const backTopZ = CHAIR_SEAT_Z + CHAIR_BACK_HEIGHT;
    const backBotZ = CHAIR_SEAT_Z + 4;
    const backHalfWidth = 20;
    const wingExtra = 8;

    const seatLeft = this.localPoint(0, cy, CHAIR_SEAT_Z + 2);
    const blLeft = { x: seatLeft.x - backHalfWidth, y: seatLeft.y - (CHAIR_SEAT_Z + 4 - CHAIR_SEAT_Z) };
    const blRight = { x: seatLeft.x + backHalfWidth, y: seatLeft.y - (CHAIR_SEAT_Z + 4 - CHAIR_SEAT_Z) };

    const tCenter = this.localPoint(0, backNearY, backTopZ);
    const bCenter = this.localPoint(0, backNearY, backBotZ);

    const topY = tCenter.y;
    const botY = bCenter.y;
    const cxBack = tCenter.x;

    const leftBot = { x: cxBack - backHalfWidth - wingExtra, y: botY };
    const leftTop = { x: cxBack - backHalfWidth + 2, y: topY + 6 };
    const leftCp = {
      x: cxBack - backHalfWidth - wingExtra - 4,
      y: botY - (botY - topY) * 0.55,
    };
    this.quadPath(g, leftBot, leftCp, leftTop);

    const headBaseLeft = leftTop;
    const headBaseRight = { x: cxBack + backHalfWidth - 2, y: topY + 6 };
    const headCp = { x: cxBack, y: topY - 14 };
    this.quadPath(g, headBaseLeft, headCp, headBaseRight);

    const rightBot = { x: cxBack + backHalfWidth + wingExtra, y: botY };
    const rightCp = {
      x: cxBack + backHalfWidth + wingExtra + 4,
      y: botY - (botY - topY) * 0.55,
    };
    this.quadPath(g, headBaseRight, rightCp, rightBot);

    g.lineBetween(rightBot.x, rightBot.y, blRight.x, blRight.y);
    g.lineBetween(blRight.x, blRight.y, blLeft.x, blLeft.y);
    g.lineBetween(blLeft.x, blLeft.y, leftBot.x, leftBot.y);

    const wingTopOffset = (botY - topY) * 0.18;
    const innerLeftTop = { x: cxBack - backHalfWidth + 2, y: topY + 6 + wingTopOffset };
    const innerLeftBot = { x: cxBack - backHalfWidth + 2, y: botY - 4 };
    const innerLeftCp = {
      x: cxBack - backHalfWidth + 8,
      y: botY - (botY - topY) * 0.45,
    };
    this.quadPath(g, innerLeftTop, innerLeftCp, innerLeftBot);

    const innerRightTop = { x: cxBack + backHalfWidth - 2, y: topY + 6 + wingTopOffset };
    const innerRightBot = { x: cxBack + backHalfWidth - 2, y: botY - 4 };
    const innerRightCp = {
      x: cxBack + backHalfWidth - 8,
      y: botY - (botY - topY) * 0.45,
    };
    this.quadPath(g, innerRightTop, innerRightCp, innerRightBot);

    const headRX = 9;
    const headRY = 5;
    const headCx = cxBack;
    const headCy = topY - 4;
    g.strokeEllipse(headCx, headCy, headRX * 2, headRY * 2);
  }

  override destroy(fromScene?: boolean): void {
    super.destroy(fromScene);
  }
}
