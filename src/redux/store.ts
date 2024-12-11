import { configureStore } from '@reduxjs/toolkit';
import userTokenReducer from './slices/userTokenSlice'; // Import the user token slice

const store = configureStore({
  reducer: {
    userToken: userTokenReducer, // Add the userToken slice to the store
  },
});

export default store;
