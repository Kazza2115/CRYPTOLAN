import Phaser from 'phaser';
import { Colors } from '../config/theme';
import { PcView } from '../entities/PcView';
import { loadGameData } from '../systems/DataLoader';
import type { GameData } from '../types';

const PC_SPACING = 180;

export class LanHouseScene extends Phaser.Scene {
  private gameData!: GameData;

  constructor() {
    super({ key: 'LanHouseScene' });
  }

  create(): void {
    this.gameData = loadGameData();

    this.cameras.main.setBackgroundColor(Colors.bgPrimary);
    this.drawHeader();
    this.drawPcs();
    this.drawFooter();
  }

  private drawHeader(): void {
    const { width } = this.scale;

    this.add
      .text(width / 2, 56, 'Crypto Lan', {
        fontFamily: '"Nunito", sans-serif',
        fontSize: '36px',
        fontStyle: '800',
        color: '#f8fafc',
      })
      .setOrigin(0.5, 0.5);

    this.add
      .text(width / 2, 92, 'Garage · 5 PCs · phase 0 — proto vivant', {
        fontFamily: '"Nunito", sans-serif',
        fontSize: '14px',
        color: '#94a3b8',
      })
      .setOrigin(0.5, 0.5);
  }

  private drawPcs(): void {
    const { width, height } = this.scale;
    const count = this.gameData.pcs.length;
    const centerY = height / 2 + 10;
    const totalWidth = (count - 1) * PC_SPACING;
    const startX = width / 2 - totalWidth / 2;

    this.gameData.pcs.forEach((pc, index) => {
      const x = startX + index * PC_SPACING;
      const view = new PcView(this, x, centerY, pc);

      view.alpha = 0;
      view.y = centerY + 24;
      this.tweens.add({
        targets: view,
        alpha: 1,
        y: centerY,
        duration: 420,
        ease: 'Back.easeOut',
        delay: 80 * index,
      });
    });
  }

  private drawFooter(): void {
    const { width, height } = this.scale;

    this.add
      .text(
        width / 2,
        height - 48,
        `${this.gameData.characters.length} persos charges · ${this.gameData.games.length} jeux PC`,
        {
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '12px',
          color: '#64748b',
        },
      )
      .setOrigin(0.5, 0.5);
  }
}
