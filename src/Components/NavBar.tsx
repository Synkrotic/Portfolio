import {
  AiOutlineHome, AiFillHome,
  AiOutlineProduct, AiFillProduct,
  AiFillGithub, AiOutlineGithub,
} from 'react-icons/ai'
import { Move } from 'react-feather'
import { FaUser, FaRegUser } from 'react-icons/fa6'
import { HiArrowTurnRightDown, HiArrowTurnRightUp } from 'react-icons/hi2'

import { Component, createRef } from 'react'
import NavBarItem from './NavBarItem'
import './Stylings/navbar.css'

import ScrollManager from '../Logic/ButtonFunctions/scrollManager'

interface NavBarProps {
  startPos: number
}

class NavBar extends Component<NavBarProps> {
  private container = createRef<HTMLElement>();
  private moveButton = createRef<HTMLButtonElement>();
  
  // private isVertical = true;
  // private isPhone = window.innerWidth < 768;

  public moveable = false;

  constructor(props: NavBarProps) {
    super(props)
  }

  componentDidMount() {
    window.addEventListener('mouseup', () => {
      if (this.moveable) this.deactivateMove();
    });
    window.addEventListener('mousemove', (event) => {
      if (!this.moveable) return;

      this.moveNavbarTo({ x: event.x, y: event.y})
    });
  }


  


  moveNavbarTo(endlocation: { x: number, y: number }) {
    if (!this.container.current) return;

    const paddingLeft = parseFloat(window.getComputedStyle(this.container.current).paddingLeft);
    let adjustedX = endlocation.x - this.container.current.offsetHeight / 2 - paddingLeft;
    let adjustedY = endlocation.y - this.container.current.offsetHeight / 2;

    if (adjustedX < 0) adjustedX = 0;
    if (adjustedY < 0) adjustedY = 0;
    if (adjustedX > window.innerWidth - this.container.current.offsetWidth) adjustedX = window.innerWidth - this.container.current.offsetWidth;
    if (adjustedY > window.innerHeight - this.container.current.offsetHeight) adjustedY = window.innerHeight - this.container.current.offsetHeight;

    if (this.container.current.style.left === `${adjustedX}px` && this.container.current.style.top === `${adjustedY}px`) return;

    this.container.current.style.left = `${adjustedX}px`;
    this.container.current.style.top = `${adjustedY}px`;
  }

  activateMove() {
    this.moveable = true;
    this.moveButton.current?.classList.add('rebecca');
  }

  deactivateMove() {
    this.moveable = false;
    this.moveButton.current?.classList.remove('rebecca');
  }



  render() {
    return (
      <nav className='navbar-container' ref={this.container}>
        <button className='navbar-item purple-hover' ref={this.moveButton}
          onMouseDown={() => {
            if (!this.moveable) this.activateMove();
          }}
        >
          <Move />
        </button>
        <NavBarItem
          shownIcon={AiOutlineHome}
          activeIcon={AiFillHome}
          regularIcon={AiOutlineHome}
          title='Home'
          action={ScrollManager.scrollHome}
        />
        <NavBarItem
          shownIcon={FaRegUser}
          activeIcon={FaUser}
          regularIcon={FaRegUser}
          title='About Me'
          action={ScrollManager.scrollAbout}
          extraClasses='smaller'
        />
        <NavBarItem
          shownIcon={AiOutlineProduct}
          activeIcon={AiFillProduct}
          regularIcon={AiOutlineProduct}
          title='Projects'
          action={ScrollManager.scrollProjects}
        />
        <NavBarItem
          shownIcon={AiOutlineGithub}
          activeIcon={AiFillGithub}
          regularIcon={AiOutlineGithub}
          title='Github'
          action={() => { window.open('https://www.github.com/Synkrotic/'); }}
        />
        <NavBarItem
          shownIcon={HiArrowTurnRightDown}
          activeIcon={HiArrowTurnRightUp}
          regularIcon={HiArrowTurnRightDown}
          title='Turn'
          action={() => { console.log('turn'); }}
        />
      </nav>
    )
  }
}

export default NavBar