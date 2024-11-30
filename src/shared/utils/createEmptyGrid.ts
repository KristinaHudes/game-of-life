export const createEmptyGrid = (rows: number, cols: number): boolean[][] => {
  return Array.from({ length: rows }, () => Array(cols).fill(false));
};
