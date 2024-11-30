export const randomGridSeed = (rows: number, cols: number): boolean[][] => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Math.random() < 0.25),
  );
};
