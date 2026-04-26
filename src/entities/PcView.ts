import Phaser from 'phaser';
import { Colors, Fonts } from '../config/theme';
import type { Pc } from '../types';

const STATION_WIDTH = 180;
const STATION_HEIGHT = 200;

const DESK_TOP_WIDTH = 168;
const DESK_TOP_DEPTH = 40;
const DESK_FRONT_HEIGHT = 26;
const DESK_PERSPECTIVE = 22;

const SCREEN_WIDTH = 96;
const SCREEN_HEIGHT = 60;
const SCREEN_FRAME = 4;
const SCREEN_STAND_HEIGHT = 14;

const TOWER_WIDTH = 28;
const TOWER_HEIGHT = 70;

const CHAIR_WIDTH = 80;
const CHAIR_BACK_HEIGHT = 60;
const CHAIR_SEAT_HEIGHT = 14;

const SHADOW_WIDTH = 170;
const SHADOW_HEIGHT = 22;

export class PcView extends Phaser.GameObjects.Container {
  private readonly shadow: Phaser.GameObjects.Graphics;
  private readonly chair: Phaser.GameObjects.Graphics;
  private readonly desk: Phaser.GameObjects.Graphics;
  private readonly tower: Phaser.GameObjects.Graphics;
  private readonly screen: Phaser.GameObjects.Graphics;
  private readonly screenGlow: Phaser.GameObjects.Graphics;
  private readonly label: Phaser.GameObjects.Text;
  private readonly status: Phaser.GameObjects.Text;
  private screenPulseTween: Phaser.Tweens.Tween | null = null;
  private towerLedTween: Phaser.Tweens.Tween | null = null;

  constructor(scene: Phaser.Scene, x: number, y: number, pc: Pc) {
    super(scene, x, y);

    this.shadow = scene.add.graphics();
    this.chair = scene.add.graphics();
    this.desk = scene.add.graphics();
    this.tower = scene.add.graphics();
    this.screenGlow = scene.add.graphics();
    this.screen = scene.add.graphics();

    this.add([this.shadow, this.chair, this.desk, this.tower, this.screenGlow, this.screen]);

    this.label = scene.add.text(0, STATION_HEIGHT / 2 - 4, `PC ${pc.slotIndex + 1}`, {
      fontFamily: Fonts.body,
      fontSize: '14px',
      fontStyle: '700',
      color: '#94a3b8',
    });
    this.label.setOrigin(0.5, 0);
    this.add(this.label);

    this.status = scene.add.text(0, STATION_HEIGHT / 2 + 16, 'Libre', {
      fontFamily: Fonts.mono,
      fontSize: '11px',
      fontStyle: '500',
      color: '#64748b',
    });
    this.status.setOrigin(0.5, 0);
    this.add(this.status);

    this.drawShadow();
    this.drawChair();
    this.drawDesk();
    this.drawTower();
    this.drawScreen();

    this.setSize(STATION_WIDTH, STATION_HEIGHT);
    this.setInteractive(
      new Phaser.Geom.Rectangle(-STATION_WIDTH / 2, -STATION_HEIGHT / 2, STATION_WIDTH, STATION_HEIGHT),
      Phaser.Geom.Rectangle.Contains,
    );

    this.startIdleAnimations();

    this.on('pointerover', () => {
      scene.tweens.add({ targets: this, scaleX: 1.04, scaleY: 1.04, duration: 220, ease: 'Back.easeOut' });
      this.status.setColor('#94a3b8');
    });
    this.on('pointerout', () => {
      scene.tweens.add({ targets: this, scaleX: 1, scaleY: 1, duration: 220, ease: 'Back.easeOut' });
      this.status.setColor('#64748b');
    });

    scene.add.existing(this);
  }

