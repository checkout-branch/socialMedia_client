import Button from "@components/button/Button";
import Image from "next/image";
import { useState } from "react";
import { FiImage } from "react-icons/fi";

interface PostFormProps {
  onSubmit: (data: { file: File | null; description: string }) => void;
}

export default function PostForm({ onSubmit }: PostFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handlePost = () => {
    // Check if the description is empty
    if (!description.trim()) {
      setError("Description is required.");
      return;
    }

    // Clear error if description is valid
    setError("");
    onSubmit({ file: selectedFile, description });
  };

  return (
    <div className="flex flex-col items-center justify-center p-20">
      <div
        className={`flex ${
          selectedFile ? "w-3/4" : "w-96 h-80 flex items-center justify-center"
        } bg-gray-700 rounded-lg p-4 shadow-lg transition-all duration-300 gap-2`}
      >
        <div>
          <div className="w-full mb-4">
            {previewURL ? (
              selectedFile && selectedFile.type.startsWith("image") ? (
                <Image
                  width={256}
                  height={256}
                  src={previewURL}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
              ) : (
                <video
                  src={previewURL}
                  className="w-full h-64 object-cover rounded-lg"
                  controls
                />
              )
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                <FiImage size={48} />
              </div>
            )}
          </div>

          <label
            htmlFor="file-input"
            className="bg-[#6a3aba] text-white rounded-md px-4 py-2 cursor-pointer mt-4 hover:bg-[#5b319c] transition"
          >
            {selectedFile ? "Change File" : "Select image from Gallery"}
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <div className="flex justify-between flex-col">
          {selectedFile && (
            <textarea
              placeholder="Write a description..."
              value={description}
              onChange={handleDescriptionChange}
              className="w-full p-2 bg-gray-800 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#6a3aba]"
              rows={4}
              cols={40}
            />
          )}

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Display error */}

          {selectedFile && (
            <Button
              text="Post"
              onClick={handlePost}
            />
          )}
        </div>
      </div>
    </div>
  );
}
