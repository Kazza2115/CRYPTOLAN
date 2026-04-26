import Phaser from 'phaser';
import { ROOM_COLS, ROOM_ROWS, WALL_HEIGHT, iso } from '../config/iso';

export class RoomBackground extends Phaser.GameObjects.Container {
  private readonly image: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, textureKey: string) {
    super(scene, 0, 0);
    scene.add.existing(this);
    this.setDepth(-50);

    const corners = [
      iso(0, 0, 0),
      iso(ROOM_COLS, 0, 0),
      iso(ROOM_COLS, ROOM_ROWS, 0),
      iso(0, ROOM_ROWS, 0),
      iso(0, 0, WALL_HEIGHT),
      iso(ROOM_COLS, 0, WALL_HEIGHT),
      iso(ROOM_COLS, ROOM_ROWS, WALL_HEIGHT),
    ];
    const minX = Math.min(...corners.map((c) => c.x));
    const maxX = Math.max(...corners.map((c) => c.x));
    const minY = Math.min(...corners.map((c) => c.y));
    const maxY = Math.max(...corners.map((c) => c.y));

    const targetWidth = maxX - minX;
    const targetHeight = maxY - minY;
    const targetCenterX = (minX + maxX) / 2;
    const targetCenterY = (minY + maxY) / 2;

    this.image = scene.add.image(targetCenterX, targetCenterY, textureKey);
    this.image.setOrigin(0.5, 0.5);

    const tex = scene.textures.get(textureKey).getSourceImage();
    const naturalWidth = (tex as HTMLImageElement | HTMLCanvasElement).width;
    const naturalHeight = (tex as HTMLImageElement | HTMLCanvasElement).height;

    if (naturalWidth > 0 && naturalHeight > 0) {
      const scaleX = targetWidth / naturalWidth;
      const scaleY = targetHeight / naturalHeight;
      const scale = Math.max(scaleX, scaleY);
      this.image.setScale(scale);
    }

    this.add(this.image);
  }
}
