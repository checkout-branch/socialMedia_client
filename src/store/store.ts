import { configureStore } from '@reduxjs/toolkit';
import followReducer from '../features/followSlice';

const store = configureStore({
  reducer: {
    follow: followReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
