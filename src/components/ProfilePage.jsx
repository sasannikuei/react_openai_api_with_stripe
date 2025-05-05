import { useEffect, useState } from 'react';
import AxiosInstance from './AxiosInstance';
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";


function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();

  useEffect(() => {
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
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h1>User Profile</h1>
      <p><strong>User Name:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <button onClick={() => navigate("/PaymentHomepage")} type='submit'>
        Payments
      </button>
    </div>
  );
}

export default ProfilePage;
