import Phaser from 'phaser';
import { Colors, Fonts, Layout } from '../config/theme';

interface CounterDef {
  readonly key: 'coin' | 'energy' | 'streetCred';
  readonly value: string;
  readonly color: number;
}

const PILL_HEIGHT = 44;
const PILL_PADDING_X = 18;
const ICON_SIZE = 22;
const PILL_GAP = 12;

export class HudPanel extends Phaser.GameObjects.Container {
  private background!: Phaser.GameObjects.Graphics;
  private pills: Phaser.GameObjects.Container[] = [];

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
      { key: 'coin', value: '1 250', color: Colors.function.coin },
      { key: 'energy', value: '12', color: Colors.function.energy },
      { key: 'streetCred', value: '0', color: Colors.function.streetCred },
    ];

    let cursor = Layout.hudPadding;
    counters.forEach((def) => {
      const pill = this.buildPill(def);
      pill.setPosition(cursor + 0, Layout.hudHeight / 2);
      const pillWidth = (pill.getData('width') as number) ?? 140;
      pill.x = cursor + pillWidth / 2;
      this.add(pill);
      this.pills.push(pill);
      cursor += pillWidth + PILL_GAP;
    });

    const title = this.scene.add.text(width / 2, Layout.hudHeight / 2, 'Crypto Lan', {
      fontFamily: Fonts.body,
      fontSize: '22px',
      fontStyle: '800',
      color: '#f8fafc',
    });
    title.setOrigin(0.5, 0.5);
    title.setLetterSpacing(0.5);
    this.add(title);

    this.scene.scale.on('resize', this.onResize, this);
  }

  private drawBackground(width: number): void {
    this.background.clear();
    this.background.fillGradientStyle(
      Colors.bgSecondary,
      Colors.bgSecondary,
      Colors.bgPrimary,
      Colors.bgPrimary,
      0.95,
      0.95,
      0,
      0,
    );
    this.background.fillRect(0, 0, width, Layout.hudHeight);
    this.background.lineStyle(1, Colors.bgPanelLight, 0.35);
    this.background.lineBetween(0, Layout.hudHeight, width, Layout.hudHeight);
  }

  private buildPill(def: CounterDef): Phaser.GameObjects.Container {
    const valueText = this.scene.add.text(0, 0, def.value, {
      fontFamily: Fonts.mono,
      fontSize: '18px',
      fontStyle: '700',
      color: '#f8fafc',
    });
    valueText.setOrigin(0, 0.5);

    const valueWidth = valueText.width;
    const pillWidth = PILL_PADDING_X * 2 + ICON_SIZE + 10 + valueWidth;

    const container = this.scene.add.container(0, 0);
    container.setData('width', pillWidth);

    const bg = this.scene.add.graphics();
    bg.fillStyle(Colors.bgPanel, 0.85);
    bg.fillRoundedRect(-pillWidth / 2, -PILL_HEIGHT / 2, pillWidth, PILL_HEIGHT, PILL_HEIGHT / 2);
    bg.lineStyle(1, def.color, 0.35);
    bg.strokeRoundedRect(-pillWidth / 2, -PILL_HEIGHT / 2, pillWidth, PILL_HEIGHT, PILL_HEIGHT / 2);

    const iconX = -pillWidth / 2 + PILL_PADDING_X;
    const icon = this.buildIcon(def.key, def.color);
    icon.setPosition(iconX + ICON_SIZE / 2, 0);

    valueText.setPosition(iconX + ICON_SIZE + 10, 0);

    container.add([bg, icon, valueText]);

    if (this.scene.renderer.type === Phaser.WEBGL) {
      container.postFX?.addGlow(def.color, 1.4, 0, false, 0.1, 8);
    }

    return container;
  }

  private buildIcon(key: CounterDef['key'], color: number): Phaser.GameObjects.Graphics {
    const g = this.scene.add.graphics();
    const r = ICON_SIZE / 2;

    if (key === 'coin') {
      g.fillStyle(color, 1);
      g.fillCircle(0, 0, r);
      g.fillStyle(0x0f0f1a, 1);
      g.fillCircle(0, 0, r - 4);
      g.fillStyle(color, 1);
      g.fillCircle(0, 0, r - 7);
    } else if (key === 'energy') {
      g.fillStyle(color, 1);
      g.beginPath();
      g.moveTo(-2, -r);
      g.lineTo(r - 2, -2);
      g.lineTo(2, 0);
      g.lineTo(r - 4, r);
      g.lineTo(-r + 2, 2);
      g.lineTo(-2, 0);
      g.closePath();
      g.fillPath();
    } else {
      g.fillStyle(color, 1);
      const points: number[] = [];
      const outer = r;
      const inner = r * 0.45;
      for (let i = 0; i < 10; i++) {
        const angle = (Math.PI / 5) * i - Math.PI / 2;
        const radius = i % 2 === 0 ? outer : inner;
        points.push(Math.cos(angle) * radius, Math.sin(angle) * radius);
      }
      g.fillPoints(
        points.reduce<{ x: number; y: number }[]>((acc, _v, i) => {
          if (i % 2 === 0) acc.push({ x: points[i]!, y: points[i + 1]! });
          return acc;
        }, []),
        true,
      );
    }
    return g;
  }

  private onResize = (gameSize: Phaser.Structs.Size): void => {
    this.drawBackground(gameSize.width);
  };

  override destroy(fromScene?: boolean): void {
    this.scene.scale.off('resize', this.onResize, this);
    super.destroy(fromScene);
  }
}
