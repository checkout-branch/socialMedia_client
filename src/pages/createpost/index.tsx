import { createPostApi } from "@/service/post";
import PostForm from "@components/forms/PostForm";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const router = useRouter()
  const handlePostSubmit = async (data: { file: File | null; description: string }) => {

    try {
        const user = JSON.parse(sessionStorage.getItem("user") as string);
        const userId = user?.id;

        if (!userId) {
          console.error("User ID not found in session storage.");
          return;
        }

        // Create form data for the API
        const formData = new FormData();
        formData.append("description", data.description);
        if (data.file) {
          formData.append("image", data.file);
        }

        // Log FormData contents
        formData.forEach((value, key) => {
          console.log(key, value); 
        });

        // Call API to create the post
        const response = await createPostApi(formData,userId);

        console.log("Post created successfully:", response);
        router.push('/')
        
      
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="mt-8 max-w-[90%]">
      <h2 className="text-white text-xl font-semibold mb-4">Create new post</h2>
      <PostForm onSubmit={handlePostSubmit} />
    </div>
  );
}
