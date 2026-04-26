import Phaser from 'phaser';
import { Colors, Fonts, Layout } from '../config/theme';
import { AmbientBackground } from '../entities/AmbientBackground';
import { FloorView } from '../entities/FloorView';
import { HudPanel } from '../entities/HudPanel';
import { PcView } from '../entities/PcView';
import { loadGameData } from '../systems/DataLoader';
import type { GameData } from '../types';

export class LanHouseScene extends Phaser.Scene {
  private gameData!: GameData;
  private ambient!: AmbientBackground;
  private pcViews: PcView[] = [];
  private subtitle!: Phaser.GameObjects.Text;
  private zoneLabel!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'LanHouseScene' });
  }

  create(): void {
    this.gameData = loadGameData();
    this.cameras.main.setBackgroundColor(Colors.bgPrimary);

    this.ambient = new AmbientBackground(this);
    new FloorView(this);
    new HudPanel(this);
    this.drawZoneCaption();
    this.drawPcs();

    this.scale.on('resize', this.onResize, this);
  }

  override update(time: number): void {
    this.ambient.update(time);
  }

  private drawZoneCaption(): void {
    const { width } = this.scale;

    this.zoneLabel = this.add
      .text(width / 2, Layout.hudHeight + 28, 'Garage', {
        fontFamily: Fonts.body,
        fontSize: '32px',
        fontStyle: '800',
        color: '#f8fafc',
      })
      .setOrigin(0.5, 0.5);
    this.zoneLabel.setLetterSpacing(1);

    this.subtitle = this.add
      .text(width / 2, Layout.hudHeight + 60, 'Sous-sol clandestin · 5 PCs en service', {
        fontFamily: Fonts.body,
        fontSize: '13px',
        fontStyle: '600',
        color: '#94a3b8',
      })
      .setOrigin(0.5, 0.5);
    this.subtitle.setAlpha(0.85);
  }

  private drawPcs(): void {
    this.pcViews.forEach((p) => p.destroy());
    this.pcViews = [];

    const { width, height } = this.scale;
    const count = this.gameData.pcs.length;
    const baseY = height * 0.72;
    const totalWidth = (count - 1) * Layout.pcSpacing;
    const startX = width / 2 - totalWidth / 2;

    this.gameData.pcs.forEach((pc, index) => {
      const x = startX + index * Layout.pcSpacing;
      const view = new PcView(this, x, baseY, pc);
      view.alpha = 0;
      view.y = baseY + 30;
      this.tweens.add({
        targets: view,
        alpha: 1,
        y: baseY,
        duration: 520,
        ease: 'Back.easeOut',
        delay: 90 * index,
      });
      this.pcViews.push(view);
    });
  }

  private onResize = (gameSize: Phaser.Structs.Size): void => {
    const { width } = gameSize;
    this.zoneLabel.setPosition(width / 2, Layout.hudHeight + 28);
    this.subtitle.setPosition(width / 2, Layout.hudHeight + 60);
    this.drawPcs();
  };
}
