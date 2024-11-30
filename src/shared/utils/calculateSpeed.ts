export const calculateSpeed = (rows: number, cols: number): number => {
  const size = rows * cols;

  if (size <= 200) return 100;

  if (size <= 1500) return 200;

  return 300;
};
