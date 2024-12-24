// // src/app/hooks/usePost.ts

// import { getPostApi, likeStatusApi } from "@/service/post";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// export const usePosts = () => {
//   return useQuery(["posts"], getPostApi);
// };

// export const useLikeStatus = (userId: string, postId: string) => {
//   return useQuery(
//     ["likeStatus", postId],
//     () => likeStatusApi(userId, postId),
//     { enabled: !!userId }
//   );
// };

// export const useLikeToggle = () => {
//   const queryClient = useQueryClient();
//   return useMutation(
//     (postId: string) => likeToggleApi(postId),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(["posts"]);
//       },
//     }
//   );
// };

// export const useAddComment = () => {
//   const queryClient = useQueryClient();
//   return useMutation(
//     (data: { postId: string; userId: string; content: string }) => addCommentApi(data.userId, data.postId, data.content),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(["posts"]);
//       },
//     }
//   );
// };
