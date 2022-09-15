import { configureStore } from '@reduxjs/toolkit';
import { structureSlice } from './structure';

const store = configureStore({
  reducer: {
    structure: structureSlice.reducer,
  },
});

export default store;
