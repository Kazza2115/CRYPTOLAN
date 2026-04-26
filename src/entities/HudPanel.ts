import Phaser from 'phaser';
import { Colors, Fonts, Layout, Stroke } from '../config/theme';

interface CounterDef {
  readonly key: 'coin' | 'energy' | 'streetCred';
  readonly label: string;
  readonly value: string;
}

export class HudPanel extends Phaser.GameObjects.Container {
  private background!: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0);
    scene.add.existing(this);
    this.build();
  }

  private build(): void {
    const { width } = this.scene.scale;

    this.background = this.scene.add.graphics();
    this.add(this.background);
    this.drawBackground(width);

    const counters: readonly CounterDef[] = [
      { key: 'coin', label: 'LanCoin', value: '1 250' },
      { key: 'energy', label: 'Energy', value: '12' },
      { key: 'streetCred', label: 'Street Cred', value: '0' },
    ];

    let cursor = Layout.hudPadding;
    counters.forEach((def) => {
      const block = this.scene.add.text(0, Layout.hudHeight / 2, '', {
        fontFamily: Fonts.body,
        fontSize: '13px',
        color: '#111111',
      });
      block.setText([
        `${def.label.toUpperCase()}`,
        `${def.value}`,
      ]);
      block.setOrigin(0, 0.5);
      block.setLineSpacing(2);
      block.setAlign('left');
      block.setStyle({
        fontFamily: Fonts.body,
        fontSize: '11px',
        color: '#888888',
      });

      const valueText = this.scene.add.text(0, Layout.hudHeight / 2, def.value, {
        fontFamily: Fonts.mono,
        fontSize: '17px',
        fontStyle: '700',
        color: '#111111',
      });
      valueText.setOrigin(0, 0.5);

      const labelText = this.scene.add.text(0, Layout.hudHeight / 2 - 14, def.label.toUpperCase(), {
        fontFamily: Fonts.body,
        fontSize: '10px',
        fontStyle: '700',
        color: '#888888',
      });
      labelText.setOrigin(0, 0.5);
      labelText.setLetterSpacing(1.2);

      block.destroy();
      labelText.x = cursor;
      valueText.x = cursor;
      valueText.y = Layout.hudHeight / 2 + 6;
      this.add(labelText);
      this.add(valueText);

      const w = Math.max(labelText.width, valueText.width);
      cursor += w + 28;
    });

    const title = this.scene.add.text(width / 2, Layout.hudHeight / 2, 'CRYPTO LAN', {
      fontFamily: Fonts.body,
      fontSize: '18px',
      fontStyle: '800',
      color: '#111111',
    });
    title.setOrigin(0.5, 0.5);
    title.setLetterSpacing(3);
    this.add(title);

    this.scene.scale.on('resize', this.onResize, this);
  }

  private drawBackground(width: number): void {
    this.background.clear();
    this.background.fillStyle(Colors.bgPrimary, 1);
    this.background.fillRect(0, 0, width, Layout.hudHeight);
    this.background.lineStyle(Stroke.thin, Colors.ink, 1);
    this.background.lineBetween(0, Layout.hudHeight, width, Layout.hudHeight);
  }

  private onResize = (gameSize: Phaser.Structs.Size): void => {
    this.drawBackground(gameSize.width);
  };

  override destroy(fromScene?: boolean): void {
    this.scene.scale.off('resize', this.onResize, this);
    super.destroy(fromScene);
  }
}
