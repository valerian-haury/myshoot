import { configureStore } from '@reduxjs/toolkit';
import shootingProgramsReducer from '../features/shootingPrograms/shootingProgramsSlice';
import targetsReducer from '../features/Targets/TargetsSlice'

export const store = configureStore({
  reducer: {
    shootingPrograms: shootingProgramsReducer,
    targets: targetsReducer
  },
});
