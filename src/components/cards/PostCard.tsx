// components/PostCard.tsx
import React, { useState, useEffect } from "react";
import { FaRegComment, FaRegHeart, FaHeart } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import { AiOutlineSave } from "react-icons/ai";
import { formatDistanceToNow } from "date-fns";
import { addCommentApi, likeStatusApi, likeToggleApi } from "@/service/post";
import { useRouter } from "next/router";
import { FaUserCircle } from "react-icons/fa";
import CommentModal from "@components/modals/commentModal";

interface Comment {
  author: { _id: string; userName: string,profileImage:string };
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

// components/PostCard.tsx

// Other imports and code...

const PostCard: React.FC<PostCardProps> = ({ post, currentUserId }) => {
  const router = useRouter();
  const {
    profileImage,
    userName,
    description,
    image,
    likes,
    createdAt,
    _id,
    userId,
    comments,
  } = post;

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(likes.length);
  const [newComment, setNewComment] = useState<string>("");
  const [commentsList, setCommentsList] = useState<Comment[]>(comments);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal state

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
      const response = await addCommentApi(currentUserId, _id, newComment);
      console.log(response, "API Response");

      if ("data" in response && response.data) {
        const newCommentData = response.data;
        console.log(newCommentData, "New Comment");
        setNewComment(""); 
        setCommentsList((prevComments) => [...prevComments, newCommentData]);
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const formattedTimestamp = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="max-w-lg ml-40 text-white rounded-lg shadow-lg overflow-hidden mb-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div
          className="flex mb-2 items-center gap-1 cursor-default"
          onClick={() => handleProfile(userId)}
        >
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
          <FaRegComment
            className="text-2xl cursor-pointer hover:text-white"
            onClick={toggleModal}
          />
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

      {/* Comment Count Section */}
      <div className="px-4 pb-4">
        <h3
          className="text-sm text-gray-400 cursor-pointer"
          onClick={toggleModal}
        >
          {commentsList.length === 1
            ? "View 1 comment"
            : comments.length > 1
            ? `View all ${comments.length} comments`
            : "No comments"}
        </h3>
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleAddComment} className=" flex items-center gap-2 mb-2 ml-2">
        <input
          type="text"
          className="bg-[#1a1c26] text-sm text-white px-3 py-1 w-full "
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit" className="text-sm text-blue-500 hover:underline">
          Post
        </button>
      </form>

      {/* Comment Modal */}
      <CommentModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        comments={comments} // Pass the full list of comments to the modal
        postUserName={userName}
        profileImage={profileImage}
      />
    </div>
  );
};

export default PostCard;
