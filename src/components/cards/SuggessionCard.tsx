/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import Button from "../button/Button";
import { getAllUser } from "@/service/profilel";

interface User {
  id: number;
  userName: string;
  profileImageUrl: string;
}

const UserSuggession: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUser = async() =>{
      const res = await getAllUser()
      setUsers(res.data)
    }
    fetchUser()
  }, []);
  console.log(users,'users');

  return (
    <div className="max-w-60  text-white rounded-lg p- gap-2 ">
      {/* Card Header */}
      <h2 className="text-xl font-semibold mb-4">Suggested for you</h2>

      {/* Users List */}
      <div className="flex flex-col gap-4">
        {users?.splice(0,5)?.map((user) => (
         <div
         key={user?.id}
          className="flex justify-between">
             <div
            className=" rounded-lg flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden">
              {user?.profileImageUrl ? (
                <img
                  src={user?.profileImageUrl}
                  alt={user?.userName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUserCircle className="w-full h-full text-gray-500" />
              )}
            </div>
            <span className="text-sm font-semibold">{user?.userName}</span>
            
          </div >
          <div>
          <Button text="follow" size="small"/>
          </div>
         </div>
        ))}
      </div>
    </div>
  );
};

export default UserSuggession;
