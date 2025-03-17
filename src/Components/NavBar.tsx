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
  
  private isVertical = false;

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

  turnNavbar() {
    if (!this.container.current) return;
    this.container.current.classList.toggle('vertical');
    this.isVertical = !this.isVertical;

    const style = window.getComputedStyle(this.container.current);
    this.moveNavbarTo({ x: parseFloat(style.left), y: parseFloat(style.top) });

    this.adjustDirection();
  }

  moveNavbarTo(endlocation: { x: number, y: number }) {
    if (!this.container.current) return;

    let adjustedX = 0;
    let adjustedY = 0;

    if (!this.isVertical) {
      const paddingLeft = parseFloat(window.getComputedStyle(this.container.current).paddingLeft);
      adjustedX = endlocation.x - this.container.current.offsetHeight / 2 - paddingLeft;
      adjustedY = endlocation.y - this.container.current.offsetHeight / 2;
    } else {
      const paddingTop = parseFloat(window.getComputedStyle(this.container.current).paddingTop);
      adjustedX = endlocation.x - this.container.current.offsetWidth / 2;
      adjustedY = endlocation.y - this.container.current.offsetWidth / 2 - paddingTop;
    }

    if (adjustedX < 0) adjustedX = 0;
    if (adjustedY < 0) adjustedY = 0;
    if (adjustedX > window.innerWidth - this.container.current.offsetWidth) adjustedX = window.innerWidth - this.container.current.offsetWidth;
    if (adjustedY > window.innerHeight - this.container.current.offsetHeight) adjustedY = window.innerHeight - this.container.current.offsetHeight;

    if (this.container.current.style.left === `${adjustedX}px` && this.container.current.style.top === `${adjustedY}px`) return;

    this.container.current.style.left = `${adjustedX}px`;
    this.container.current.style.top = `${adjustedY}px`;
  }

  adjustDirection() {
    if (!this.container.current) return;
    const middleY = parseFloat(window.getComputedStyle(this.container.current).top) + this.container.current.offsetHeight / 2;

    if (this.isVertical) {
      const middleX = parseFloat(window.getComputedStyle(this.container.current).left) + this.container.current.offsetWidth / 2;
      if (middleX > window.innerWidth / 2) {
        this.container.current.classList.add('left');
      } else {
        this.container.current.classList.remove('left');
      }
    } else {
      if (middleY > window.innerHeight / 2) {
        this.container.current.classList.remove('bottom');
      } else {
        this.container.current.classList.add('bottom');
      }
    }
  }

  activateMove() {
    this.moveable = true;
    this.moveButton.current?.classList.add('rebecca');
  }

  deactivateMove() {
    this.moveable = false;
    this.moveButton.current?.classList.remove('rebecca');

    this.adjustDirection();
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
          activeIcon={AiFillHome}
          regularIcon={AiOutlineHome}
          title='Home'
          action={ScrollManager.scrollHome}
        />
        <NavBarItem
          activeIcon={FaUser}
          regularIcon={FaRegUser}
          title='About Me'
          action={ScrollManager.scrollAbout}
          extraClasses='smaller'
        />
        <NavBarItem
          activeIcon={AiFillProduct}
          regularIcon={AiOutlineProduct}
          title='Projects'
          action={ScrollManager.scrollProjects}
        />
        <NavBarItem
          activeIcon={AiFillGithub}
          regularIcon={AiOutlineGithub}
          title='Github'
          action={() => { window.open('https://www.github.com/Synkrotic/'); }}
        />
        <NavBarItem
          activeIcon={HiArrowTurnRightUp}
          regularIcon={HiArrowTurnRightDown}
          title='Turn'
          action={() => { this.turnNavbar(); }}
        />
      </nav>
    )
  }
}

export default NavBar