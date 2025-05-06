import { useEffect, useState } from 'react';
import AxiosInstance from './AxiosInstance';
import { useNavigate } from "react-router-dom";
import Loader from './Loader'

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    const fetchProfile = async () => {
      try {
        const res = await AxiosInstance.get('/api/profile/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data);
      } catch (err) {
        console.error('Failed to load profile:', err.response?.data || err.message);
        
        if (err.response?.status === 401) {
          localStorage.removeItem("access_token");
          navigate("/login");
        }

      }
    };

    fetchProfile();

  }, []);

  if (!profile) return  <Loader /> ;

  return (
    <div>
      <h1>User Profile</h1>
      <p><strong>User Name:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <button onClick={() => navigate("/paymenthomepage")} type='submit'>
        Payments
      </button>
    </div>
  );
}

export default ProfilePage;



{/* <p>Loading...</p> */}
