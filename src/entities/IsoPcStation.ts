import Phaser from 'phaser';
import { Colors, Fonts, Stroke } from '../config/theme';
import { iso } from '../config/iso';
import type { Pc } from '../types';

const DESK_WIDTH = 1.2;
const DESK_DEPTH = 0.85;
const DESK_TOP_Z = 38;
const DESK_FRONT_DEPTH = 30;

const SCREEN_WIDTH_PX = 56;
const SCREEN_HEIGHT_PX = 36;
const SCREEN_STAND_HEIGHT = 12;

const TOWER_W = 0.18;
const TOWER_D = 0.18;
const TOWER_H = 50;

const CHAIR_BACK_HEIGHT = 88;
const CHAIR_SEAT_Z = 26;
const CHAIR_OFFSET = 0.5;

export type StationOrientation = 'back-wall' | 'right-wall';

interface StationConfig {
  readonly worldX: number;
  readonly worldY: number;
  readonly orientation: StationOrientation;
}

interface Pt {
  readonly x: number;
  readonly y: number;
}

export class IsoPcStation extends Phaser.GameObjects.Container {
  private readonly graphics: Phaser.GameObjects.Graphics;
  private readonly label: Phaser.GameObjects.Text;
  private readonly orientation: StationOrientation;
  private readonly worldOriginX: number;
  private readonly worldOriginY: number;

  constructor(scene: Phaser.Scene, pc: Pc, config: StationConfig) {
    const { worldX, worldY, orientation } = config;
    const screen = iso(worldX, worldY);
    super(scene, screen.x, screen.y);

    this.worldOriginX = worldX;
    this.worldOriginY = worldY;
    this.orientation = orientation;
    this.setDepth((worldX + worldY) * 1000);

    this.graphics = scene.add.graphics();
    this.add(this.graphics);

    this.label = scene.add.text(0, 70, '', {
      fontFamily: Fonts.body,
      fontSize: '11px',
      fontStyle: '600',
      color: pc.locked ? '#888888' : '#111111',
    });
    this.label.setOrigin(0.5, 0);
    this.add(this.label);

    if (pc.locked) {
      this.drawLockedFootprint();
      this.label.setText('Construire');
    } else {
      this.drawDesk();
      this.drawTower();
      this.drawScreen();
      this.drawChair();
      this.label.setText(`PC ${pc.slotIndex + 1}`);
    }

    scene.add.existing(this);
  }

  private toWorld(lx: number, ly: number): { wx: number; wy: number } {
    if (this.orientation === 'back-wall') {
      return { wx: this.worldOriginX + lx, wy: this.worldOriginY + ly };
    }
    return { wx: this.worldOriginX - ly, wy: this.worldOriginY + lx };
  }

  private local(lx: number, ly: number, lz = 0): Pt {
    const { wx, wy } = this.toWorld(lx, ly);
    const p = iso(wx, wy, lz);
    return { x: p.x - this.x, y: p.y - this.y };
  }

  private quadPath(g: Phaser.GameObjects.Graphics, p0: Pt, cp: Pt, p1: Pt, segments = 14): void {
    let prev = p0;
    for (let i = 1; i <= segments; i++) {
      const t = i / segments;
      const omt = 1 - t;
      const x = omt * omt * p0.x + 2 * omt * t * cp.x + t * t * p1.x;
      const y = omt * omt * p0.y + 2 * omt * t * cp.y + t * t * p1.y;
      g.lineBetween(prev.x, prev.y, x, y);
      prev = { x, y };
    }
  }

  private drawLockedFootprint(): void {
    const g = this.graphics;
    const halfW = DESK_WIDTH / 2;
    const halfD = DESK_DEPTH / 2;

    const a = this.local(-halfW, -halfD);
    const b = this.local(halfW, -halfD);
    const c = this.local(halfW, halfD);
    const d = this.local(-halfW, halfD);

    const dashed = (start: Pt, end: Pt): void => {
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
        const r = Math.min(dash, len - traveled);
        g.lineBetween(
          start.x + ux * traveled,
          start.y + uy * traveled,
          start.x + ux * (traveled + r),
          start.y + uy * (traveled + r),
        );
        traveled += dash + gap;
      }
    };

    dashed(a, b);
    dashed(b, c);
    dashed(c, d);
    dashed(d, a);

    const center = this.local(0, 0);
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

    const topNW = this.local(-halfW, -halfD, DESK_TOP_Z);
    const topNE = this.local(halfW, -halfD, DESK_TOP_Z);
    const topSE = this.local(halfW, halfD, DESK_TOP_Z);
    const topSW = this.local(-halfW, halfD, DESK_TOP_Z);

    g.beginPath();
    g.moveTo(topNW.x, topNW.y);
    g.lineTo(topNE.x, topNE.y);
    g.lineTo(topSE.x, topSE.y);
    g.lineTo(topSW.x, topSW.y);
    g.closePath();
    g.strokePath();

    let frontA: Pt;
    let frontB: Pt;
    if (this.orientation === 'back-wall') {
      frontA = topSW;
      frontB = topSE;
    } else {
      frontA = topNW;
      frontB = topSW;
    }

