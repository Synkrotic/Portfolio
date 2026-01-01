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
import SnapPositionManager from '../Logic/snapPositionManager'

interface NavBarProps {
  startPos: number,
  snapPositionsFunc: (snapPositions: { x: number, y: number }[]) => void,
  getSnapPoints: (location: { x: number, y: number }) => HTMLCollectionOf<Element> | Element | null
}

class NavBar extends Component<NavBarProps> {
  // References
  private moveButton = createRef<HTMLButtonElement>();
  private navbarItems = [
    createRef<NavBarItem>(),  // Home item
    createRef<NavBarItem>(),  // About me item
    createRef<NavBarItem>(),  // Projects item
    createRef<NavBarItem>(),  // Github item
    createRef<NavBarItem>()   // Turn item
  ]
  public container = createRef<HTMLElement>();
  
  // Booleans
  private isVertical = false;
  private moveable = false;
  
  // Integers
  private snapPointSizeMultiplier = 0.9;
  private selectedItem = 0
  
  // Objects
  public snapPositionManager = new SnapPositionManager();


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

    window.addEventListener('scroll', () => {
      if (ScrollManager.isScrolling()) return

      const aboutMeContainer = document.getElementsByClassName("about-me-container")[0] as HTMLElement;
      const projectsContainer = document.getElementById("projects-wrapper") as HTMLElement
      
      if (aboutMeContainer && projectsContainer) {
        const aboutY = aboutMeContainer.getBoundingClientRect().y;
        const projectsY = projectsContainer.getBoundingClientRect().y;

        if (projectsY < 0) this.selectItem(2)
        else if (aboutY < 0) this.selectItem(1)
        else this.selectItem(0)
      }
    });
  }

  private turnNavbar() {
    if (!this.container.current) return;
    this.container.current.classList.toggle('vertical');
    this.isVertical = !this.isVertical;
    this.snapPositionManager.refresh();
    
    var locations = this.snapPositionManager.getVertical()
    if (!this.isVertical) locations = this.snapPositionManager.getHorizontal()
    this.props.snapPositionsFunc(locations);

    const style = window.getComputedStyle(this.container.current);
    this.moveNavbarTo({ x: parseFloat(style.left), y: parseFloat(style.top) });

    this.adjustDirection();
  }

  private adjustDirection() {
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

  private moveNavbarTo(endlocation: { x: number, y: number }, center: boolean = true) {
    if (!this.container.current) return;

    this.checkSnapProximity({ x: endlocation.x, y: endlocation.y });
    
    if (!center) {
      this.container.current.style.left = `${endlocation.x}px`;
      this.container.current.style.top = `${endlocation.y}px`;
      return;
    }

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

  private checkSnapProximity(location: { x: number, y: number }) {
    if (!this.container.current) return;
    
    let snapCoords = [];
    if (this.isVertical)
      snapCoords = this.snapPositionManager.getVertical();
    else
      snapCoords = this.snapPositionManager.getHorizontal();
    if (!snapCoords) return;

    for (const snapCoord of snapCoords) {
      const distance = Math.sqrt(
        Math.pow(location.x - snapCoord.x, 2) +
        Math.pow(location.y - snapCoord.y, 2)
      );

      const snapPoint = this.props.getSnapPoints(snapCoord);
      if (!snapPoint) return
      if (distance <= 100) {
        if (snapPoint instanceof Element) {
          snapPoint.classList.add('active');
          (snapPoint as HTMLElement).style.scale = '1';
          (snapPoint as HTMLElement).style.height = `${this.container.current.clientHeight}px`;
          (snapPoint as HTMLElement).style.width = `${this.container.current.clientWidth}px`;
          (snapPoint as HTMLElement).style.transform = 'translate(0px, 0px)';
        }
      } else {
        if (snapPoint instanceof Element) {
          snapPoint.classList.remove('active');
          (snapPoint as HTMLElement).style.scale = this.snapPointSizeMultiplier.toString();
          this.resizeSnapPoints(this.snapPointSizeMultiplier);
          const adjustedX = this.container.current.clientWidth * (1 - this.snapPointSizeMultiplier) / 4;
          const adjustedY = this.container.current.clientHeight * (1 - this.snapPointSizeMultiplier) / 4;
          (snapPoint as HTMLElement).style.transform = `translate(${adjustedX}px, ${adjustedY}px)`;
        }
      }
    }
  }

  private snapToPoint() {
    const snapPoint = document.getElementsByClassName('navbar-snappoint active')[0];
    if (!snapPoint) return;

    const snapStyle = window.getComputedStyle(snapPoint);
    this.moveNavbarTo({ x: parseFloat(snapStyle.left), y: parseFloat(snapStyle.top) }, false);
  }

  private toggleSnapPoints() {
    const snapContainer = document.getElementById('snap-container');
    snapContainer?.classList.toggle('shown');
  }

  
  public selectItem(index: number) {
    this.selectedItem = index

    for (let i = 0; i < this.navbarItems.length; i++) {
      let item = this.navbarItems[i].current
      if (index == i) item?.select();
      else item?.deselect()
    }
  }

  public resizeSnapPoints(multiplier: number = 1) {
    if (!this.container.current) return;
    const snapPoints = document.getElementsByClassName("navbar-snappoint");
    for(let i = 0; i < snapPoints.length; i++) {
      const snapPoint = snapPoints[i] as HTMLElement;
      if (!snapPoint.classList.contains('auto-resize')) continue;

      snapPoint.style.height = `${this.container.current.clientHeight * multiplier}px`;
      snapPoint.style.width = `${this.container.current.clientWidth * multiplier}px`;
    }
  }

  public activateMove() {
    this.moveable = true;
    this.moveButton.current?.classList.add('rebecca');
    
    this.checkSnapProximity(this.container.current ? { x: parseFloat(this.container.current.style.left), y: parseFloat(this.container.current.style.top) } : { x: 0, y: 0 });
    this.resizeSnapPoints(this.snapPointSizeMultiplier);
    this.toggleSnapPoints();
  }

  public deactivateMove() {
    this.moveable = false;
    this.moveButton.current?.classList.remove('rebecca');

    this.snapToPoint();
    this.toggleSnapPoints();
    this.adjustDirection();
  }


  render() {
    return (
      <nav className='navbar-container bottom' ref={this.container}>
        <button className='navbar-item purple-hover' ref={this.moveButton}
          onMouseDown={() => { if (!this.moveable) this.activateMove(); }}
        >
          <Move />
        </button>
        <NavBarItem
          ref={this.navbarItems[0]}
          activeIcon={AiFillHome}
          regularIcon={AiOutlineHome}
          selectItem={ () => this.selectItem(0) }
          title='Home'
          action={ScrollManager.scrollHome}
        />
        <NavBarItem
          ref={this.navbarItems[1]}
          activeIcon={FaUser}
          regularIcon={FaRegUser}
          selectItem={ () => this.selectItem(1) }
          title='About Me'
          action={ScrollManager.scrollAbout}
          extraClasses='smaller'
        />
        <NavBarItem
          ref={this.navbarItems[2]}
          activeIcon={AiFillProduct}
          regularIcon={AiOutlineProduct}
          selectItem={ () => this.selectItem(2) }
          title='Projects'
          action={ScrollManager.scrollProjects}
        />
        <NavBarItem
          ref={this.navbarItems[3]}
          activeIcon={AiFillGithub}
          regularIcon={AiOutlineGithub}
          selectItem={ () => this.selectItem(3) }
          title='Github'
          action={() => { window.open('https://www.github.com/Synkrotic/'); }}
        />
        <NavBarItem
          ref={this.navbarItems[4]}
          activeIcon={HiArrowTurnRightUp}
          regularIcon={HiArrowTurnRightDown}
          selectItem={ () => this.selectItem(4) }
          title='Turn'
          action={() => { this.turnNavbar(); }}
        />
      </nav>
    )
  }
}

export default NavBar