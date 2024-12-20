import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../Hooks/redux';
import { fetchUsers, followUser, unfollowUser } from '../../features/followSlice';
import { FaUserCircle } from 'react-icons/fa';
import Button from '../button/Button';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { getUserId } from '@/utils/userId'; 

const UserSuggession: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { users, followedUsers, loading } = useAppSelector((state) => state.follow);

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentUserId = async () => {
      const id = await getUserId(); // Await the result of getUserId
      setCurrentUserId(id); // Set the current user ID once it's fetched
    };

    fetchCurrentUserId();
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleFollow = async (userId: string) => {
    if (!currentUserId) return; // If currentUserId is not available, do nothing

    // Follow/unfollow logic
    if (followedUsers.includes(userId)) {
      // If the user is already followed, unfollow
      dispatch(unfollowUser({ userId: currentUserId, followId: userId }));
    } else {
      // If the user is not followed, follow
      dispatch(followUser({ userId: currentUserId, followId: userId }));
    }
  };

  // Filter out the current user from the users list
  const filteredUsers = users.filter((user) => user._id !== currentUserId);

  if (loading || currentUserId === null) return <div>Loading...</div>;

  return (
    <div className="max-w-60 text-white rounded-lg p- gap-2">
      <h2 className="text-xl font-semibold mb-4">Suggested for you</h2>
      <div className="flex flex-col gap-4">
        {filteredUsers.map((user) => (
          <div key={user._id} className="flex justify-between">
            <div
              className="rounded-lg flex items-center gap-3"
              onClick={() => router.push(`/profile/${user._id}`)}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden">
                {user.profileImageUrl ? (
                  <Image
                    src={user.profileImageUrl}
                    alt={user.userName}
                    className="w-full h-full object-cover"
                    width={32}
                    height={32}
                  />
                ) : (
                  <FaUserCircle className="w-full h-full text-gray-500" />
                )}
              </div>
              <span className="text-sm font-semibold">{user.userName}</span>
            </div>
            <Button
              text={followedUsers.includes(user._id) ? 'Unfollow' : 'Follow'}
              size="small"
              onClick={() => handleFollow(user._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSuggession;
