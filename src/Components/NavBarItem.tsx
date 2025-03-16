import React from "react";

interface ItemProps {
  shownIcon: any,
  activeIcon: any,
  regularIcon: any,
  
  title?: string,
  action?: () => void,
  extraClasses?: string
}

const NavBarItem = ({ shownIcon, activeIcon, regularIcon, title, action, extraClasses }: ItemProps) => {
  
  function handleClick() {
    if (!action) return;

    action();
    swapIcon();
  }
  
  function swapIcon() {
    shownIcon = shownIcon == activeIcon ? regularIcon : activeIcon;
  }

  return (
    <button className={`navbar-item ${extraClasses ? extraClasses : ''}`} onClick={() => { handleClick(); }}>
      {React.createElement(shownIcon, { className: 'icon' })}
      <span>{title}</span>
    </button>
  )
}

export default NavBarItem