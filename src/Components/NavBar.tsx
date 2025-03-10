import {
  AiOutlineHome, AiFillHome,
  AiOutlineProduct, AiFillProduct,
  AiOutlineTool, AiTwotoneTool,
  AiFillGithub, AiOutlineGithub,
} from 'react-icons/ai'
import { Move } from 'react-feather'
import { FaUser, FaRegUser } from 'react-icons/fa6'

import navbarSettingsFunction from './ButtonFunctions/navbarSettings'
import scrollHome from './ButtonFunctions/scrollHome'
import scrollAbout from './ButtonFunctions/scrollAbout'

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

  isPhone: boolean = window.innerWidth <= 768;
  
  constructor(props: any) {
    super(props)
    this.navItemValues = [
      {
        buttonFunction: () => { scrollHome(); this.stopMobileButtonHover(); },
        deactivateRange: { top: 0, bottom: window.innerHeight},
        IconFill: AiFillHome,
        IconOutline: AiOutlineHome,
        title: 'Home'
      }, { 
        buttonFunction: () => { scrollAbout(); this.stopMobileButtonHover(); },
        deactivateRange: { top: window.innerHeight, bottom: window.innerHeight * 2 },
        extraClass: "smaller",
        IconFill: FaUser,
        IconOutline: FaRegUser,
        title: 'About Me'
      }, { 
        buttonFunction: () => { this.stopMobileButtonHover(); },
        IconFill: AiFillProduct,
        IconOutline: AiOutlineProduct,
        title: 'Projects'
      }, {
        buttonFunction: () => { window.open('https://www.github.com/Synkrotic'); this.stopMobileButtonHover(); },
        IconFill: AiFillGithub,
        IconOutline: AiOutlineGithub,
        title: 'Github'
      }, {
        buttonFunction: () => { navbarSettingsFunction(); this.stopMobileButtonHover(); },
        IconFill: AiTwotoneTool,
        IconOutline: AiOutlineTool,
        title: 'Settings'
      },
    ]
    this.navItems = this.navItemValues.map((item, index) => (
      React.createElement(NavBarItem, { ...item, id: index, key: index })
    ))
    this.NavElements = Array.from(document.getElementsByClassName('navbar-item')) as HTMLElement[];
    this.startPos = props.startPos;
  }

  componentDidMount() {
    this.setPositions();
    this.setContainerPosition(this.startPos);

    window.addEventListener('resize', () => {
      this.setPositions();
      this.setContainerPosition(this.startPos);
    });
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

  setSnapLocation() {
    const snapPoints = document.getElementsByClassName('navbar-snappoint') as HTMLCollectionOf<HTMLElement>;
    this.positions.map((position, index) => {
      snapPoints[index].style.left = `${position.x}px`;
      snapPoints[index].style.top = `${position.y}px`;
    });
  }

  moveNavBar(endlocation: { x: number, y: number }) {
    if (!this.moveable) return;
    
    if (endlocation.x < 0) endlocation.x = 0;
    if (endlocation.y < 0) endlocation.y = 0;
    if (endlocation.x > window.innerWidth) endlocation.x = window.innerWidth;
    if (endlocation.y > window.innerHeight) endlocation.y = window.innerHeight;

    // Disable scrolling
    const body = document.getElementsByTagName('body')[0] as HTMLElement;
    body.style.overflowY = 'hidden';

    this.setPositions();
    this.setSnapPointSize();
    this.setSnapLocation();
    
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


    if (navbarX < 0)
      navbarX = 0;
    if (navbarX + navbar.clientWidth > window.innerWidth)
      navbarX = window.innerWidth - navbar.clientWidth;
    
    if (navbarY < 0)
      navbarY = 0;
    if (navbarY + navbar.clientHeight > window.innerHeight)
      navbarY = window.innerHeight - navbar.clientHeight;

    if (navbarX > (window.innerWidth / 2) - (navbar.clientWidth / 2) && navbar.classList.contains('vertical')) navbar.classList.add('left')
    else navbar.classList.remove('left');

    if (navbarY < (window.innerHeight / 2) - (navbar.clientHeight / 2) && !navbar.classList.contains('vertical')) navbar.classList.add('bottom')
    else navbar.classList.remove('bottom');

    navbar.style.left = `${navbarX}px`;
    navbar.style.top = `${navbarY}px`;
  }

  setPositions() {
    this.navbar = document.getElementsByClassName('navbar-container')[0] as HTMLElement;
    const isVertical = this.navbar.classList.contains('vertical');
    if (this.isPhone) {
      this.positions = [
        {x: 0, y: 0},
        {x: 0, y: window.innerHeight - this.navbar.clientHeight},
      ]
      if (isVertical) {
        this.positions.push({x: 0, y: window.innerHeight / 2 - this.navbar.clientHeight / 2});

        this.positions.push({x: window.innerWidth - this.navbar.clientWidth, y: 0});
        this.positions.push({x: window.innerWidth - this.navbar.clientWidth, y: window.innerHeight / 2 - this.navbar.clientHeight / 2});
        this.positions.push({x: window.innerWidth - this.navbar.clientWidth, y: window.innerHeight - this.navbar.clientHeight / 2});
      }
      return
    }

    this.positions = [];
    this.positions.push({x: window.innerWidth * 1/30, y: window.innerHeight * 1/50});
    if (!isVertical) this.positions.push({x: window.innerWidth / 2 - this.navbar.clientWidth / 2, y: window.innerHeight * 1/50});
    this.positions.push({x: window.innerWidth - this.navbar.clientWidth - (window.innerWidth * 1/30), y: window.innerHeight * 1/50});


    if (isVertical) {
      this.positions.push({x: window.innerWidth * 1/30, y: window.innerHeight / 2 - this.navbar.clientHeight / 2});
      this.positions.push({x: window.innerWidth - this.navbar.clientWidth - (window.innerWidth * 1/30), y: window.innerHeight / 2 - this.navbar.clientHeight / 2});
    }

    this.positions.push({x: window.innerWidth * 1/30, y: window.innerHeight - this.navbar.clientHeight - (window.innerHeight * 1/50)});
    if (!isVertical) this.positions.push({x: window.innerWidth / 2 - this.navbar.clientWidth / 2, y: window.innerHeight - this.navbar.clientHeight - (window.innerHeight * 1/50)});
    this.positions.push({x: window.innerWidth - this.navbar.clientWidth - (window.innerWidth * 1/30), y: window.innerHeight - this.navbar.clientHeight - (window.innerHeight
      * 1/50)});
  }

  setContainerPosition(positionIndex: number) {
    if (this.navbar === null) return;
    this.navbar.style.left = `${this.positions[positionIndex].x}px`;
    this.navbar.style.top = `${this.positions[positionIndex].y}px`;
    this.forceUpdate();
  }

  stopMove() {
    if (!this.moveable) return;
    this.moveable = false;
    const moveButton = document.getElementsByClassName('movebutton')[0] as HTMLElement;
    if (moveButton.classList.contains('rebecca')) moveButton.classList.remove('rebecca');

    const snapPoints = document.getElementsByClassName('navbar-snappoint') as HTMLCollectionOf<HTMLElement>;
    for (let snapPoint of snapPoints) { snapPoint.style.display = 'none'; }

    // Enable Scrolling
    const body = document.getElementsByTagName('body')[0] as HTMLElement;
    body.style.overflowY = 'scroll';
  }

  stopMobileButtonHover() {
    const buttons = document.getElementsByClassName('navbar-item') as HTMLCollectionOf<HTMLElement>;
    for (let button of buttons) {
      button.classList.add('nohover');
      setTimeout(() => {
        button.classList.remove('nohover');
      }, 100);
    }
  }

  render() {
    return (
      <div
        className='navbar-wrapper'

        onMouseUp={() => { this.stopMove(); }}
        onTouchEnd={() => { this.stopMove(); }}
        onTouchCancel={() => { this.stopMove(); }}

        onMouseMove={(e) => {
          let mouse = e as React.MouseEvent;
          this.moveNavBar({ x: mouse.clientX, y: mouse.clientY });
        }}
        onTouchMove={(e) => {
          let touch = e.touches[0];
          this.moveNavBar({ x: touch.clientX, y: touch.clientY });
        }}

      >
        {
          this.positions.map((position, i) => (
            <div
              key={i}
              className='navbar-snappoint'
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                display: 'none',
              }}
            />
          ))
        } 
        <nav className='navbar-container'>
          <button 
            className={`navbar-item nohover purple-hover movebutton`}
            
            onMouseDown={() => { this.moveable = true; }}
            onTouchStart={() => { this.moveable = true; }}
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