import {
  AiOutlineHome, AiFillHome,
  AiOutlineUser, AiFillUpSquare,
  AiOutlineProduct, AiFillProduct,
  AiOutlineTool, AiTwotoneTool,
  AiFillGithub, AiOutlineGithub,
} from 'react-icons/ai'
import { Move } from 'react-feather'

import './Stylings/navbar.css'
import NavBarItem from './NavBarItem'
import React from 'react'

class NavBar extends React.Component {
  navItemValues: Array<any>;
  navItems: Array<any>;
  moveSpeed: number = 0.5;
  moveable: boolean = false;
  constructor(props: any) {
    super(props)
    this.navItemValues = [
      { onHover: this.setProximity, IconFill: AiFillHome, IconOutline: AiOutlineHome, title: 'Home' },
      { onHover: this.setProximity, IconFill: AiFillUpSquare, IconOutline: AiOutlineUser, title: 'About Me' },
      { onHover: this.setProximity, IconFill: AiFillProduct, IconOutline: AiOutlineProduct, title: 'Projects' },
      { onHover: this.setProximity, IconFill: AiFillGithub, IconOutline: AiOutlineGithub, title: 'Github' },
      { onHover: this.setProximity, IconFill: AiTwotoneTool, IconOutline: AiOutlineTool, title: 'Settings' },
    ]
    this.navItems = this.navItemValues.map((item, index) => (
      <NavBarItem key={index} {...item} id={index} />
    ))
  }

  setProximity(hoverID: number) {
    this.navItems.forEach((item: any) => item.setProximity(false));
    this.navItems[hoverID + 1].setProximity(true);
  }

  moveNavBar(e: React.MouseEvent) {
    if (!this.moveable) return;
    let mouseCoords = { x: e.clientX, y: e.clientY };
    const navbar = document.getElementsByClassName('navbar-container')[0] as HTMLElement;
    navbar.style.left = `${mouseCoords.x + 1920*(28/1920)}px`;
    navbar.style.top = `${mouseCoords.y - 1080*(39/1080)}px`;
  }

  render() {
    return (
      <div
        className='navbar-wrapper'
        onMouseUp={() => this.moveable = false}
        onMouseMove={(e) => this.moveNavBar(e)}
      >
        <nav className='navbar-container left'
          >
          <button 
            className='navbar-item nohover purple-hover' 
            onMouseDown={() => this.moveable = true}
          >
            <Move />
          </button>
          {this.navItems}
        </nav>
      </div>
    )
  }
}

export default NavBar