import { Box } from "./Box";

interface GridRowProps {
  row: boolean[];
  rowIndex: number;
  selectBox: (row: number, col: number) => void;
}

export const GridRow: React.FC<GridRowProps> = ({
  row,
  rowIndex,
  selectBox,
}) => {
  return (
    <>
      {row.map((cell, colIndex) => (
        <Box
          key={`${rowIndex}-${colIndex}`}
          boxClass={cell ? "box on" : "box off"}
          row={rowIndex}
          col={colIndex}
          selectBox={selectBox}
        />
      ))}
    </>
  );
};
