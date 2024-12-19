/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { AiOutlineSave } from "react-icons/ai";
import { formatDistanceToNow } from "date-fns"; 
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { likeToggleApi } from "@/service/post";

// Define the Post interface
interface Post {
  profileImage: string;
  userName: string;
  description: string;
  image: string;
  likes: number[];
  comments: number;
  createdAt: string;
  _id: string;
}

interface PostCardProps {
  post: Post;
  currentUserId: string;
}

const PostCard: React.FC<PostCardProps> = ({ post, currentUserId }) => {
  const { userName, description, image, likes, comments, createdAt, _id } = post;
  const [isLiked, setIsLiked] = useState(likes.includes(Number(currentUserId)));
  const [likeCount, setLikeCount] = useState(likes.length);

  const handleLike = async () => {
    try {
      await likeToggleApi(currentUserId, _id);
      // Toggle the like state
      setIsLiked(!isLiked);
      // Update the like count
      setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  // Format the timestamp as "time ago" (e.g., "2 hours ago")
  const formattedTimestamp = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return (
    <div className="max-w-lg ml-40 text-white rounded-lg shadow-lg overflow-hidden mb-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex mb-2 items-center gap-1">
          <FaUserCircle className="text-2xl" />
          <p className="text-sm text-gray-400">{userName} •</p>
          <p className="text-sm text-gray-500">{formattedTimestamp}</p>
        </div>
        <div>•••</div>
      </div>

      {/* Image Section */}
      <img
        alt="Post Image"
        src={image}
        className="w-full h-auto object-contain rounded-t-lg"
      />

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
        <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
          <span>View all {comments} comments</span>
        </div>
      </div>

      {/* Post Content Section */}
      <div className="px-4 pb-4 flex items-center gap-2">
        <p>{userName}</p>
        <p className="text-sm text-gray-300 line-clamp-3">{description}</p>
      </div>

      {/* Footer Section (Optional) */}
      <hr className="text-xs" />
    </div>
  );
};

export default PostCard;
