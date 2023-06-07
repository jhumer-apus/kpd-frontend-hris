// actions/dtr.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DtrState {
    index: number | null;
    str: string | null;
}

const initialState: DtrState = {
    index: null,
    str: null,
};

const dtrSlice = createSlice({
  name: 'dtr',
  initialState,
  reducers: {
    saveIndexAndString: (state, action: PayloadAction<{ index: number; str: string }>) => {
      state.index = action.payload.index;
      state.str = action.payload.str;
    },
  },
});

export const { saveIndexAndString } = dtrSlice.actions;

export const dtrReducer = dtrSlice.reducer;