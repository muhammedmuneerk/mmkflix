import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./NavBar.css";

function NavBar({ isLoggedIn, user, onLogout }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-content">
        <Link to="/" className="logo">
          <img src="/images/mmkflix-logo.webp" alt="MMKFlix logo" />
        </Link>
        {isLoggedIn && (
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/tvshows">TV Shows</Link></li>
            <li><Link to="/movies">Movies</Link></li>
            <li><Link to="/new">New & Popular</Link></li>
            <li><Link to="/mylist">My List</Link></li>
          </ul>
        )}
        <div className="nav-right">
          {isLoggedIn ? (
            <>
              <div className="search-icon">
                <i className="fas fa-search"></i>
              </div>
              <div className="notifications">
                <i className="fas fa-bell"></i>
              </div>
              <div className="profile-menu">
                <img src={user.profileImage || "/default-avatar.png"} alt="User" className="profile-icon" />
                <div className="profile-dropdown">
                  <Link to="/profile">Profile</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="login-btn">Sign In</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;