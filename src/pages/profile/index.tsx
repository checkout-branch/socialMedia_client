import React from "react";
import Profile from "@/components/Profile"; // Import the Profile component

const ProfilePage: React.FC = () => {
  return <Profile />;  // Use Profile without passing `userId` for own profile
};

export default ProfilePage;
