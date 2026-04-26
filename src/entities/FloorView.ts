import Phaser from 'phaser';
import { Colors } from '../config/theme';

export class FloorView extends Phaser.GameObjects.Container {
  private graphics!: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0);
    scene.add.existing(this);
    this.setDepth(-50);
    this.graphics = scene.add.graphics();
    this.add(this.graphics);
    this.draw();
    scene.scale.on('resize', this.onResize, this);
  }

  private draw(): void {
    const { width, height } = this.scene.scale;
    const horizonY = height * 0.5;

    this.graphics.clear();

    this.graphics.fillGradientStyle(
      Colors.surface.floorDark,
      Colors.surface.floorDark,
      Colors.surface.floorLight,
      Colors.surface.floorLight,
      1,
      1,
      1,
      1,
    );
    this.graphics.fillRect(0, horizonY, width, height - horizonY);

    this.graphics.lineStyle(1, Colors.bgPanelLight, 0.18);
    const linesCount = 12;
    const vanishX = width / 2;
    for (let i = 0; i <= linesCount; i++) {
      const t = i / linesCount;
      const startX = t * width;
      const endX = vanishX + (startX - vanishX) * 2.4;
      this.graphics.lineBetween(startX, height, endX, horizonY);
    }

    const horizonLines = 6;
    for (let i = 1; i <= horizonLines; i++) {
      const t = i / horizonLines;
      const ease = t * t;
      const y = horizonY + ease * (height - horizonY);
      const alpha = 0.05 + (1 - t) * 0.15;
      this.graphics.lineStyle(1, Colors.bgPanelLight, alpha);
      this.graphics.lineBetween(0, y, width, y);
    }

    this.graphics.fillStyle(0x000000, 0.35);
    this.graphics.fillRect(0, horizonY - 6, width, 12);
  }

  private onResize = (): void => {
    this.draw();
  };

  override destroy(fromScene?: boolean): void {
    this.scene.scale.off('resize', this.onResize, this);
    super.destroy(fromScene);
  }
}
