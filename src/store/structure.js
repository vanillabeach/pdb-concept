import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadPdbData = createAsyncThunk(
  'structureSlice/setStructureViaLoad',
  async (url) => {
    const response = await fetch(url);
    const content = await response.text();

    return content;
  }
);

export const structureSlice = createSlice({
  name: 'structureSlice',
  initialState: {
    autoRotation: true,
    pdbData: null,
  },
  reducers: {
    toggleAutoRotation(state) {
      state.autoRotation = !state.autoRotation;
    },
    updatePdbData(state, action) {
      state.pdbData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadPdbData.fulfilled, (state, action) => {
      state.pdbData = action.payload;
    });
  },
});

export const structureActions = structureSlice.actions;
