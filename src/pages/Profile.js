import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import "./Profile.css"; 

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2 className="profile-title">Your Profile</h2>
      </div>
      <div className="profile-details">
        <img src={user.photoURL} alt="Profile" className="profile-image" />
        <div className="profile-info">
          <p><strong>Name:</strong> {user.displayName}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>
      <button className="btn logout-btn" onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
