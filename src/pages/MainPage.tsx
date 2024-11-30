import { RootState } from "../app/store";
import {
  toggleCell,
  seed,
  clear,
  setGridSize,
  setSpeed,
  setIsPlaying,
} from "../app/store/gameSlice";
import { Buttons } from "../components/Buttons";
import { Grid } from "../components/Grid";
import { useGameControl } from "../hooks/useGameControl";
import { calculateSpeed } from "../shared/utils/calculateSpeed";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const MainPage = () => {
  const dispatch = useDispatch();

  const { grid, generation, speed, rows, cols, isPlaying } = useSelector(
    (state: RootState) => state.game,
  );

  const { setPreviousGrids } = useGameControl(
    grid,
    rows,
    cols,
    speed,
    isPlaying,
  );

  useEffect(() => {
    const newSpeed = calculateSpeed(rows, cols);

    dispatch(setSpeed(newSpeed));
  }, [rows, cols, dispatch]);

  const handlePlay = () => {
    dispatch(setIsPlaying(true));
  };

  const handlePause = () => {
    dispatch(setIsPlaying(false));
  };

  const handleClear = () => {
    dispatch(setIsPlaying(false));
    dispatch(clear());
    setPreviousGrids(new Set());
  };

  const handleSeed = () => {
    dispatch(seed());
    setPreviousGrids(new Set());
  };

  const handleFast = () => {
    dispatch(setSpeed(100));
  };

  const handleSlow = () => {
    dispatch(setSpeed(500));
  };

  const handleGridSize = (size: string) => {
    const sizeMap: { [key: string]: { rows: number; cols: number } } = {
      "1": { rows: 10, cols: 20 },
      "2": { rows: 30, cols: 50 },
      "3": { rows: 50, cols: 70 },
    };

    const { rows: newRows, cols: newCols } = sizeMap[size] || sizeMap["2"];

    dispatch(setGridSize({ rows: newRows, cols: newCols }));
    dispatch(setSpeed(calculateSpeed(newRows, newCols)));
    dispatch(clear());
    setPreviousGrids(new Set());
  };

  const handleSelectBox = (row: number, col: number) => {
    dispatch(toggleCell({ row, col }));
  };

  return (
    <div>
      <h1>Game of Life</h1>

      <Buttons
        actions={{
          play: handlePlay,
          pause: handlePause,
          clear: handleClear,
          seed: handleSeed,
          fast: handleFast,
          slow: handleSlow,
          gridSize: handleGridSize,
        }}
      />

      <Grid grid={grid} selectBox={handleSelectBox} />

      <h2>Generations: {generation}</h2>
    </div>
  );
};

export default MainPage;
