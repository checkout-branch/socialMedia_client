import React, { useEffect, useState } from "react";
import { FaCoins, FaUser } from "react-icons/fa";
import Image from "next/image";
import Button from "./button/Button";
import FollowListModal from "./modals/followModal";
import { getUserById } from "@/service/profilel";
import { toggleFollowApi } from "@/service/follow";
import { getUserId } from "@/utils/userId";

interface User {
  image: string;
  name: string;
  userName: string;
  bio: string;
  posts: { image: string }[];
  followers: { userName: string; _id: string }[];
  following: { userName: string; _id: string }[];
  coins: number;
  _id: string;
}

interface ProfileProps {
  userId?: string;
}

const Profile: React.FC<ProfileProps> = ({ userId }) => {
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState<{ userName: string; _id: string }[]>([]);
  const [currentFollowingIds, setCurrentFollowingIds] = useState<string[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  useEffect(() => {
    const fetchCurrentUserId = async () => {
      try {
        const userId = await getUserId(); // Await the promise
        setCurrentUserId(userId); // Set the current user ID
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchCurrentUserId();
  }, []);

  useEffect(() => {
    const fetchUser = async (userId: string) => {
      try {
        const res = await getUserById(userId);
        setUserDetails(res);
        setCurrentFollowingIds(res.following.map((ele: { _id: string }) => ele._id));
      } catch (error) {
        console.error(error);
      }
    };

    if (userId) {
      fetchUser(userId); // Fetch user details if userId is passed as prop
    } else if (currentUserId) {
      fetchUser(currentUserId); // Fetch current logged-in user's details
    }
  }, [userId, currentUserId]);

  const openModal = (type: "followers" | "following") => {
    setModalTitle(type === "followers" ? "Followers" : "Following");
    setModalData(type === "followers" ? userDetails?.followers || [] : userDetails?.following || []);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFollowToggle = async (targetUserId: string) => {
    if (!currentUserId || currentUserId === targetUserId) {
      console.error("User cannot follow themselves");
      return;
    }

    try {
      const payload = { userId: currentUserId, followId: targetUserId };

      // Call the toggleFollow API
      const res = await toggleFollowApi(payload);

      if (res.status === 200) {
        // Successfully followed/unfollowed, update the state accordingly
        if (currentFollowingIds.includes(targetUserId)) {
          // Unfollow logic
          setCurrentFollowingIds((prev) => prev.filter((id) => id !== targetUserId));

          // Update follower count
          setUserDetails((prev) => {
            if (prev) {
              const updatedFollowers = prev.followers.filter((follower) => follower._id !== targetUserId);
              return { ...prev, followers: updatedFollowers };
            }
            return prev;
          });
        } else {
          // Follow logic
          setCurrentFollowingIds((prev) => [...prev, targetUserId]);

          // Update follower count
          setUserDetails((prev) => {
            if (prev) {
              const updatedFollowers = [...prev.followers, { userName: "", _id: targetUserId }];
              return { ...prev, followers: updatedFollowers };
            }
            return prev;
          });
        }
      } else {
        console.error("Error during follow/unfollow operation");
      }
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen text-white mr-24 mt-5">
      <div className="relative bg-[#6f30d8] h-40 rounded-lg">
        <div className="absolute left-1/2 transform -translate-x-1/2 top-24">
          {userDetails.image ? (
            <Image
              src={userDetails.image}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-[#0f0f17]"
              width={112}
              height={112}
            />
          ) : (
            <div className="w-28 h-28 rounded-full border-4 border-[#0f0f17] bg-gray-300 flex items-center justify-center text-3xl text-gray-700">
              <FaUser />
            </div>
          )}
        </div>
      </div>

      <div className="mt-20 text-center">
        <h1 className="text-2xl font-bold">{userDetails.name}</h1>
        <p className="text-gray-400">@{userDetails.userName}</p>
        <p className="text-gray-300 max-w-lg mx-auto mt-2">{userDetails.bio}</p>

        <div className="flex justify-center gap-8 mt-6">
          <div>
            <p className="text-lg font-semibold">{userDetails.posts.length}</p>
            <p className="text-gray-400">Posts</p>
          </div>
          <div onClick={() => openModal("followers")}>
            <p className="text-lg font-semibold">{userDetails.followers.length}</p>
            <p className="text-gray-400">Followers</p>
          </div>
          <div onClick={() => openModal("following")}>
            <p className="text-lg font-semibold">{userDetails.following.length}</p>
            <p className="text-gray-400">Following</p>
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-4">
          {currentUserId && userId && userId !== currentUserId ? (  // Ensure userId is defined before using it
            <div className="flex gap-4">
              <Button
                text={currentFollowingIds.includes(userId) ? "Following" : "Follow"}
                onClick={() => handleFollowToggle(userId)} // Only call handleFollowToggle if userId is defined
              />
              <Button text="Message" />
            </div>
          ) : (
            <div className="flex gap-4">
              <Button text="Edit Profile" />
              <Button text="Tournaments" />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center mt-8 gap-2">
        <FaCoins className="text-yellow-400 text-3xl" />
        <p className="text-2xl font-semibold">{userDetails.coins ? userDetails.coins.toLocaleString() : "0"} Coins</p>
      </div>

      <div className="mt-10 px-6">
        <div className="flex border-b-2 border-gray-700">
          <button className="text-white px-4 py-2 border-b-2 border-[#6f30d8]">POSTS</button>
          <button className="text-gray-400 px-4 py-2">SAVED</button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-6 mt-6">
        {userDetails.posts.map((post, index) => (
          <div key={index} className="rounded-lg overflow-hidden">
            <img
              src={post.image}
              alt={`Post ${index + 1}`}
              className="w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>

      <FollowListModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        title={modalTitle}
        users={modalData}
        followingIds={currentFollowingIds}
        onFollowToggle={handleFollowToggle}
      />
    </div>
  );
};

export default Profile;
