import { configureStore } from '@reduxjs/toolkit';
import followReducer from '../features/followSlice';
// import postReducer from '../features/postSlice'

const store = configureStore({
  reducer: {
    follow: followReducer,
    // posts: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