  private drawShadow(): void {
    this.shadow.clear();
    const y = STATION_HEIGHT / 2 - 14;
    for (let i = 6; i >= 1; i--) {
      this.shadow.fillStyle(0x000000, 0.06 * i);
      this.shadow.fillEllipse(0, y, SHADOW_WIDTH - i * 6, SHADOW_HEIGHT - i * 2);
    }
  }

  private drawChair(): void {
    this.chair.clear();
    const cy = -10;

    this.chair.fillStyle(0x000000, 0.25);
    this.chair.fillRoundedRect(-CHAIR_WIDTH / 2 + 4, cy - CHAIR_BACK_HEIGHT + 6, CHAIR_WIDTH, CHAIR_BACK_HEIGHT, 10);

    this.chair.fillGradientStyle(
      Colors.surface.chairBack,
      Colors.surface.chairBack,
      Colors.surface.chairSeat,
      Colors.surface.chairSeat,
      1,
      1,
      1,
      1,
    );
    this.chair.fillRoundedRect(-CHAIR_WIDTH / 2, cy - CHAIR_BACK_HEIGHT, CHAIR_WIDTH, CHAIR_BACK_HEIGHT, 10);

    this.chair.fillStyle(Colors.bgPanelLight, 0.45);
    this.chair.fillRoundedRect(-CHAIR_WIDTH / 2 + 8, cy - CHAIR_BACK_HEIGHT + 8, CHAIR_WIDTH - 16, 6, 3);

    this.chair.fillStyle(Colors.surface.chairSeat, 1);
    this.chair.fillRoundedRect(-CHAIR_WIDTH / 2 + 6, cy - 6, CHAIR_WIDTH - 12, CHAIR_SEAT_HEIGHT, 6);
  }

  private drawDesk(): void {
    this.desk.clear();
    const dy = 28;

    const topLeft = { x: -DESK_TOP_WIDTH / 2, y: dy };
    const topRight = { x: DESK_TOP_WIDTH / 2, y: dy };
    const farLeft = { x: -DESK_TOP_WIDTH / 2 + DESK_PERSPECTIVE, y: dy - DESK_TOP_DEPTH };
    const farRight = { x: DESK_TOP_WIDTH / 2 - DESK_PERSPECTIVE, y: dy - DESK_TOP_DEPTH };

    this.desk.fillGradientStyle(
      Colors.surface.deskTop,
      Colors.surface.deskTop,
      Colors.surface.deskTopLight,
      Colors.surface.deskTopLight,
      1,
      1,
      1,
      1,
    );
    this.desk.beginPath();
    this.desk.moveTo(topLeft.x, topLeft.y);
    this.desk.lineTo(farLeft.x, farLeft.y);
    this.desk.lineTo(farRight.x, farRight.y);
    this.desk.lineTo(topRight.x, topRight.y);
    this.desk.closePath();
    this.desk.fillPath();

    this.desk.lineStyle(1, Colors.bgPanelLight, 0.4);
    this.desk.strokePath();

    this.desk.fillGradientStyle(
      Colors.surface.deskFront,
      Colors.surface.deskFront,
      Colors.surface.floorDark,
      Colors.surface.floorDark,
      1,
      1,
      1,
      1,
    );
    this.desk.fillRect(-DESK_TOP_WIDTH / 2, dy, DESK_TOP_WIDTH, DESK_FRONT_HEIGHT);

    this.desk.fillStyle(0x000000, 0.4);
    this.desk.fillRect(-DESK_TOP_WIDTH / 2, dy, DESK_TOP_WIDTH, 2);
  }

