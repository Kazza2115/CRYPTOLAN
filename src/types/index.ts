export type Rarity = 'noob' | 'gamer' | 'pro' | 'esport' | 'legend';

export type Archetype =
  | 'fragger'
  | 'laner'
  | 'strategist'
  | 'speedrunner'
  | 'grinder';

export type PcTier = 'trash' | 'gamer' | 'rgb' | 'pro';

export interface Character {
  readonly id: string;
  readonly name: string;
  readonly nickname: string;
  readonly archetype: Archetype;
  readonly rarity: Rarity;
  readonly stars: number;
  readonly lore: string;
}

export interface PcGame {
  readonly id: string;
  readonly name: string;
  readonly durationMin: number;
  readonly winRate: number;
  readonly favoredArchetype: Archetype;
  readonly baseReward: number;
}

export interface Pc {
  readonly id: string;
  readonly slotIndex: number;
  readonly tier: PcTier;
  readonly locked: boolean;
  occupantId: string | null;
}

export interface GameData {
  readonly characters: readonly Character[];
  readonly games: readonly PcGame[];
  readonly pcs: readonly Pc[];
}
