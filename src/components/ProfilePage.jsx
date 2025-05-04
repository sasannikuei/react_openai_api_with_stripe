import { useEffect, useState } from 'react';
import AxiosInstance from './AxiosInstance';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem('access_token');

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

  if (!profile) return <p>در حال بارگذاری...</p>;

  return (
    <div className="p-4 rounded bg-gray-100 max-w-md mx-auto mt-10 shadow">
      <h1 className="text-xl font-bold mb-4">پروفایل کاربر</h1>
      <p><strong>نام کاربری:</strong> {profile.username}</p>
      <p><strong>ایمیل:</strong> {profile.email}</p>
      <button onClick={() => navigate("/PaymentHomepage")} className="return-button">
        Payment Page
      </button>
    </div>
  );
}

export default ProfilePage;
