import charactersJson from '../data/characters.json';
import gamesJson from '../data/games.json';
import pcsJson from '../data/pcs.json';
import type { Character, GameData, Pc, PcGame } from '../types';

export function loadGameData(): GameData {
  return {
    characters: charactersJson as readonly Character[],
    games: gamesJson as readonly PcGame[],
    pcs: pcsJson.map((p) => ({ ...p }) as Pc),
  };
}
