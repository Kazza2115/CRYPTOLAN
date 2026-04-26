import Phaser from 'phaser';
import { Colors } from '../config/theme';

const PARTICLE_COUNT = 40;
const PARTICLE_MIN_RADIUS = 1.5;
const PARTICLE_MAX_RADIUS = 3.5;
const PARTICLE_MIN_ALPHA = 0.15;
const PARTICLE_MAX_ALPHA = 0.55;

interface AmbientParticle {
  readonly graphic: Phaser.GameObjects.Graphics;
  readonly baseY: number;
  readonly amplitude: number;
  readonly speed: number;
  readonly phase: number;
}

export class AmbientBackground extends Phaser.GameObjects.Container {
  private gradient!: Phaser.GameObjects.Graphics;
  private vignette!: Phaser.GameObjects.Graphics;
  private particles: AmbientParticle[] = [];

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0);
    scene.add.existing(this);
    this.setDepth(-100);
    this.build();
    scene.scale.on('resize', this.onResize, this);
  }

  private build(): void {
    const { width, height } = this.scene.scale;

    this.gradient = this.scene.add.graphics();
    this.vignette = this.scene.add.graphics();
    this.add([this.gradient, this.vignette]);

    this.drawGradient(width, height);
    this.drawVignette(width, height);
    this.spawnParticles(width, height);
  }

  private drawGradient(width: number, height: number): void {
    this.gradient.clear();
    this.gradient.fillGradientStyle(
      0x1a1a2e,
      0x1a1a2e,
      0x0f0f1a,
      0x0f0f1a,
      1,
      1,
      1,
      1,
    );
    this.gradient.fillRect(0, 0, width, height);
  }

  private drawVignette(width: number, height: number): void {
    this.vignette.clear();
    const layers = 24;
    for (let i = 0; i < layers; i++) {
      const alpha = (i / layers) * 0.45;
      const inset = (i / layers) * Math.min(width, height) * 0.45;
      this.vignette.lineStyle(2, 0x000000, alpha);
      this.vignette.strokeRect(inset, inset, width - inset * 2, height - inset * 2);
    }
  }

  private spawnParticles(width: number, height: number): void {
    this.particles.forEach((p) => p.graphic.destroy());
    this.particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = Math.random() * width;
      const baseY = Math.random() * height;
      const radius =
        PARTICLE_MIN_RADIUS + Math.random() * (PARTICLE_MAX_RADIUS - PARTICLE_MIN_RADIUS);
      const alpha =
        PARTICLE_MIN_ALPHA + Math.random() * (PARTICLE_MAX_ALPHA - PARTICLE_MIN_ALPHA);
      const color = Math.random() > 0.6 ? Colors.function.primary : Colors.function.coin;

      const g = this.scene.add.graphics();
      g.fillStyle(color, alpha);
      g.fillCircle(0, 0, radius);
      g.setPosition(x, baseY);
      this.add(g);

      if (this.scene.renderer.type === Phaser.WEBGL) {
        g.postFX?.addGlow(color, 2, 0, false, 0.1, 6);
      }

      this.particles.push({
        graphic: g,
        baseY,
        amplitude: 8 + Math.random() * 24,
        speed: 0.0004 + Math.random() * 0.0008,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  update(time: number): void {
    this.particles.forEach((p) => {
      p.graphic.y = p.baseY + Math.sin(time * p.speed + p.phase) * p.amplitude;
    });
  }

  private onResize = (gameSize: Phaser.Structs.Size): void => {
    this.drawGradient(gameSize.width, gameSize.height);
    this.drawVignette(gameSize.width, gameSize.height);
    this.spawnParticles(gameSize.width, gameSize.height);
  };

  override destroy(fromScene?: boolean): void {
    this.scene.scale.off('resize', this.onResize, this);
    super.destroy(fromScene);
  }
}
