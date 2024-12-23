/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { FaRegComment, FaRegHeart, FaHeart } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import { AiOutlineSave } from "react-icons/ai";
import { formatDistanceToNow } from "date-fns";
import { addCommentApi, likeStatusApi, likeToggleApi } from "@/service/post";
import { useRouter } from "next/router";
import { FaUserCircle } from "react-icons/fa";


interface Comment {
  author: { _id: string; userName: string };
  content: string;
}

interface Post {
  profileImage: string;
  userName: string;
  description: string;
  image: string;
  likes: number[];
  comments: Comment[];
  createdAt: string;
  _id: string;
  userId: string;
}

interface PostCardProps {
  post: Post;
  currentUserId: string;
}

const PostCard: React.FC<PostCardProps> = ({ post, currentUserId }) => {
  const router = useRouter();
  const { userName, description, image, likes, createdAt, _id, userId, comments } = post;

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(likes.length);
  const [newComment, setNewComment] = useState<string>("");
  const [postComments, setPostComments] = useState<Comment[]>(comments);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const likeResponse = await likeStatusApi(currentUserId, _id);
        setIsLiked(likeResponse?.isLiked);
        setLikeCount(likeResponse?.likeCount);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, [_id, currentUserId]);

  const handleProfile = (id: string) => {
    if (id === currentUserId) {
      router.push("/profile");
    } else {
      router.push(`/profile/${id}`);
    }
  };

  const handleLike = async () => {
    setIsLiked((prev) => !prev);
    setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));

    try {
      await likeToggleApi(currentUserId, _id);
    } catch (error) {
      console.error("Error toggling like:", error);
      setIsLiked((prev) => !prev);
      setLikeCount((prevCount) => (isLiked ? prevCount + 1 : prevCount - 1));
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await addCommentApi( currentUserId, _id, newComment);
      const { data } = response;
      setPostComments((prevComments) => [...prevComments, data]); // Update local comments
      setNewComment(""); // Clear input field
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const formattedTimestamp = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return (
    <div className="max-w-lg ml-40 text-white rounded-lg shadow-lg overflow-hidden mb-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex mb-2 items-center gap-1 cursor-default" onClick={() => handleProfile(userId)}>
          <FaUserCircle className="text-2xl" />
          <p className="text-sm text-gray-400">{userName} •</p>
          <p className="text-sm text-gray-500">{formattedTimestamp}</p>
        </div>
        <div>•••</div>
      </div>

      {/* Image Section */}
      <img alt="Post Image" src={image} className="w-full h-auto object-contain rounded-t-lg" />

      {/* Action Icons Section */}
      <div className="flex justify-between items-center p-4">
        <div className="flex gap-3">
          {isLiked ? (
            <FaHeart
              className="text-2xl cursor-pointer text-red-500"
              onClick={handleLike}
            />
          ) : (
            <FaRegHeart
              className="text-2xl cursor-pointer hover:text-red-500"
              onClick={handleLike}
            />
          )}
          <FaRegComment className="text-2xl cursor-pointer hover:text-white" />
          <FiSend className="text-2xl cursor-pointer hover:text-white" />
        </div>
        <AiOutlineSave className="text-2xl cursor-pointer hover:text-white" />
      </div>

      {/* Like & Comment Details */}
      <div className="px-4 pb-2">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>{likeCount} likes</span>
        </div>
      </div>

      {/* Post Content Section */}
      <div className="px-4 pb-4 flex items-center gap-2">
        <p>{userName}</p>
        <p className="text-sm text-gray-300 line-clamp-3">{description}</p>
      </div>

      {/* Comments Section */}
      <div className="px-4 pb-4">
        <h3 className="text-sm text-gray-400 mb-2">Comments</h3>
        {postComments.map((comment, index) => (
          <div key={index} className="mb-2">
            <p className="text-sm text-gray-300">{comment?.author?.userName }</p>
            <p className="text-sm text-gray-400">{comment?.content}</p>
          </div>
        ))}

        {/* Add Comment Form */}
        <form onSubmit={handleAddComment} className="mt-2 flex items-center gap-2">
          <input
            type="text"
            className="bg-gray-800 text-sm text-white px-3 py-1 rounded-lg w-full"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit" className="text-sm text-blue-500 hover:underline">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostCard;
