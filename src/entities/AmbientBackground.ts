import Phaser from 'phaser';
import { Colors } from '../config/theme';

export class AmbientBackground extends Phaser.GameObjects.Container {
  private bg!: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0);
    scene.add.existing(this);
    this.setDepth(-100);
    this.bg = scene.add.graphics();
    this.add(this.bg);
    this.draw();
    scene.scale.on('resize', this.draw, this);
  }

  private draw = (): void => {
    const { width, height } = this.scene.scale;
    this.bg.clear();
    this.bg.fillStyle(Colors.voidBg, 1);
    this.bg.fillRect(0, 0, width, height);
  };

  update(): void {}

  override destroy(fromScene?: boolean): void {
    this.scene.scale.off('resize', this.draw, this);
    super.destroy(fromScene);
  }
}
