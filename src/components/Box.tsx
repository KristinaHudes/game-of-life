import { memo } from "react";

interface BoxProps {
  boxClass: string;
  row: number;
  col: number;
  selectBox: (row: number, col: number) => void;
}

export const Box: React.FC<BoxProps> = memo(
  ({ boxClass, row, col, selectBox }) => {
    const handleClick = () => selectBox(row, col);

    return <div className={boxClass} onClick={handleClick} />;
  },
  (prevProps, nextProps) => {
    return prevProps.boxClass === nextProps.boxClass;
  },
);
