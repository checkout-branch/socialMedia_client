'use client'
import { getPostApi } from "@/service/post";
import PostCard from "@components/cards/PostCard";
import UserSuggession from "@components/cards/SuggessionCard";
import { useEffect, useState } from "react";

// Define the Post interface
interface Post {
  profileImage: string;
  userName: string;
  description: string;
  image: string;
  likes: number[];
  comments: number;
  createdAt: string;
}


export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]); // Define state as an array of Post objects

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const res = await getPostApi();
        const sortedPosts = res?.data.sort((a: Post, b: Post) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        setPosts(sortedPosts);
        console.log(sortedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchTournaments();
  }, []);



  return (
    <div className="flex gap-6 p-4">
      {/* Posts Section */}
      <div className="grid grid-cols-1 gap-6 w-3/4">
        {posts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </div>

      {/* Suggested Users Section */}
      <div className="w-1/4 mr-20 mt-2">
        <UserSuggession />
      </div>
    </div>
  );
}
