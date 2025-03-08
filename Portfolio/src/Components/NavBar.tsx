import {
  AiOutlineHome, AiFillHome,
  AiOutlineProduct, AiFillProduct,
  AiOutlineTool, AiTwotoneTool,
  AiFillGithub, AiOutlineGithub,
} from 'react-icons/ai'
import { Move } from 'react-feather'
import { FaUser, FaRegUser } from 'react-icons/fa6'

import navbarSettingsFunction from './ButtonFunctions/navbarSettings'

import './Stylings/navbar.css'
import NavBarItem from './NavBarItem'
import React from 'react'

interface NavBarProps {
  startPos: number,
}

class NavBar extends React.Component<NavBarProps> {
  navItemValues: Array<any>;
  navItems: Array<any>;
  moveable: boolean = false;
  NavElements: Array<HTMLElement>;

  navbar: HTMLElement | null = null;
  positions: Array<{ x: number, y: number }> = [{ x: 0, y: 0 }];
  startPos: number;
  
  constructor(props: any) {
    super(props)
    this.navItemValues = [
      { buttonFunction: () => console.log(), direction: "", IconFill: AiFillHome, IconOutline: AiOutlineHome, title: 'Home' },
      { buttonFunction: () => console.log(), direction: "smaller", IconFill: FaUser, IconOutline: FaRegUser, title: 'About Me' },
      { buttonFunction: () => console.log(), direction: "", IconFill: AiFillProduct, IconOutline: AiOutlineProduct, title: 'Projects' },
      { buttonFunction: () => console.log(), direction: "", IconFill: AiFillGithub, IconOutline: AiOutlineGithub, title: 'Github' },
      { buttonFunction: navbarSettingsFunction, direction: "", IconFill: AiTwotoneTool, IconOutline: AiOutlineTool, title: 'Settings' },
    ]
    this.navItems = this.navItemValues.map((item, index) => (
      <NavBarItem key={index} {...item} id={index} />
    ))
    this.NavElements = Array.from(document.getElementsByClassName('navbar-item')) as HTMLElement[];
    this.startPos = props.startPos;
  }

  componentDidMount() {
    this.setPositions();
    this.setContainerPosition(this.startPos);
  }

  setSnapPointSize() {
    const navbar = document.getElementsByClassName('navbar-container')[0] as HTMLElement;
    const snapPoints = document.getElementsByClassName('navbar-snappoint') as HTMLCollectionOf<HTMLElement>;
    for (let snapPoint of snapPoints) {
      snapPoint.style.width = `${navbar.clientWidth}px`;
      snapPoint.style.height = `${navbar.clientHeight}px`;
      snapPoint.style.display = 'block';
    }
  }

  moveNavBar(endlocation: { x: number, y: number }) {
    if (!this.moveable) return;
    
    if (endlocation.x < 0) endlocation.x = 0;
    if (endlocation.y < 0) endlocation.y = 0;
    if (endlocation.x > window.innerWidth) endlocation.x = window.innerWidth;
    if (endlocation.y > window.innerHeight) endlocation.y = window.innerHeight;
    this.setPositions();
    this.setSnapPointSize();
    
    const navbar = document.getElementsByClassName('navbar-container')[0] as HTMLElement;
    const navbaritems = document.getElementsByClassName('navbar-item') as HTMLCollectionOf<HTMLElement>;
    const moveButton = document.getElementsByClassName('purple-hover')[0] as HTMLElement;
    moveButton.classList.add('rebecca'); 
    
    const navbarTopPadding = parseFloat(window.getComputedStyle(navbar).paddingTop);
    const navbarLeftPadding = parseFloat(window.getComputedStyle(navbar).paddingLeft);
    let navbarX = 0;
    let navbarY = 0;

    if (navbar.classList.contains('vertical')) {
      navbarX = endlocation.x - navbar.clientWidth / 2;
      navbarY = endlocation.y - navbaritems[0].clientHeight / 2 - navbarTopPadding;
    } else {
      navbarX = (endlocation.x - navbaritems[0].clientWidth / 2) - navbarLeftPadding;
      navbarY = endlocation.y - navbar.clientHeight / 2;
    }

    const snapDistance = 100;
    for (let position of this.positions) {
      if (Math.abs(navbarX - position.x) < snapDistance && Math.abs(navbarY - position.y) < snapDistance) {
        navbarX = position.x;
        navbarY = position.y;
        break;
      }
    }


    if (navbarX < 0) {
      navbar.style.left = '0px';
      return;
    } if (navbarY < 0) {
      navbar.style.top = '0px';
      return;
    } if (navbarX + navbar.clientWidth > window.innerWidth) {
      navbar.style.left = `${window.innerWidth - navbar.clientWidth}px`;
      return;
    }  if (navbarY + navbar.clientHeight > window.innerHeight) {
      navbar.style.top = `${window.innerHeight - navbar.clientHeight}px`;
      return;
    }

    navbar.style.left = `${navbarX}px`;
    navbar.style.top = `${navbarY}px`;
  }

