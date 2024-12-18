/* eslint-disable @next/next/no-img-element */
import { getUserById } from "@/service/profilel";
import React, { useEffect, useState } from "react";
import { FaCoins } from "react-icons/fa";

interface Post {
    image: string;
  }

interface User {
  image: string;
  name: string;
  userName: string;
  bio: string;
  posts: Post[];
  followers: number;
  following: number;
  coins: number;
  postsImages: string[];
};

const ProfilePage: React.FC = () => {
  const [userDetails, setUserDetails] = useState<User | null>(null);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user") as string);
    const userId = user?.id;

    if (!userId) {
      console.error("User ID not found in session storage.");
      return;
    }
    const fetchUser = async() => {
        try {
            const res = await getUserById(userId)
            setUserDetails(res)
        } catch (error) {
            console.log(error)
        }
    }
    fetchUser()
  }, []);

  console.log(userDetails,'user details');

  // While user is null, display a loading message
//   if (!user) {
//     return <div className="text-white text-center mt-20">Loading...</div>;
//   }

  return (
    <div className="min-h-screen  text-white mr-24 mt-5">
      {/* Header */}
      <div className="relative bg-[#6f30d8] h-40 rounded-lg">
        <div className="absolute left-1/2 transform -translate-x-1/2 top-24">
          <img
            src={userDetails?.image}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-[#0f0f17]"
          />
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-20 text-center">
        <h1 className="text-2xl font-bold">{userDetails?.name}</h1>
        <p className="text-gray-400">@{userDetails?.userName}</p>
        <p className="text-gray-300 max-w-lg mx-auto mt-2">{userDetails?.bio}</p>

        <div className="flex justify-center gap-8 mt-6">
          <div>
            <p className="text-lg font-semibold">{userDetails?.posts?.length}</p>
            <p className="text-gray-400">Posts</p>
          </div>
          <div>
            <p className="text-lg font-semibold">{userDetails?.followers}</p>
            <p className="text-gray-400">Followers</p>
          </div>
          <div>
            <p className="text-lg font-semibold">{userDetails?.following}</p>
            <p className="text-gray-400">Following</p>
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-4">
          <button className="bg-[#6f30d8] px-4 py-2 rounded-lg">Edit Profile</button>
          <button className="bg-[#292b36] px-4 py-2 rounded-lg">Leaderboard</button>
        </div>
      </div>

      {/* Coins */}
      <div className="flex justify-center items-center mt-8 gap-2">
        <FaCoins className="text-yellow-400 text-3xl" />
        <p className="text-2xl font-semibold">
          {userDetails?.coins ? userDetails?.coins?.toLocaleString() : "0"} Coins
        </p>
      </div>

      {/* Tabs */}
      <div className="mt-10 px-6">
        <div className="flex border-b-2 border-gray-700">
          <button className="text-white px-4 py-2 border-b-2 border-[#6f30d8]">POSTS</button>
          <button className="text-gray-400 px-4 py-2">SAVED</button>
        </div>
      </div>

      {/* Posts */}
      {/* Posts */}
<div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-6 mt-6">
  {userDetails?.posts?.map((post, index) => (
    
    <div key={index} className="rounded-lg overflow-hidden">
      <img
        src={post.image}
        alt={`Post ${index + 1}`}
        className="w-full h-48 object-cover"
      />
    </div>
  ))}
</div>

    </div>
  );
};

export default ProfilePage;
