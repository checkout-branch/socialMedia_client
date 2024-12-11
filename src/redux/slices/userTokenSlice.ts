import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserTokenState {
  token: string | null;
}

const initialState: UserTokenState = {
  token: null, // Default state is no token
};

const userTokenSlice = createSlice({
  name: 'userToken',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload; // Set the token
      
    },
    clearToken: (state) => {
      state.token = null; // Clear the token
    },
  },
});

// Export actions to dispatch
export const { setToken, clearToken } = userTokenSlice.actions;
// Export the reducer to add it to the store
export default userTokenSlice.reducer;
