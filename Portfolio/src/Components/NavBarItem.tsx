interface NavBarItemProps {
  Icon: any,
  title: string,
}

const NavBarItem = ({ Icon, title }: NavBarItemProps) => {
  return (
    <button className='navbar-item focus'>
        <Icon className="icon" />
        <span>{title}</span>
    </button>
  )
}

export default NavBarItem