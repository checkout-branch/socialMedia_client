import React from "react";
import { useRouter } from "next/router";
import Profile from "@/components/Profile"; // Import the Profile component

const OtherUserProfilePage: React.FC = () => {
  const { query } = useRouter();
  const { userId } = query; // Get userId from URL

  return <Profile userId={userId as string} />;  // Pass `userId` to Profile component
};

export default OtherUserProfilePage;
