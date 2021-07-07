import { configureStore } from '@reduxjs/toolkit';
import shootingProgramsReducer from '../features/shootingPrograms/shootingProgramsSlice';

export const store = configureStore({
  reducer: {
    shootingPrograms: shootingProgramsReducer
  },
});
