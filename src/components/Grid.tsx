import { GridRow } from "./GridRow";
import { memo } from "react";

interface GridProps {
  grid: boolean[][];
  selectBox: (row: number, col: number) => void;
}

export const Grid: React.FC<GridProps> = memo(({ grid, selectBox }) => {
  return (
    <div
      className="grid"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${grid[0].length}, 14px)`,
        justifyContent: "center",
      }}
    >
      {grid.map((row, rowIndex) => (
        <GridRow
          key={rowIndex}
          row={row}
          rowIndex={rowIndex}
          selectBox={selectBox}
        />
      ))}
    </div>
  );
});
