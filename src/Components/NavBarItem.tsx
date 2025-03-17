import { Component } from "react";

interface ItemProps {
  activeIcon: any,
  regularIcon: any,
  
  title?: string,
  action?: () => void,
  extraClasses?: string
}

class NavBarItem extends Component<ItemProps> {
  state = {
    shownIcon: this.props.regularIcon
  }

  handleClick() {
    if (!this.props.action) return;

    this.props.action();
    this.swapIcon();
  }

  swapIcon() {
    this.setState({ shownIcon: this.state.shownIcon == this.props.activeIcon ? this.props.regularIcon : this.props.activeIcon });
  }

  render() {
    return (
      <button className={`navbar-item ${this.props.extraClasses ? this.props.extraClasses : ''}`} onClick={() => { this.handleClick(); }}>
        <this.state.shownIcon className={'icon'} />
        <span>{this.props.title}</span>
      </button>
    )
  }
}

export default NavBarItem