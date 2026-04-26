import Phaser from 'phaser';

export class RoomBackground extends Phaser.GameObjects.Container {
  private readonly image: Phaser.GameObjects.Image;
  private readonly textureKey: string;

  constructor(scene: Phaser.Scene, textureKey: string) {
    super(scene, 0, 0);
    scene.add.existing(this);
    this.setDepth(-50);
    this.textureKey = textureKey;

    this.image = scene.add.image(0, 0, textureKey);
    this.image.setOrigin(0.5, 0.5);
    this.add(this.image);

    this.applyCover();
    scene.scale.on('resize', this.applyCover, this);
  }

  private applyCover = (): void => {
    const { width, height } = this.scene.scale;
    const source = this.scene.textures.get(this.textureKey).getSourceImage();
    const naturalW = (source as HTMLImageElement | HTMLCanvasElement).width;
    const naturalH = (source as HTMLImageElement | HTMLCanvasElement).height;
    if (!naturalW || !naturalH) return;

    const scaleX = width / naturalW;
    const scaleY = height / naturalH;
    const scale = Math.max(scaleX, scaleY);

    this.image.setScale(scale);
    this.image.setPosition(width / 2, height / 2);
  };

  override destroy(fromScene?: boolean): void {
    this.scene.scale.off('resize', this.applyCover, this);
    super.destroy(fromScene);
  }
}
