import Phaser from 'phaser';
import { Colors } from '../config/theme';
import type { Pc } from '../types';

const PC_WIDTH = 140;
const PC_HEIGHT = 110;
const SCREEN_INSET_X = 16;
const SCREEN_INSET_TOP = 14;
const SCREEN_HEIGHT = 60;
const BASE_INSET = 14;
const CORNER_RADIUS = 14;

export class PcView extends Phaser.GameObjects.Container {
  private readonly chassis: Phaser.GameObjects.Graphics;
  private readonly screen: Phaser.GameObjects.Graphics;
  private readonly label: Phaser.GameObjects.Text;
  private readonly idleHint: Phaser.GameObjects.Text;
  private screenPulseTween: Phaser.Tweens.Tween | null = null;

  constructor(scene: Phaser.Scene, x: number, y: number, pc: Pc) {
    super(scene, x, y);

    this.chassis = scene.add.graphics();
    this.screen = scene.add.graphics();
    this.add([this.chassis, this.screen]);

    this.label = scene.add.text(0, PC_HEIGHT / 2 + 12, `PC ${pc.slotIndex + 1}`, {
      fontFamily: '"Nunito", sans-serif',
      fontSize: '14px',
      fontStyle: '600',
      color: '#94a3b8',
    });
    this.label.setOrigin(0.5, 0);
    this.add(this.label);

    this.idleHint = scene.add.text(0, 0, 'libre', {
      fontFamily: '"Nunito", sans-serif',
      fontSize: '12px',
      color: '#64748b',
      fontStyle: '400',
    });
    this.idleHint.setOrigin(0.5, 0.5);
    this.idleHint.setPosition(0, -PC_HEIGHT / 2 + SCREEN_INSET_TOP + SCREEN_HEIGHT / 2);
    this.add(this.idleHint);

    this.drawChassis();
    this.drawIdleScreen();

    this.setSize(PC_WIDTH, PC_HEIGHT);
    this.setInteractive(
      new Phaser.Geom.Rectangle(-PC_WIDTH / 2, -PC_HEIGHT / 2, PC_WIDTH, PC_HEIGHT),
      Phaser.Geom.Rectangle.Contains,
    );

    this.startIdlePulse();
    scene.add.existing(this);
  }

  private drawChassis(): void {
    this.chassis.clear();
    this.chassis.fillStyle(Colors.bgSecondary, 1);
    this.chassis.fillRoundedRect(
      -PC_WIDTH / 2,
      -PC_HEIGHT / 2,
      PC_WIDTH,
      PC_HEIGHT,
      CORNER_RADIUS,
    );

    const baseY = PC_HEIGHT / 2 - BASE_INSET;
    this.chassis.fillStyle(Colors.bgTertiary, 1);
    this.chassis.fillRoundedRect(
      -PC_WIDTH / 2 + 24,
      baseY - 6,
      PC_WIDTH - 48,
      10,
      4,
    );
  }

  private drawIdleScreen(): void {
    this.screen.clear();
    this.screen.fillStyle(Colors.bgPrimary, 1);
    this.screen.fillRoundedRect(
      -PC_WIDTH / 2 + SCREEN_INSET_X,
      -PC_HEIGHT / 2 + SCREEN_INSET_TOP,
      PC_WIDTH - SCREEN_INSET_X * 2,
      SCREEN_HEIGHT,
      8,
    );
    this.screen.lineStyle(1, Colors.textSecondary, 0.18);
    this.screen.strokeRoundedRect(
      -PC_WIDTH / 2 + SCREEN_INSET_X,
      -PC_HEIGHT / 2 + SCREEN_INSET_TOP,
      PC_WIDTH - SCREEN_INSET_X * 2,
      SCREEN_HEIGHT,
      8,
    );
  }

  private startIdlePulse(): void {
    this.screenPulseTween?.stop();
    this.screen.alpha = 0.85;
    this.screenPulseTween = this.scene.tweens.add({
      targets: this.screen,
      alpha: { from: 0.7, to: 1 },
      duration: 1800,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
    });
  }

  override destroy(fromScene?: boolean): void {
    this.screenPulseTween?.stop();
    super.destroy(fromScene);
  }
}
