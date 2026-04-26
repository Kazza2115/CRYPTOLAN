export const TILE_W = 96;
export const TILE_H = 48;

export const ROOM_COLS = 13;
export const ROOM_ROWS = 9;
export const WALL_HEIGHT = 240;

export interface ScreenPoint {
  readonly x: number;
  readonly y: number;
}

export function iso(worldX: number, worldY: number, worldZ = 0): ScreenPoint {
  return {
    x: (worldX - worldY) * (TILE_W / 2),
    y: (worldX + worldY) * (TILE_H / 2) - worldZ,
  };
}

export function isoDepth(worldX: number, worldY: number, worldZ = 0): number {
  return (worldX + worldY) * 1000 + worldZ;
}
