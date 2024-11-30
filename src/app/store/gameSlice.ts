import { createEmptyGrid } from "../../shared/utils/createEmptyGrid";
import { randomGridSeed } from "../../shared/utils/randomGridSeed";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
  grid: boolean[][];
  generation: number;
  rows: number;
  cols: number;
  speed: number;
  isPlaying: boolean;
}

const initialState: GameState = {
  grid: createEmptyGrid(30, 50),
  generation: 0,
  rows: 30,
  cols: 50,
  speed: 100,
  isPlaying: true,
};

const gameSlice = createSlice({
  name: "game",
  initialState,

  reducers: {
    toggleCell(state, action: PayloadAction<{ row: number; col: number }>) {
      const { row, col } = action.payload;
      state.grid[row][col] = !state.grid[row][col];
    },

    seed(state) {
      state.grid = randomGridSeed(state.rows, state.cols);
    },

    clear(state) {
      state.grid = createEmptyGrid(state.rows, state.cols);
      state.generation = 0;
    },

    setGridSize(state, action: PayloadAction<{ rows: number; cols: number }>) {
      const { rows, cols } = action.payload;
      state.rows = rows;
      state.cols = cols;
      state.grid = createEmptyGrid(rows, cols);
    },

    incrementGeneration(state) {
      state.generation += 1;
    },

    updateGrid(state, action: PayloadAction<boolean[][]>) {
      state.grid = action.payload;
    },

    setSpeed(state, action: PayloadAction<number>) {
      state.speed = action.payload;
    },

    setIsPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
  },
});

export const {
  toggleCell,
  seed,
  clear,
  setGridSize,
  incrementGeneration,
  updateGrid,
  setSpeed,
  setIsPlaying,
} = gameSlice.actions;

export default gameSlice.reducer;
