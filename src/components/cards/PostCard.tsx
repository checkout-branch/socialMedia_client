/* eslint-disable @next/next/no-img-element */
import React from "react";
import { FcLike } from "react-icons/fc";
import { FaComment, FaUserCircle } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { AiOutlineSave } from "react-icons/ai";

interface PostCardProps {
  profileImage: string,
  author: string;
  description: string;
  imageUrl: string;
  likes: number;
  comments: number;
  timestamp: string;
}

const PostCard: React.FC<PostCardProps> = ({
  
  author,
  description,
  imageUrl,
  likes,
  comments,
  timestamp,
}) => {
  return (
    <div className="max-w-lg ml-40 text-white rounded-lg shadow-lg overflow-hidden mb-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        
          <div className="flex mb-2 items-center gap-1">
          <FaUserCircle className="text-2xl"/>
          <p className="text-sm text-gray-400 ">{author} •</p>
          <p className="text-sm text-gray-500 ">{timestamp}</p>
          </div>
          <div>•••</div>
      </div>

      {/* Image Section */}
      <img
      alt=""
        src={imageUrl}
        className="w-full h-96 object-cover rounded-t-lg" // Ensures the image respects rounded corners
      />

      {/* Action Icons Section */}
      <div className="flex justify-between items-center p-4">
        <div className="flex gap-3">
          <FcLike className="text-2xl cursor-pointer hover:text-red-500" />
          <FaComment className="text-2xl cursor-pointer hover:text-white" />
          <FiSend className="text-2xl cursor-pointer hover:text-white" />
        </div>
        <AiOutlineSave className=" text-2xl cursor-pointer hover:text-white" />
      </div>

      {/* Like & Comment Details */}
      <div className="px-4 pb-2">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>{likes} likes</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
          <span>View all {comments} comments</span>
        </div>
      </div>

      {/* Post Content Section */}
      <div className="px-4 pb-4">
        <p className="text-sm text-gray-300 line-clamp-3">{description}</p>
      </div>

      {/* Footer Section (Optional) */}
    <hr className="text-xs"/>
    </div>
  );
};

export default PostCard;