    const botA = { x: frontA.x, y: frontA.y + DESK_FRONT_DEPTH };
    const botB = { x: frontB.x, y: frontB.y + DESK_FRONT_DEPTH };

    g.beginPath();
    g.moveTo(frontA.x, frontA.y);
    g.lineTo(botA.x, botA.y);
    g.lineTo(botB.x, botB.y);
    g.lineTo(frontB.x, frontB.y);
    g.closePath();
    g.strokePath();

    const lateralLeg = this.local(-halfW + 0.05, halfD - 0.05, 0);
    const lateralLegBot = { x: lateralLeg.x, y: lateralLeg.y + DESK_FRONT_DEPTH * 0.4 };
    g.lineBetween(lateralLeg.x, lateralLeg.y, lateralLegBot.x, lateralLegBot.y);
  }

  private drawTower(): void {
    const g = this.graphics;
    g.lineStyle(Stroke.medium, Colors.ink, 1);

    const tx = DESK_WIDTH / 2 - 0.18;
    const ty = -DESK_DEPTH / 2 + 0.22;

    const baseZ = DESK_TOP_Z;
    const topZ = DESK_TOP_Z + TOWER_H;
    const halfW = TOWER_W;
    const halfD = TOWER_D;

    const topFL = this.local(tx - halfW, ty - halfD, topZ);
    const topFR = this.local(tx + halfW, ty - halfD, topZ);
    const topBR = this.local(tx + halfW, ty + halfD, topZ);
    const topBL = this.local(tx - halfW, ty + halfD, topZ);
    const botBR = this.local(tx + halfW, ty + halfD, baseZ);
    const botFR = this.local(tx + halfW, ty - halfD, baseZ);
    const botFL = this.local(tx - halfW, ty - halfD, baseZ);

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

    const screenAnchor = this.local(0, -DESK_DEPTH / 2 + 0.18, DESK_TOP_Z);
    const standBaseY = screenAnchor.y;
    const standTopY = standBaseY - SCREEN_STAND_HEIGHT;

    g.lineStyle(Stroke.thin, Colors.ink, 1);
    g.fillStyle(Colors.ink, 1);
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

    const baseScreen = this.local(0, DESK_DEPTH / 2 + CHAIR_OFFSET, 0);

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

    const stemBottom = this.local(0, DESK_DEPTH / 2 + CHAIR_OFFSET, 4);
    const stemTop = this.local(0, DESK_DEPTH / 2 + CHAIR_OFFSET, CHAIR_SEAT_Z - 4);
    g.lineBetween(stemBottom.x, stemBottom.y, stemTop.x, stemTop.y);

    const seatScreen = this.local(0, DESK_DEPTH / 2 + CHAIR_OFFSET, CHAIR_SEAT_Z);
    g.strokeEllipse(seatScreen.x, seatScreen.y, 36, 12);

    const backNearLY = DESK_DEPTH / 2 + CHAIR_OFFSET - 0.08;
    const backTopZ = CHAIR_SEAT_Z + CHAIR_BACK_HEIGHT;
    const backBotZ = CHAIR_SEAT_Z + 4;
    const backHalfWidth = 20;
    const wingExtra = 8;

    const tCenter = this.local(0, backNearLY, backTopZ);
    const bCenter = this.local(0, backNearLY, backBotZ);
    const cxBack = tCenter.x;
    const topY = tCenter.y;
    const botY = bCenter.y;

    const seatLevel = this.local(0, backNearLY, CHAIR_SEAT_Z + 2);
    const blLeft = { x: seatLevel.x - backHalfWidth, y: seatLevel.y };
    const blRight = { x: seatLevel.x + backHalfWidth, y: seatLevel.y };

    const leftBot = { x: cxBack - backHalfWidth - wingExtra, y: botY };
    const leftTop = { x: cxBack - backHalfWidth + 2, y: topY + 6 };
    const leftCp = {
      x: cxBack - backHalfWidth - wingExtra - 4,
      y: botY - (botY - topY) * 0.55,
    };
    this.quadPath(g, leftBot, leftCp, leftTop);

    const headBaseRight = { x: cxBack + backHalfWidth - 2, y: topY + 6 };
    const headCp = { x: cxBack, y: topY - 14 };
    this.quadPath(g, leftTop, headCp, headBaseRight);

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
    this.quadPath(
      g,
      { x: cxBack - backHalfWidth + 2, y: topY + 6 + wingTopOffset },
      { x: cxBack - backHalfWidth + 8, y: botY - (botY - topY) * 0.45 },
      { x: cxBack - backHalfWidth + 2, y: botY - 4 },
    );
    this.quadPath(
      g,
      { x: cxBack + backHalfWidth - 2, y: topY + 6 + wingTopOffset },
      { x: cxBack + backHalfWidth - 8, y: botY - (botY - topY) * 0.45 },
      { x: cxBack + backHalfWidth - 2, y: botY - 4 },
    );

    const headRX = 9;
    const headRY = 5;
    g.strokeEllipse(cxBack, topY - 4, headRX * 2, headRY * 2);
  }

  override destroy(fromScene?: boolean): void {
    super.destroy(fromScene);
  }
}
