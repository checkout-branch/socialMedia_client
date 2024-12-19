import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUser } from '@/service/profilel';
import { followApi, unFollowApi } from '@/service/follow';

interface FollowState {
  users: User[];
  followedUsers: string[];
  loading: boolean;
  error: string | null;
}

interface User {
  _id: string;
  userName: string;
  profileImageUrl: string;
}

const initialState: FollowState = {
  users: [],
  followedUsers: [] as string[],
  loading: false,
  error: null,
};

// Fetch all users
export const fetchUsers = createAsyncThunk('follow/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const res = await getAllUser();
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

// Follow a user
export const followUser = createAsyncThunk(
  'follow/followUser',
  async ({ userId, followId }: { userId: string; followId: string }, { rejectWithValue }) => {
    try {
      await followApi(userId, followId);
      return followId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Unfollow a user
export const unfollowUser = createAsyncThunk(
  'follow/unfollowUser',
  async ({ userId, followId }: { userId: string; followId: string }, { rejectWithValue }) => {
    try {
      await unFollowApi(userId, followId);
      return followId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const followSlice = createSlice({
  name: 'follow',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.followedUsers.push(action.payload);
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.followedUsers = state.followedUsers.filter(
            (id) => id !== action.payload
        )
      });
  },
});

export default followSlice.reducer;
