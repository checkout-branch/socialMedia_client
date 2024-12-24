// import { addCommentApi, getPostApi, likeStatusApi, likeToggleApi } from "@/service/post";
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// interface Comment {
//   content: string;
//   author: { _id: string; userName: string; profileImage: string };
// }

// interface LikeStatus {
//   isLiked: boolean;
//   likeCount: number;
// }

// interface Post {
//   profileImage: string;
//   userName: string;
//   description: string;
//   image: string;
//   likes: string[]; // Array of user IDs who liked the post
//   likeCount: number; // Add likeCount here to store the total count of likes
//   comments: Comment[];
//   createdAt: string;
//   _id: string;
//   userId: string;
// }

// interface PostState {
//   posts: Post[];
//   likes: Record<string, LikeStatus>;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: PostState = {
//   posts: [],
//   likes:{},
//   loading: false,
//   error: null,
// };

// // Fetch posts thunk
// export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
//   const response = await getPostApi();
//   console.log(response.data,'response');
//   return response.data;
// });

// // Toggle like thunk
// export const toggleLike = createAsyncThunk(
//   "posts/toggleLike",
//   async ({  userId,postId, }: { userId: string; postId: string; }) => {
//     const response = await likeToggleApi(userId, postId);

//     console.log(response,'togglelikde');
//     return { postId, likes: response.likes, likeCount: response.likeCount }; // Include likeCount in the response
//   }
// );

// export const fetchLikeStatus = createAsyncThunk(
//   "posts/fetchLikeStatus",
//   async ({ postId, userId }: { postId: string; userId: string }) => {
//     const response = await likeStatusApi(userId, postId);
//     console.log(response,'like statusss');
//     return { postId, likeCount: response.likeCount }; // Ensure the response includes likeCount
//   }
// );

// // Add comment thunk
// export const addComment = createAsyncThunk(
//   "posts/addComment",
//   async ({ postId, userId, content }: { postId: string; userId: string; content: string }) => {
//     const response = await addCommentApi(postId, userId, content);
//     return { postId, comment: response.comment };
//   }
// );

// const postSlice = createSlice({
//   name: "posts",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPosts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchPosts.fulfilled, (state, action) => {
//         state.loading = false;
//         if (Array.isArray(action.payload)) {
//           state.posts = action.payload.sort(
//             (a: Post, b: Post) =>
//               new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//           );
//         } else {
//           console.log(action.payload,'akldfjalf;d');
//           state.error = "Failed to fetch posts: payload is not an array";
//         }
//       })
      
//       .addCase(fetchPosts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Failed to fetch posts";
//       })
//       .addCase(toggleLike.fulfilled, (state, action) => {
//         const post = state.posts.find((p) => p._id === action.payload.postId);
//         if (post) {
//           post.likes = action.payload.likes;
//           post.likeCount = action.payload.likeCount; // Update the likeCount
//         }
//       })
//       .addCase(addComment.fulfilled, (state, action) => {
//         const post = state.posts.find((p) => p._id === action.payload.postId);
//         if (post) {
//           post.comments.push(action.payload.comment);
//         }
//       })
//       .addCase(fetchLikeStatus.fulfilled, (state, action) => {
//         const post = state.posts.find((p) => p._id === action.payload.postId);
//         if (post) {
//           post.likeCount = action.payload.likeCount; // Update likeCount directly
//         }
//       });
//   },
// });

// export default postSlice.reducer;
