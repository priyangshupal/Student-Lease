import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../utils";
import "../styles/header.css";

export default function Header() {
  const navigate = useNavigate();
  const [showLogoutButton, setShowLogoutButton] = useState(false);
  const sendToChatHome = () => {
    navigate("/chat-home");
  };
  return (
    <>
      <div className='header-container'>
        <span className='header' onClick={() => navigate("/")}>
          Student Lease
        </span>
        <img
          className='white-background-logo'
          onClick={() => navigate("/post-listing")}
          src={require("../resources/logo-white-background.png")}
          alt=''
        />
        {/* <span className='chat-option' onClick={sendToChatHome}>
          Chat
        </span> */}
        <div className='dropdown'>
          <img
            src={require("../resources/user.png")}
            alt=''
            className='profile-image'
            onClick={() => setShowLogoutButton(!showLogoutButton)}
          />
          {showLogoutButton && (
            <>
              <div class='user-image-dropdown-content'>
                <a onClick={logout}>Logout</a>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
