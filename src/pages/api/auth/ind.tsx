import React, { useState, useEffect } from 'react';
import { GoogleLogin,useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { log } from 'console';

interface User {
  access_token: string;
}

interface Profile {
  picture: string;
  name: string;
  email: string;
}

const Googlelogin: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse: User) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
});

  const hundleloginsuccess = async (credentialresponse: any) => {
    console.log('Credential Response:', credentialresponse);
    const { credential } = credentialresponse;

    if (!credential) {
      console.error('Credential is undefined');
      alert('Google Login failed, please try again.');
      return;
    }

    console.log('ID Token:', credential);
    console.log(user)

    try {
      const response = await axios.post(
        'http://localhost:5005/api/user/googleauth',
        { idtoken: credential },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      console.log(response);
      alert(`${response.data.message}` || 'Registered successfully');
    } catch (error) {
      console.error('Error during backend authentication:', error);
      alert('Something went wrong during Google Login.');
    }
  };
  const handlegooglelogin = () => {
    console.log('Authentication failed');
  };

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json',
          },
        })
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.error('Error fetching user info:', err));
    }
  }, [user]);

  const logOut = () => {
    setProfile(null);
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-center pb-4">Sign up with Google</h1>
      </div>
      {profile ? (
        <div>
          <img src={profile.picture} alt="user" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <GoogleLogin onSuccess={hundleloginsuccess} onError={handlegooglelogin} />
      )}
    </div>
  );
};

export default Googlelogin;
