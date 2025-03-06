import { AiOutlineHome, AiFillHome, AiOutlineUser, AiFillUpSquare, AiOutlineProduct, AiFillProduct, AiOutlineTool, AiTwotoneTool } from 'react-icons/ai'
import './Stylings/navbar.css'
import NavBarItem from './NavBarItem'

const NavBar = () => {
  return (
    <div className='navbar-container'>
      <NavBarItem Icon={AiOutlineHome} title='Home' />
      <NavBarItem Icon={AiFillHome} title='Home' />
      <NavBarItem Icon={AiOutlineUser} title='About Me' />
      <NavBarItem Icon={AiFillUpSquare} title='About Me' />
      <NavBarItem Icon={AiOutlineProduct} title='Projects' />
      <NavBarItem Icon={AiFillProduct} title='Projects' />
      <NavBarItem Icon={AiOutlineTool} title='Settings' />
      <NavBarItem Icon={AiTwotoneTool} title='Settings' />
    </div> 
  )
}

export default NavBar