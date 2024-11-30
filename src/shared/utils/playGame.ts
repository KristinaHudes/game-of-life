export const playGame = (
  grid: boolean[][],
  rows: number,
  cols: number,
): boolean[][] => {
  const newGrid = grid.map((row, i) =>
    row.map((cell, j) => {
      let count = 0;

      if (i > 0 && grid[i - 1][j]) count++;
      if (i > 0 && j > 0 && grid[i - 1][j - 1]) count++;
      if (i > 0 && j < cols - 1 && grid[i - 1][j + 1]) count++;
      if (j < cols - 1 && grid[i][j + 1]) count++;
      if (j > 0 && grid[i][j - 1]) count++;
      if (i < rows - 1 && grid[i + 1][j]) count++;
      if (i < rows - 1 && j > 0 && grid[i + 1][j - 1]) count++;
      if (i < rows - 1 && j < cols - 1 && grid[i + 1][j + 1]) count++;

      if (cell && (count < 2 || count > 3)) return false;
      if (!cell && count === 3) return true;

      return cell;
    }),
  );

  return newGrid;
};
