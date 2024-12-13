import PostCard from "@components/Cards/PostCard";
import UserSuggession from "@components/Cards/SuggessionCard";


const posts = [
    {
      author: "John Doe",
      profileImage:'',
      description:
        "Gaming has become a significant part of modern culture, bringing people together from across the globe...",
      imageUrl:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      likes: 120,
      comments: 45,
      timestamp: "2h",
    },
    {
      author: "Jane Smith",
      profileImage:'',
      description:
        "Learn the top strategies to dominate in your next gaming tournament. From preparation to execution...",
      imageUrl:
        "https://2.bp.blogspot.com/-DXC1pew5cEw/XH6E1Qqyy9I/AAAAAAAAAXw/gZoDztBlqrEaMccig1tTgoi5QTwybtZIgCKgBGAs/w0/pubg-playerunknowns-battlegrounds-uhdpaper.com-8K-1.jpg",
      likes: 87,
      comments: 22,
      timestamp: "1d",
    },
  ];

  
  

export default function Home () {
    return (
        <div className="flex gap-6 p-4">
        {/* Posts Section */}
        <div className="grid grid-cols-1 gap-6 w-3/4">
          {posts.map((post, index) => (
            <PostCard key={index} {...post} />
          ))}
        </div>
  
        {/* Suggested Users Section */}
        <div className="w-1/4 mr-20 mt-2">
          < UserSuggession/>
        </div>
      </div>
  
    )
}

