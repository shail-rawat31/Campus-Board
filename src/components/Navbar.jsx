import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NotificationBell from "./NotificationBell";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const avatarLetter =
    user?.email?.charAt(0).toUpperCase() || "U";

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/dashboard" className="navbar-brand">
          <div className="brand-logo">
            CB
          </div>

          <div className="brand-text">
            <span>CampusBoard</span>
            <small>Notice Management</small>
          </div>
        </Link>
      </div>

      {user && (
        <div className="navbar-right">

          <NotificationBell userId={user.id} />

          <Link
            to="/profile"
            className="nav-link"
          >
            Profile
          </Link>

          <div className="nav-avatar">
            {avatarLetter}
          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>
      )}
    </nav>
  );
}