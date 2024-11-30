import {
  incrementGeneration,
  updateGrid,
  setIsPlaying,
  seed,
} from "../app/store/gameSlice";
import { playGame } from "../shared/utils/playGame";
import { useRef, useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

export const useGameControl = (
  grid: boolean[][],
  rows: number,
  cols: number,
  speed: number,
  isPlaying: boolean,
) => {
  const dispatch = useDispatch();

  const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [previousGrids, setPreviousGrids] = useState<Set<string>>(new Set());

  const checkEndGame = useCallback(
    (newGrid: boolean[][]) => {
      const isGridEmpty = !newGrid.some((row) => row.some((cell) => cell));

      const gridState = JSON.stringify(newGrid);

      const isRepeated = previousGrids.has(gridState);

      if (isGridEmpty || isRepeated) {
        dispatch(setIsPlaying(false));

        return true;
      }

      setPreviousGrids((prev) => new Set(prev).add(gridState));

      return false;
    },

    [dispatch, previousGrids],
  );

  const startGame = useCallback(() => {
    if (intervalIdRef.current) clearInterval(intervalIdRef.current);

    intervalIdRef.current = setInterval(() => {
      dispatch(incrementGeneration());

      const newGrid = playGame(grid, rows, cols);

      if (checkEndGame(newGrid)) {
        clearInterval(intervalIdRef.current!);

        return;
      }

      dispatch(updateGrid(newGrid));
    }, speed);
  }, [dispatch, grid, rows, cols, speed, checkEndGame]);

  useEffect(() => {
    if (isPlaying) {
      const isGridEmpty = !grid.some((row) => row.some((cell) => cell));

      if (isGridEmpty) {
        dispatch(seed());
      }

      startGame();
    } else if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [isPlaying, grid, dispatch, startGame]);

  return { startGame, checkEndGame, setPreviousGrids };
};
