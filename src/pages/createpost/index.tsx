import Image from "next/image";
import { useState } from "react";
import { FiImage, FiVideo } from "react-icons/fi";

export default function CreatePost() {
  // State hooks for managing selected file, preview URL, and description
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");

  // Handle file selection and preview URL creation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Create a preview URL for the selected file
      const fileURL = URL.createObjectURL(file);
      setPreviewURL(fileURL);
    }
  };

  // Handle description input change
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  return (
    <div className="mt-8 max-w-[90%]">
      {/* Post Creation Title */}
      <h2 className="text-white text-xl font-semibold mb-4">Create new post</h2>

      {/* Post Creation Box */}
      <div className="flex flex-col items-center justify-center p-20 ">
        <div className={`flex  ${
            selectedFile ? "w-3/4" : "w-96"
          } bg-gray-700 rounded-lg p-4 shadow-lg transition-all duration-300 gap-2`}>
        <div>
        <div className="w-full mb-4 ">
            {previewURL ? (
              // If the file is an image, render it inside <Image> tag
              selectedFile && selectedFile.type.startsWith("image") ? (
                <Image
                  width={256}
                  height={256}
                  src={previewURL}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
              ) : (
                // If the file is a video, render the video element
                <video
                  src={previewURL}
                  className="w-full h-64 object-cover rounded-lg"
                  controls
                />
              )
            ) : (
              // Placeholder if no file is selected
              <div className="flex flex-col items-center text-gray-500">
                <FiImage size={48} />
                <FiVideo size={48} className="mt-2" />
              </div>
            )}
          </div>

          {/* File Selection Button */}
          <label
            htmlFor="file-input"
            className="bg-purple-600 text-white rounded-md px-4 py-2 cursor-pointer mt-4 hover:bg-purple-500 transition"
          >
            {selectedFile ? "Change File" : "Select image/video from Gallery"}
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

         <div className=" flex justify-between flex-col">
             {/* Description Input Field (only visible after file is selected) */}
          {selectedFile && (
            <textarea
              placeholder="Write a description..."
              value={description}
              onChange={handleDescriptionChange}
              className="w-full p-2 bg-gray-800 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={4}
              cols={40}
            />
          )}

          {/* Post Button (only visible after file is selected) */}
          {selectedFile && (
            <button
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 transition"
              onClick={() => console.log({ file: selectedFile, description })}
            >
              Post
            </button>
          )}
         </div>
        </div>
      </div>
    </div>
  );
}
