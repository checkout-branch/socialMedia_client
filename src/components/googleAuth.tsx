/* eslint-disable @next/next/no-img-element */
// import React, { useState, useEffect } from 'react';
// import { GoogleLogin,useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';

// interface User {
//   access_token: string;
// }

// interface Profile {
//   picture: string;
//   name: string;
//   email: string;
// }

// const GoogleAuth: React.FC = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [profile, setProfile] = useState<Profile | null>(null);

//   const login = useGoogleLogin({
//     onSuccess: (codeResponse: User) => setUser(codeResponse),
//     onError: (error) => console.log('Login Failed:', error),
// });

//   const hundleloginsuccess = async (credentialresponse: any) => {
//     console.log('Credential Response:', credentialresponse);
//     const { credential } = credentialresponse;

//     if (!credential) {
//       console.error('Credential is undefined');
//       alert('Google Login failed, please try again.');
//       return;
//     }

//     console.log('ID Token:', credential);
//     console.log(user)

//     try {
//       const response = await axios.post(
//         'http://localhost:5005/api/user/googleauth',
//         { idtoken: credential },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           timeout: 10000,
//           withCredentials:true,
//         }
//       );

//       console.log(response);
//       alert(`${response.data.message}` || 'Registered successfully');
//     } catch (error) {
//       console.error('Error during backend authentication:', error);
//       alert('Something went wrong during Google Login.');
//     }
//   };
//   const handlegooglelogin = () => {
//     console.log('Authentication failed');
//   };

//   useEffect(() => {
//     if (user) {
//       axios
//         .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
//           headers: {
//             Authorization: `Bearer ${user.access_token}`,
//             Accept: 'application/json',
//           },
//         })
//         .then((res) => {
//           setProfile(res.data);
//         })
//         .catch((err) => console.error('Error fetching user info:', err));
//     }
//   }, [user]);

//   const logOut = () => {
//     setProfile(null);
//   };

//   return (
//     <div>
//       <div>
//         {/* <h1 className="text-2xl font-bold text-center pb-4">Sign up with Google</h1> */}
//       </div>
//       {profile ? (
//         <div>
//           <img src={profile.picture} alt="user" />
//           <h3>User Logged in</h3>
//           <p>Name: {profile.name}</p>
//           <p>Email Address: {profile.email}</p>
//           <button onClick={logOut}>Log out</button>
//         </div>
//       ) : (
//         <GoogleLogin onSuccess={hundleloginsuccess} onError={handlegooglelogin} />
//       )}
//     </div>
//   );
// };

// export default GoogleAuth;










import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";

const GoogleAuth: React.FC = () => {
  const { data: session } = useSession();
  console.log(session?.accessToken)
  console.log(session)

  const handleBackendAuth = async () => {
    if (session?.accessToken) {
      try {
        const response = await axios.post(
          
          "http://localhost:5005/api/user/googleauth",
          { idToken: session.accessToken },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Backend response:", response.data);
        toast.success(response.data.message || "Backend authentication successful!");
      } catch (error) {
        console.error("Error authenticating with backend:", error);
        console.log(session.accessToken)
        toast.error('askd')
        toast.error("Backend authentication failed. Please try again.");
      }
    } else {
      console.error("No access token found in session.");
      alert("You are not logged in. Please log in first.");
    }
  };

  if (session) {
    return (
      <div>
        <img
          src={session.user?.image || ""}
          alt="Profile Picture"
          className="rounded-full w-16 h-16"
        />
        <h3>Welcome, {session.user?.name}!</h3>
        <p>Email: {session.user?.email}</p>
        <button
          onClick={() => signOut()}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Log out
        </button>
        <button
          onClick={handleBackendAuth}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Authenticate with Backend
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleAuth;
