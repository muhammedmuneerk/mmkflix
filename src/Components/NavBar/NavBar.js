import React from 'react';
import "./NavBar.css";

function NavBar() {
  const fallbackLogo = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png";

  return (
    <div className='navbar'>
      <img 
        className='logo' 
        src="https://www.ucraft.com/ai-logo-generator/app/_next/image?url=https%3A%2F%2Fstatic.ucraft.ai%2Ffs%2Flogos%2Fpng%2Fcff9e07c-9c92-44be-9a08-ff6518257943%2Fcustom%2F077a4450-9fdc-4d30-ac78-80ff108dba22.png%3F1728129795597&w=1080&q=75"
        alt="Netflix logo" 
        onError={(e) => { e.target.src = fallbackLogo; }} // Fallback image if the original fails
      />
      <img className='avatar' src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png" alt="Avatar" />
    </div>
  );
}

export default NavBar;