  setPositions() {
    this.navbar = document.getElementsByClassName('navbar-container')[0] as HTMLElement;
    if (window.innerWidth <= 768) {
      this.positions = [
        {x: 0, y: 0},
        {x: 0, y: window.innerHeight - this.navbar.clientHeight},
      ]
      return
    }
    this.positions = [      
      {x: window.innerWidth * 1/30, y: window.innerHeight * 1/50},
      {x: window.innerWidth / 2 - this.navbar.clientWidth / 2, y: window.innerHeight * 1/50},
      {x: window.innerWidth - this.navbar.clientWidth - (window.innerWidth * 1/30), y: window.innerHeight * 1/50},
      
      {x: window.innerWidth * 1/30, y: window.innerHeight / 2 - this.navbar.clientHeight / 2},
      {x: window.innerWidth - this.navbar.clientWidth - (window.innerWidth * 1/30), y: window.innerHeight / 2 - this.navbar.clientHeight / 2},

      {x: window.innerWidth * 1/30, y: window.innerHeight - this.navbar.clientHeight - (window.innerHeight * 1/50)},
      {x: window.innerWidth / 2 - this.navbar.clientWidth / 2, y: window.innerHeight - this.navbar.clientHeight - (window.innerHeight * 1/50)},
      {x: window.innerWidth - this.navbar.clientWidth - (window.innerWidth * 1/30), y: window.innerHeight - this.navbar.clientHeight - (window.innerHeight * 1/50)},
    ];
  }

  setContainerPosition(positionIndex: number) {
    if (this.navbar === null) return;
    this.navbar.style.left = `${this.positions[positionIndex].x}px`;
    this.navbar.style.top = `${this.positions[positionIndex].y}px`;
    this.forceUpdate();
  }

  render() {
    return (
      <div
        className='navbar-wrapper'
        onMouseUp={() => {
          if (!this.moveable) return;
          this.moveable = false;
          const moveButton = document.getElementsByClassName('rebecca')[0] as HTMLElement;
          moveButton.classList.remove('rebecca');

          const snapPoints = document.getElementsByClassName('navbar-snappoint') as HTMLCollectionOf<HTMLElement>;
          for (let snapPoint of snapPoints) { snapPoint.style.display = 'none'; }
        }}
        onMouseMove={(e) => {
          let mouse = e as React.MouseEvent;
          this.moveNavBar({ x: mouse.clientX, y: mouse.clientY });
        }}
      >
        {this.positions.map((position, i) => (
          <div
            key={i}
            className='navbar-snappoint'
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              display: 'none',
            }}
          />
        ))}
        <nav className='navbar-container'>
          <button 
            className={`navbar-item nohover purple-hover`}
            onMouseDown={() => {
              this.moveable = true;
            }}
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