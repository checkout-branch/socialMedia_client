import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface User {
  userName: string;
  _id: string;
}

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  users: User[];
  followingIds: string[]; // Array of user IDs the current user is following
  onFollowToggle: (userId: string) => void; // Function to handle follow/unfollow
}

const FollowListModal: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
  title,
  users,
  followingIds,
  onFollowToggle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-black p-6 rounded-lg w-96 relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-white text-lg"
          onClick={closeModal}
          aria-label="Close"
        >
          <FaTimes />
        </button>

        {/* Modal Title */}
        <h2 className="text-xl font-semibold mb-4 text-white">{title}</h2>

        {/* User List */}
        <ul>
          {users.length === 0 ? (
            <li className="text-gray-300">No users found</li>
          ) : (
            users.map((user) => {
              const isFollowing = followingIds?.includes(user._id);
              return (
                <li key={user._id} className="flex justify-between items-center mb-2 text-gray-300">
                  <span>{user.userName}</span>
                  <button
                    className={`px-3 py-1 rounded ${
                      isFollowing ? 'bg-gray-500 text-white' : 'bg-blue-500 text-white'
                    }`}
                    onClick={() => onFollowToggle(user._id)}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default FollowListModal;