  private drawTower(): void {
    this.tower.clear();
    const tx = DESK_TOP_WIDTH / 2 - TOWER_WIDTH - 6;
    const ty = 28 + DESK_FRONT_HEIGHT - TOWER_HEIGHT;

    this.tower.fillGradientStyle(
      Colors.surface.pcTowerLight,
      Colors.surface.pcTowerLight,
      Colors.surface.pcTowerDark,
      Colors.surface.pcTowerDark,
      1,
      1,
      1,
      1,
    );
    this.tower.fillRoundedRect(tx, ty, TOWER_WIDTH, TOWER_HEIGHT, 4);

    this.tower.lineStyle(1, Colors.bgPanelLight, 0.4);
    this.tower.strokeRoundedRect(tx, ty, TOWER_WIDTH, TOWER_HEIGHT, 4);

    const ledX = tx + TOWER_WIDTH / 2;
    const ledY = ty + 10;
    this.tower.fillStyle(Colors.function.coin, 1);
    this.tower.fillCircle(ledX, ledY, 2);

    this.tower.lineStyle(1, Colors.bgPanelLight, 0.5);
    for (let i = 0; i < 4; i++) {
      const slotY = ty + 22 + i * 5;
      this.tower.lineBetween(tx + 4, slotY, tx + TOWER_WIDTH - 4, slotY);
    }
  }

  private drawScreen(): void {
    this.screen.clear();
    this.screenGlow.clear();

    const baseY = 28;
    const screenY = baseY - SCREEN_STAND_HEIGHT - SCREEN_HEIGHT;

    this.screen.fillStyle(Colors.surface.screenFrame, 1);
    this.screen.fillRoundedRect(
      -SCREEN_WIDTH / 2 - SCREEN_FRAME,
      screenY - SCREEN_FRAME,
      SCREEN_WIDTH + SCREEN_FRAME * 2,
      SCREEN_HEIGHT + SCREEN_FRAME * 2,
      6,
    );

    this.screen.fillStyle(0x000000, 0.6);
    this.screen.fillRect(-2, screenY + SCREEN_HEIGHT + SCREEN_FRAME, 4, SCREEN_STAND_HEIGHT - 4);
    this.screen.fillStyle(Colors.surface.screenFrame, 1);
    this.screen.fillRoundedRect(-18, screenY + SCREEN_HEIGHT + SCREEN_FRAME + SCREEN_STAND_HEIGHT - 4, 36, 4, 2);

    const innerColor = Colors.bgPrimary;
    this.screen.fillGradientStyle(innerColor, innerColor, Colors.bgTertiary, Colors.bgTertiary, 1, 1, 1, 1);
    this.screen.fillRoundedRect(-SCREEN_WIDTH / 2, screenY, SCREEN_WIDTH, SCREEN_HEIGHT, 3);

    const standbyColor = Colors.function.primary;
    this.screen.fillStyle(standbyColor, 0.18);
    this.screen.fillCircle(0, screenY + SCREEN_HEIGHT / 2, 14);
    this.screen.fillStyle(standbyColor, 0.45);
    this.screen.fillCircle(0, screenY + SCREEN_HEIGHT / 2, 6);

    this.screenGlow.fillStyle(standbyColor, 0.18);
    this.screenGlow.fillRoundedRect(
      -SCREEN_WIDTH / 2 - 8,
      screenY - 8,
      SCREEN_WIDTH + 16,
      SCREEN_HEIGHT + 16,
      8,
    );

    if (this.scene.renderer.type === Phaser.WEBGL) {
      this.screen.postFX?.addGlow(standbyColor, 1.4, 0, false, 0.1, 8);
    }
  }

  private startIdleAnimations(): void {
    this.screenPulseTween?.stop();
    this.screenGlow.alpha = 0.6;
    this.screenPulseTween = this.scene.tweens.add({
      targets: this.screenGlow,
      alpha: { from: 0.35, to: 0.85 },
      duration: 2200,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
    });

    this.towerLedTween?.stop();
    this.tower.alpha = 1;
    this.towerLedTween = this.scene.tweens.add({
      targets: this.tower,
      alpha: { from: 0.92, to: 1 },
      duration: 1600,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
    });
  }

  override destroy(fromScene?: boolean): void {
    this.screenPulseTween?.stop();
    this.towerLedTween?.stop();
    super.destroy(fromScene);
  }
}
